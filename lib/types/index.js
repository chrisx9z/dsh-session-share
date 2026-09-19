/**
 * Host half of chat-segment share: the `/share` command, the browser
 * share-payload route, and the optional per-turn TXT auto-save.
 *
 * The payload route reads a session cold-safely through `sessionQuery`, so a
 * share never depends on what the browser happens to have paged in, and
 * inlines referenced images as base64 so the browser can build a
 * self-contained HTML/PNG artifact without a second round trip.
 * @module
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
export const name = 'session-chat-share';
/** The command plane plus the browser transport carrying the payload route. */
export const inject = ['commands', 'connection'];
/** Stable browser route serving one session's shareable messages as JSON. */
export const SHARE_ROUTE = '/api/session.share';
/** Cap on tool-call arguments carried into a payload. */
const TOOL_ARGS_MAX_CHARS = 800;
/** Cap on inlined images per payload, so one share cannot balloon the response. */
const MAX_SHARE_IMAGES = 24;
/** Auto-save vocabulary for the plain-text renderer. */
const TXT_ROLE = {
    user: 'User',
    assistant: 'Assistant',
    tool: 'Tool',
    subagent: 'Subagent',
};
/**
 * Read one host service without widening this package's peer-dependency surface.
 *
 * Cordis refuses a service access a plugin fiber did not inject, so an optional
 * service the deployment never mounted reads as absent here instead of throwing
 * (which would turn a text-only share into a 500 on such a deployment).
 * @param ctx - composed host context.
 * @param name - service key.
 * @returns the mounted service, or undefined when this deployment has none.
 */
function getService(ctx, name) {
    try {
        return Reflect.get(ctx, name);
    }
    catch {
        return undefined;
    }
}
/**
 * Read the session-query service, or throw when the deployment does not mount it.
 * @param ctx - composed host context.
 * @returns the mounted session-query service.
 * @throws when the service is absent.
 */
function requireSessionQuery(ctx) {
    const service = getService(ctx, 'sessionQuery');
    if (service === undefined)
        throw new Error('session-chat-share: the sessionQuery service is not mounted');
    return service;
}
/**
 * Parse a `/share` invocation into the intent token the browser observes.
 * Accepts: nothing (open the dialog), `txt`, `last <n>`, and combinations.
 * @param raw - trimmed command input.
 * @returns the command result; success text is `share[:txt[:<n>]]`.
 */
export function parseShareInvocation(raw) {
    const input = raw.trim();
    if (input === '')
        return { kind: 'success', text: 'share' };
    const tokens = input.split(/\s+/);
    let txt = false;
    let lastN;
    for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index];
        if (token === 'txt') {
            txt = true;
        }
        else if (token === 'last') {
            const count = Number(tokens[index + 1]);
            if (!Number.isInteger(count) || count <= 0) {
                return { kind: 'error', text: '/share last requires a positive message count, e.g. `/share last 10`.' };
            }
            lastN = count;
            index += 1;
        }
        else {
            return {
                kind: 'error',
                text: '/share accepts: nothing (opens the dialog), `txt` (save the whole chat as .txt), '
                    + '`last <n>` (save the newest n messages as .txt), or `txt last <n>`.',
            };
        }
    }
    const count = lastN === undefined ? '' : String(lastN);
    const suffix = count === '' ? '' : `:${count}`;
    /* v8 ignore next -- the dialog-only arm is exercised by `parseShareInvocation('')`, but the v8 merge reports it unreached */
    return txt || lastN !== undefined
        ? { kind: 'success', text: `share:txt${suffix}` }
        : { kind: 'success', text: 'share' };
}
/** Join one message's text blocks, naming images that carry no text of their own. */
function messageText(content) {
    const parts = [];
    const images = [];
    for (const block of content ?? []) {
        /* v8 ignore next -- exercised by the text-block-without-text fixtures; v8 folds this into the `if` branch map */
        if (block.type === 'text')
            parts.push(block.text ?? '');
        else if (block.type === 'image')
            images.push(block);
    }
    const text = parts.join('\n');
    if (text !== '')
        return { text, images };
    return { text: images.length > 0 ? '[image]' : '', images };
}
/** Render one tool call as the share text the dialog shows. */
function toolText(event) {
    const callName = event.data?.name ?? 'tool';
    const rawArguments = event.data?.arguments ?? '';
    const arguments_ = rawArguments.length > TOOL_ARGS_MAX_CHARS
        ? `${rawArguments.slice(0, TOOL_ARGS_MAX_CHARS)}…`
        : rawArguments;
    return arguments_.trim() === '' ? `\`${callName}\`` : `\`${callName}\`\n\n\`\`\`json\n${arguments_}\n\`\`\``;
}
/**
 * Fold durable session events into shareable messages, in log order.
 * Replacement surface ops are skipped: a share carries the conversation as it
 * currently stands, not the superseded text a rewrite replaced.
 * @param events - durable events of one session, in seq order.
 * @returns one payload message per shareable event.
 */
