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
import type { Context } from '@deepseek-ai/cordis';
import type { CommandResult } from '@deepseek-ai/dsh-commands';
export declare const name = "session-chat-share";
/** The command plane plus the browser transport carrying the payload route. */
export declare const inject: string[];
/** Stable browser route serving one session's shareable messages as JSON. */
export declare const SHARE_ROUTE = "/api/session.share";
/** Plugin config: host-side file writing and payload enrichment. */
export interface SessionChatShareConfig {
    /** Write one TXT per Session after every completed turn. */
    autoSaveDir?: string;
    /** Inline referenced images as base64 in the share payload. @default true */
    includeImages?: boolean;
}
/** One image carried in a share payload; `data` is canonical base64 once inlined. */
export interface SharePayloadImage {
    readonly attachmentId: string;
    readonly mediaType: string;
    readonly name?: string;
    readonly data: string | null;
}
/** The child conversation an item came from, when it is a subagent message. */
export interface SharePayloadChild {
    readonly sessionId: string;
    readonly title: string;
}
/** One shareable message in the browser payload. */
export interface SharePayloadMessage {
    readonly seq: number;
    readonly role: 'user' | 'assistant' | 'tool' | 'subagent';
    readonly time: number;
    readonly text: string;
    readonly images: readonly SharePayloadImage[];
    /** Set only on items read from a subagent child conversation. */
    readonly child: SharePayloadChild | null;
}
/** The complete transport payload for one session. */
export interface SharePayload {
    readonly sessionId: string;
    readonly title: string | null;
    readonly cwd: string | null;
    readonly messages: readonly SharePayloadMessage[];
}
/** Narrow structural view of one persisted content block. */
interface ShareBlock {
    readonly type?: string;
    readonly text?: string;
    readonly attachment?: {
        readonly attachmentId?: string;
        readonly mediaType?: string;
        readonly name?: string;
    };
}
/** Narrow structural view of one durable session event. */
interface ShareEvent {
    readonly type?: string;
    readonly seq?: number;
    readonly time?: number;
    readonly surfaceOp?: unknown;
    readonly data?: {
        readonly content?: readonly ShareBlock[];
        readonly message?: {
            readonly content?: readonly ShareBlock[];
        };
        readonly name?: string;
        readonly arguments?: string;
    };
}
/**
 * Parse a `/share` invocation into the intent token the browser observes.
 * Accepts: nothing (open the dialog), `txt`, `last <n>`, and combinations.
 * @param raw - trimmed command input.
 * @returns the command result; success text is `share[:txt[:<n>]]`.
 */
export declare function parseShareInvocation(raw: string): CommandResult;
/**
 * Fold durable session events into shareable messages, in log order.
 * Replacement surface ops are skipped: a share carries the conversation as it
 * currently stands, not the superseded text a rewrite replaced.
 * @param events - durable events of one session, in seq order.
 * @returns one payload message per shareable event.
 */
export declare function shareMessagesFromEvents(events: readonly ShareEvent[]): SharePayloadMessage[];
/**
 * Build the JSON response for one share request.
 * @param ctx - composed host context.
 * @param config - plugin configuration.
 * @param request - the browser GET request.
 * @returns the payload response, or the failure status.
 */
export declare function shareRouteResponse(ctx: Context, config: SessionChatShareConfig, request: Request): Promise<Response>;
/** Render the whole shareable chat as plain text (English vocabulary). */
export declare function hostRenderTxt(events: readonly unknown[]): string;
/**
 * Register the Web-only `/share` command, the share-payload route, and — when
 * `autoSaveDir` is configured — one plain-text file per Session after every
 * completed turn.
 * @param ctx - Host context carrying the command registry and connection.
 * @param config - row configuration (e.g. `{ autoSaveDir: 'C:/shares' }`).
 */
export declare function apply(ctx: Context, config?: SessionChatShareConfig): void;
export {};
//# sourceMappingURL=index.d.ts.map