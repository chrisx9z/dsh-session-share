/**
 * Browser state and actions for sharing a selected range of chat messages.
 *
 * Every row comes from one host payload read (`/api/session.share`), so the
 * dialog is independent of what the browser has paged into the transcript and
 * an export covers the whole session even after a reload.
 */
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store';
import { writeClipboard } from '@deepseek-ai/dsh-client-ui-primitives';
import { redactSensitive, renderShareHtml, renderShareMarkdown, renderShareTxt, shareFileName, } from "./render.js";
/** Cap on rows the dialog lists, so a huge session cannot stall the modal. */
export const SHARE_MAX_MESSAGES = 300;
/** Known controller error codes the dialog localizes; anything else is shown raw. */
export const CHAT_SHARE_ERROR = {
    copyFailed: 'copy-failed',
    downloadFailed: 'download-failed',
};
const INITIAL = { bySession: {} };
/** The share payload route owned by the host half (kept in sync with `SHARE_ROUTE`). */
const SHARE_ROUTE = '/api/session.share';
/** Resolve the browser's Host base with the connection carrier's null-origin fallback. */
function hostBase() {
    const origin = globalThis.location?.origin;
    return origin !== undefined && origin !== 'null' ? origin : 'http://dsh.internal';
}
function messageOf(error) {
    return error instanceof Error ? error.message : String(error);
}
/**
 * Read one session's share payload from the host route.
 * @param sessionId - session whose messages are shared.
 * @param signal - caller cancellation.
 * @returns the parsed payload.
 * @throws when the host route reports a failure.
 */
export async function fetchSharePayload(sessionId, signal) {
    const url = new URL(SHARE_ROUTE, hostBase());
    url.searchParams.set('sessionId', String(sessionId));
    url.searchParams.set('includeSubagents', 'true');
    const response = await fetch(url, { method: 'GET', signal });
    if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(detail === '' ? `Share failed: HTTP ${response.status}` : detail);
    }
    return await response.json();
}
/**
 * Hand a Blob to the browser download manager through an object URL.
 * @param blob - artifact bytes.
 * @param filename - browser download filename.
 */
export function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.setTimeout(() => { URL.revokeObjectURL(url); }, 10_000);
}
/** Apply best-effort redaction to every row's text. */
function redactRows(rows) {
    return rows.map(row => ({ ...row, text: redactSensitive(row.text) }));
}
/** Map the payload's inlined images to the data URIs the HTML export embeds. */
function imageMap(messages) {
    const images = new Map();
    for (const message of messages) {
        for (const image of message.images ?? []) {
            if (image.data !== null && !images.has(image.attachmentId)) {
                images.set(image.attachmentId, `data:${image.mediaType};base64,${image.data}`);
            }
        }
    }
    return images;
}
/** Project one payload message onto a dialog row. */
function rowOf(message) {
    return message.images.length === 0
        ? { seq: message.seq, role: message.role, text: message.text, time: message.time }
        : { seq: message.seq, role: message.role, text: message.text, time: message.time, images: message.images };
}
/**
 * Build the dialog rows for one payload, honoring the row options.
 * @param payload - host payload with parent and subagent items.
 * @param includeTools - keep tool-call rows.
 * @param includeSubagents - keep subagent header and child rows.
 * @returns every shareable row in payload order.
 */