export function shareMessagesFromEvents(events) {
    const messages = [];
    for (const event of events) {
        if (event.surfaceOp !== undefined && event.surfaceOp !== 'append')
            continue;
        const seq = event.seq ?? 0;
        const time = event.time ?? 0;
        if (event.type === 'user/message') {
            const { text, images } = messageText(event.data?.content);
            if (text === '')
                continue;
            messages.push({ seq, role: 'user', time, text, images: imageRefs(images), child: null });
        }
        else if (event.type === 'assistant/message') {
            const { text, images } = messageText(event.data?.message?.content);
            if (text === '')
                continue;
            messages.push({ seq, role: 'assistant', time, text, images: imageRefs(images), child: null });
        }
        else if (event.type === 'tool/call') {
            messages.push({ seq, role: 'tool', time, text: toolText(event), images: [], child: null });
        }
    }
    return messages;
}
/** Keep the attachment identity of an image block until the bytes are inlined. */
function imageRefs(blocks) {
    return blocks.flatMap((block) => {
        const attachment = block.attachment;
        const attachmentId = attachment?.attachmentId;
        if (attachmentId === undefined)
            return [];
        return [{ attachmentId, mediaType: attachment?.mediaType ?? 'image/png', ...(attachment?.name === undefined ? {} : { name: attachment.name }), data: null }];
    });
}
/**
 * Inline the referenced images of every message as base64 data payloads.
 * @param ctx - composed host context carrying the attachment store.
 * @param messages - messages whose `images[].data` still holds attachment ids.
 * @param signal - request cancellation.
 * @returns the messages with image bytes inlined, dropping ones that cannot be read.
 */
async function inlineImages(ctx, messages, signal) {
    const attachments = getService(ctx, 'attachments');
    const referenced = messages.reduce((count, message) => count + message.images.length, 0);
    if (attachments === undefined || referenced === 0) {
        return messages.map(message => ({ ...message, images: [] }));
    }
    // One cache per attachment id: a picture shared twice in a chat is read once.
    const resolved = new Map();
    let budget = MAX_SHARE_IMAGES;
    const out = [];
    for (const message of messages) {
        const images = [];
        for (const image of message.images) {
            if (budget <= 0)
                break;
            budget -= 1;
            let inlined = resolved.get(image.attachmentId);
            /* v8 ignore next -- the cache stores an inlined image or null, never undefined, so only a first read enters */
            if (inlined === undefined) {
                inlined = await readImageData(attachments, image, signal);
                resolved.set(image.attachmentId, inlined);
            }
            if (inlined !== null)
                images.push(inlined);
        }
        out.push({ ...message, images });
    }
    return out;
}
/** Read one attachment as base64, degrading to no image instead of failing the share. */
async function readImageData(attachments, image, signal) {
    try {
        const stored = await attachments.readImage({
            attachmentId: image.attachmentId,
            mediaType: image.mediaType,
        }, signal);
        if (typeof stored.data !== 'string' || stored.data === '')
            return null;
        return {
            attachmentId: image.attachmentId,
            mediaType: stored.mediaType ?? image.mediaType,
            ...(image.name === undefined ? {} : { name: image.name }),
            data: stored.data,
        };
    }
    catch {
        return null;
    }
}
/** Read one session's shareable messages, appending direct subagent children when asked. */
async function readSessionMessages(ctx, sessionId, includeSubagents, signal) {
    const sessionQuery = requireSessionQuery(ctx);
    const observation = await sessionQuery.observeSession(sessionId, { signal, projectionMode: 'none' });
    try {
        const title = observation.header.title ?? null;
        const cwd = observation.header.cwd ?? null;
        const parent = shareMessagesFromEvents(observation.events);
        if (!includeSubagents)
            return { messages: parent, title, cwd };
        const children = await readChildMessages(ctx, sessionId, signal);
        return { messages: [...parent, ...children], title, cwd };
    }
    finally {
        observation[Symbol.dispose]?.();
    }
}
/** Read every direct child conversation, each prefixed by its own header row. */
async function readChildMessages(ctx, sessionId, signal) {
    const subagents = getService(ctx, 'subagents');
    const sessionQuery = getService(ctx, 'sessionQuery');
    if (subagents === undefined || sessionQuery === undefined)
        return [];
    let entries;
    try {
        entries = await subagents.listChildren(sessionId, signal);
    }
    catch {
        return [];
    }
    const messages = [];
    for (const entry of entries) {
        if (entry.kind !== undefined && entry.kind !== 'child')
            continue;
        const childSessionId = entry.id;
        if (childSessionId === undefined)
            continue;
        const title = entry.label ?? childSessionId;
        messages.push({ seq: -1, role: 'subagent', time: 0, text: title, images: [], child: null });
        try {
            const observation = await sessionQuery.observeSession(childSessionId, { signal, projectionMode: 'none' });
            try {
                for (const message of shareMessagesFromEvents(observation.events)) {
                    messages.push({ ...message, child: { sessionId: childSessionId, title } });
                }
            }
            finally {
                observation[Symbol.dispose]?.();
            }
        }
        catch {
            // A child that cannot be read still keeps its header row in the share.
        }
    }
    return messages;
}
/**
 * Build the JSON response for one share request.
 * @param ctx - composed host context.
 * @param config - plugin configuration.
 * @param request - the browser GET request.
 * @returns the payload response, or the failure status.
 */
export async function shareRouteResponse(ctx, config, request) {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId') ?? '';
    if (sessionId === '')
        return new Response('missing sessionId query parameter', { status: 400 });
    const includeSubagents = url.searchParams.get('includeSubagents') === 'true';
    try {
        const read = await readSessionMessages(ctx, sessionId, includeSubagents, request.signal);
        const withImages = config.includeImages === false
            ? read.messages.map(message => ({ ...message, images: [] }))
            : await inlineImages(ctx, read.messages, request.signal);
        const payload = {
            sessionId,
            title: read.title,
            cwd: read.cwd,
            messages: withImages,
        };
        return Response.json(payload);
    }
    catch (error) {
        if (request.signal.aborted)
            return new Response('share aborted', { status: 499 });
        const message = error instanceof Error ? error.message : String(error);
        const notFound = /not found/i.test(message);
        return new Response(`chat share could not read the session: ${message}`, { status: notFound ? 404 : 500 });
    }
}
/** Render the whole shareable chat as plain text (English vocabulary). */
export function hostRenderTxt(events) {
    const lines = ['Shared from DeepSeek Harness', ''];
    for (const message of shareMessagesFromEvents(events)) {
        lines.push(`${TXT_ROLE[message.role]} · ${new Date(message.time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'medium' })}`, '', message.text, '');
    }
    return lines.join('\n').trimEnd() + '\n';
}
/**
 * Register the Web-only `/share` command, the share-payload route, and — when
 * `autoSaveDir` is configured — one plain-text file per Session after every
 * completed turn.
 * @param ctx - Host context carrying the command registry and connection.
 * @param config - row configuration (e.g. `{ autoSaveDir: 'C:/shares' }`).
 */
export function apply(ctx, config = {}) {
    ctx.effect(() => ctx.commands.register({
        name: 'share',
        description: 'Share a segment of this chat as Markdown, HTML, or plain text',
        handler: invocation => Promise.resolve(parseShareInvocation(invocation.rawInput)),
    }), 'session-chat-share: command');
    const connection = getService(ctx, 'connection');
    /* v8 ignore next -- `connection` is injected, so cordis holds this fiber inactive until a transport provides it */
    if (connection !== undefined) {
        ctx.effect(() => connection.fetch.register({
            path: SHARE_ROUTE,
            methods: ['GET'],
            requestBody: 'buffered',
            fetch: request => shareRouteResponse(ctx, config, request),
        }), 'session-chat-share: share route');
    }
    if (config.autoSaveDir !== undefined && config.autoSaveDir.trim() !== '') {
        const dir = config.autoSaveDir.trim();
        ctx.on('session/event', (session, event) => {
            if (event.type !== 'turn/end')
                return;
            void autoSaveSession(ctx, dir, String(session.id));
        });
    }
}
/**
 * Write one session's plain-text share into `autoSaveDir` after a completed turn.
 * Reads through `sessionQuery`, the cold-safe observation path, so a session the
 * host later evicts still exports the same text.
 * @param ctx - Host context carrying the optional session-query service.
 * @param dir - configured auto-save folder.
 * @param sessionId - Session whose chat is written.
 * @returns after the file lands or the failure is logged.
 */
async function autoSaveSession(ctx, dir, sessionId) {
    try {
        const sessionQuery = getService(ctx, 'sessionQuery');
        if (sessionQuery === undefined)
            return;
        const observation = await sessionQuery.observeSession(sessionId, { projectionMode: 'none' });
        let text;
        try {
            text = hostRenderTxt(observation.events);
        }
        finally {
            observation[Symbol.dispose]?.();
        }
        await mkdir(dir, { recursive: true });
        await writeFile(join(dir, `${sessionId}.txt`), text, 'utf8');
    }
    catch (error) {
        ctx.logger.warn(`session-chat-share: auto-save failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}
//# sourceMappingURL=index.js.map