export function shareRows(payload, includeTools, includeSubagents) {
    const rows = [];
    for (const message of payload.messages) {
        if (message.role === 'tool' && !includeTools)
            continue;
        if ((message.role === 'subagent' || message.child !== null) && !includeSubagents)
            continue;
        const row = rowOf(message);
        if (row.text.trim() === '')
            continue;
        rows.push(row);
    }
    return rows;
}
/** Owns one in-flight payload read per Session and publishes dialog state. */
export class ChatShareController {
    fetchPayload;
    clipboard;
    save;
    labels;
    toPng;
    /** uSES-safe state source shared by every Session-scoped contribution. */
    store = createSnapshotStore(INITIAL);
    active = new Map();
    payloads = new Map();
    disposed = false;
    /**
     * @param fetchPayload - host payload reader.
     * @param clipboard - clipboard writer returning whether the write landed.
     * @param save - browser save operation for the generated artifact Blob.
     * @param labels - optional live artifact vocabulary (follows the UI locale).
     * @param toPng - optional rasterizer for PNG downloads.
     */
    constructor(fetchPayload = fetchSharePayload, clipboard = writeClipboard, save = saveBlob, labels, toPng) {
        this.fetchPayload = fetchPayload;
        this.clipboard = clipboard;
        this.save = save;
        this.labels = labels;
        this.toPng = toPng;
    }
    /**
     * Open (or reopen) one Session's share dialog; concurrent gestures share one read.
     * @param sessionId - Session whose chat segment is shared.
     * @returns after the dialog state settles (open, loaded, or failed).
     */
    open(sessionId) {
        const existing = this.active.get(sessionId);
        if (existing !== undefined)
            return existing.done;
        if (this.disposed)
            return Promise.resolve();
        const cached = this.store.getSnapshot().bySession[String(sessionId)];
        if (cached !== undefined && !cached.loading && cached.error === null) {
            this.publish(sessionId, { ...cached, open: true });
            return Promise.resolve();
        }
        const abort = new AbortController();
        const done = this.load(sessionId, abort.signal).finally(() => { this.active.delete(sessionId); });
        this.active.set(sessionId, { abort, done });
        return done;
    }
    /**
     * Save the whole chat as one plain-text file, without opening the dialog.
     * @param sessionId - Session whose chat is saved.
     * @param lastN - keep only the newest n rows; the whole chat when absent.
     * @returns after the browser save starts or the failure is published.
     */
    async saveTxt(sessionId, lastN) {
        if (this.disposed)
            return;
        const controller = new AbortController();
        try {
            const payload = await this.payloadOf(sessionId, controller.signal);
            const all = shareRows(payload, true, true);
            const rows = lastN === undefined || lastN >= all.length ? all : all.slice(all.length - lastN);
            // A direct save has no dialog to ask, so it applies the dialog default.
            const messages = redactRows(rows);
            const text = renderShareTxt(messages, this.renderOptions());
            const from = Math.max(0, all.length - rows.length);
            this.save(new Blob([text], { type: 'text/plain;charset=utf-8' }), shareFileName(String(sessionId), from, Math.max(0, all.length - 1), 'txt'));
        }
        catch (error) {
            const entry = this.store.getSnapshot().bySession[String(sessionId)];
            if (entry !== undefined)
                this.publish(sessionId, { ...entry, error: messageOf(error) });
        }
    }
    /**
     * Close one Session's dialog without cancelling an in-flight read.
     * @param sessionId - Session whose dialog closes.
     */
    dismiss(sessionId) {
        const current = this.store.getSnapshot().bySession[String(sessionId)];
        if (current === undefined || !current.open)
            return;
        this.publish(sessionId, { ...current, open: false });
    }
    /**
     * Set the inclusive single-select range.
     * @param sessionId - Session owning the dialog.
     * @param from - start index.
     * @param to - end index.
     */
    setRange(sessionId, from, to) {
        const current = this.entry(sessionId);
        if (current === undefined)
            return;
        const last = Math.max(0, current.messages.length - 1);
        const start = Math.min(Math.max(0, Math.min(from, to)), last);
        const end = Math.min(Math.max(0, Math.max(from, to)), last);
        this.publish(sessionId, { ...current, from: start, to: end });
    }
    /**
     * Choose the artifact format.
     * @param sessionId - Session owning the dialog.
     * @param format - next format.
     */
    setFormat(sessionId, format) {
        const current = this.entry(sessionId);
        if (current === undefined || current.format === format)
            return;
        this.publish(sessionId, { ...current, format });
    }
    /**
     * Toggle best-effort redaction.
     * @param sessionId - Session owning the dialog.
     * @param redact - next redaction state.
     */
    setRedact(sessionId, redact) {
        const current = this.entry(sessionId);
        if (current === undefined || current.redact === redact)
            return;
        this.publish(sessionId, { ...current, redact });
    }
    /**
     * Toggle tool-call rows.
     * @param sessionId - Session owning the dialog.
     * @param includeTools - next tool-row state.
     */
    setIncludeTools(sessionId, includeTools) {
        const current = this.entry(sessionId);
        if (current === undefined || current.includeTools === includeTools)
            return;
        this.publish(sessionId, this.rebuild(sessionId, current, { includeTools }));
    }
    /**
     * Toggle subagent descendant rows.
     * @param sessionId - Session owning the dialog.
     * @param includeSubagents - next subagent-row state.
     * @returns after the rebuilt rows are published.
     */
    setIncludeSubagents(sessionId, includeSubagents) {
        const current = this.entry(sessionId);
        if (current === undefined || current.includeSubagents === includeSubagents)
            return Promise.resolve();
        this.publish(sessionId, this.rebuild(sessionId, current, { includeSubagents }));
        return Promise.resolve();
    }
    /**
     * Toggle multi-select mode; leaving it clears the selection.
     * @param sessionId - Session owning the dialog.
     * @param multiMode - next mode.
     */
    setMultiMode(sessionId, multiMode) {
        const current = this.entry(sessionId);
        if (current === undefined || current.multiMode === multiMode)
            return;
        const selected = multiMode
            ? Array.from({ length: current.messages.length }, (_, index) => index).filter(index => index >= current.from && index <= current.to)
            : [];
        this.publish(sessionId, { ...current, multiMode, selected });
    }
    /**
     * Replace the multi-select membership.
     * @param sessionId - Session owning the dialog.
     * @param indices - chosen row indices.
     */
    setSelected(sessionId, indices) {
        const current = this.entry(sessionId);
        if (current === undefined)
            return;
        const last = current.messages.length - 1;
        const selected = [...new Set(indices.filter(index => index >= 0 && index <= last))].sort((a, b) => a - b);
        this.publish(sessionId, { ...current, selected });
    }
    /**
     * Copy the selected range in the chosen format.
     * @param sessionId - Session owning the dialog.
     * @returns after the clipboard write settles.
     */
    async copy(sessionId) {
        const current = this.entry(sessionId);
        if (current === undefined)
            return;
        this.publish(sessionId, { ...current, busy: 'copy', copied: false, error: null });
        try {
            const messages = this.selection(current);
            const text = current.format === 'html'
                ? renderShareHtml(messages, { ...this.renderOptions(), images: imageMap(messages) })
                : current.format === 'txt'
                    ? renderShareTxt(messages, this.renderOptions())
                    : renderShareMarkdown(messages, this.renderOptions());
            const ok = await this.clipboard(text);
            const next = this.entry(sessionId);
            if (next === undefined)
                return;
            this.publish(sessionId, ok
                ? { ...next, busy: null, copied: true, error: null }
                : { ...next, busy: null, error: CHAT_SHARE_ERROR.copyFailed });
        }
        catch (error) {
            const next = this.entry(sessionId);
            if (next === undefined)
                return;
            this.publish(sessionId, { ...next, busy: null, error: messageOf(error) || CHAT_SHARE_ERROR.copyFailed });
        }
    }
    /**
     * Download the selected range in the chosen format.
     * @param sessionId - Session owning the dialog.
     * @returns after the browser save starts or the failure is published.
     */
    async download(sessionId) {
        const current = this.entry(sessionId);
        if (current === undefined)
            return;
        this.publish(sessionId, { ...current, busy: 'download', error: null });
        try {
            const messages = this.selection(current);
            if (current.format === 'png') {
                await this.downloadPng(sessionId, messages, current);
                return;
            }
            const options = current.format === 'html'
                ? { ...this.renderOptions(), images: imageMap(messages) }
                : this.renderOptions();
            const content = current.format === 'html'
                ? renderShareHtml(messages, options)
                : current.format === 'txt'
                    ? renderShareTxt(messages, options)
                    : renderShareMarkdown(messages, options);
            const mime = current.format === 'html'
                ? 'text/html;charset=utf-8'
                : current.format === 'txt' ? 'text/plain;charset=utf-8' : 'text/markdown;charset=utf-8';
            const filename = shareFileName(String(sessionId), current.from, current.to, current.format);
            this.save(new Blob([content], { type: mime }), filename);
            const next = this.entry(sessionId);
            if (next !== undefined)
                this.publish(sessionId, { ...next, busy: null });
        }
        catch (error) {
            const next = this.entry(sessionId);
            if (next !== undefined) {
                this.publish(sessionId, { ...next, busy: null, error: messageOf(error) || CHAT_SHARE_ERROR.downloadFailed });
            }
        }
    }
    /**
     * Abort active reads and reach quiescence.
     * @returns after every active operation settles.
     */
    async dispose() {
        this.disposed = true;
        const active = [...this.active.values()];
        for (const operation of active)
            operation.abort.abort();
        await Promise.allSettled(active.map(operation => operation.done));
    }
    async load(sessionId, signal) {
        this.publish(sessionId, {
            open: true,
            loading: true,
            messages: [],
            from: 0,
            to: 0,
            multiMode: false,
            selected: [],
            format: 'markdown',
            redact: true,
            includeTools: false,
            includeSubagents: false,
            busy: null,
            copied: false,
            error: null,
        });
        try {
            const payload = await this.payloadOf(sessionId, signal);
            if (signal.aborted)
                return;
            const rows = this.capRows(shareRows(payload, false, false));
            this.publish(sessionId, {
                open: true,
                loading: false,
                messages: rows,
                from: 0,
                to: Math.max(0, rows.length - 1),
                multiMode: false,
                selected: [],
                format: 'markdown',
                redact: true,
                includeTools: false,
                includeSubagents: false,
                busy: null,
                copied: false,
                error: null,
            });
        }
        catch (error) {
            if (signal.aborted)
                return;
            const entry = this.entry(sessionId);
            const base = entry ?? {
                open: true, loading: false, messages: [], from: 0, to: 0, multiMode: false, selected: [],
                format: 'markdown', redact: true, includeTools: false, includeSubagents: false,
                busy: null, copied: false, error: null,
            };
            this.publish(sessionId, { ...base, loading: false, error: messageOf(error) });
        }
    }
    async payloadOf(sessionId, signal) {
        const cached = this.payloads.get(sessionId);
        if (cached !== undefined)
            return cached;
        const payload = await this.fetchPayload(sessionId, signal);
        this.payloads.set(sessionId, payload);
        return payload;
    }
    rebuild(sessionId, current, patch) {
        const payload = this.payloads.get(sessionId);
        const includeTools = patch.includeTools ?? current.includeTools;
        const includeSubagents = patch.includeSubagents ?? current.includeSubagents;
        if (payload === undefined)
            return { ...current, includeTools, includeSubagents };
        const rows = this.capRows(shareRows(payload, includeTools, includeSubagents));
        return {
            ...current,
            includeTools,
            includeSubagents,
            messages: rows,
            from: 0,
            to: Math.max(0, rows.length - 1),
            multiMode: false,
            selected: [],
        };
    }
    capRows(rows) {
        return rows.length <= SHARE_MAX_MESSAGES ? [...rows] : rows.slice(rows.length - SHARE_MAX_MESSAGES);
    }
    selection(entry) {
        const rows = entry.multiMode
            ? entry.selected.flatMap((index) => {
                const row = entry.messages[index];
                return row === undefined ? [] : [row];
            })
            : entry.messages.slice(entry.from, entry.to + 1);
        return entry.redact ? redactRows(rows) : [...rows];
    }
    renderOptions() {
        return this.labels === undefined ? {} : { labels: this.labels() };
    }
    async downloadPng(sessionId, messages, current) {
        if (this.toPng === undefined)
            throw new Error('PNG export is unavailable on this host.');
        const node = document.createElement('div');
        node.style.position = 'fixed';
        node.style.left = '-10000px';
        node.style.top = '0';
        node.style.width = '820px';
        node.innerHTML = renderShareHtml(messages, { ...this.renderOptions(), images: imageMap(messages) });
        document.body.appendChild(node);
        try {
            const dataUrl = await this.toPng(node);
            const filename = shareFileName(String(sessionId), current.from, current.to, 'png');
            this.save(new Blob([dataUrl], { type: 'image/png' }), filename);
            const next = this.entry(sessionId);
            if (next !== undefined)
                this.publish(sessionId, { ...next, busy: null });
        }
        finally {
            node.remove();
        }
    }
    entry(sessionId) {
        return this.store.getSnapshot().bySession[String(sessionId)];
    }
    publish(sessionId, entry) {
        this.store.update((state) => {
            state.bySession = { ...state.bySession, [String(sessionId)]: entry };
        });
    }
}
//# sourceMappingURL=controller.js.map