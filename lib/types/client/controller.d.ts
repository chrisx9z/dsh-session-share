/**
 * Browser state and actions for sharing a selected range of chat messages.
 *
 * Every row comes from one host payload read (`/api/session.share`), so the
 * dialog is independent of what the browser has paged into the transcript and
 * an export covers the whole session even after a reload.
 */
import { type SnapshotStore } from '@deepseek-ai/dsh-client-store';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import { type ShareLabels } from './render.ts';
/** Output formats the shared artifact can take. */
export type ShareFormat = 'markdown' | 'html' | 'txt' | 'png';
/** One session image referenced by a message; `data` holds inlined base64 when the host sent it. */
export interface ShareImage {
    /** Durable attachment identity (the HTML export keys embedded images by it). */
    readonly attachmentId: string;
    readonly mediaType: string;
    /** Original display name, when the attachment kept one. */
    readonly name?: string;
    /** Canonical base64 bytes, or null when the host did not inline this image. */
    readonly data: string | null;
}
/** One shareable row on the ordered chat surface. */
export interface ShareMessage {
    /** Durable event seq the row came from (-1 for a subagent header row). */
    readonly seq: number;
    readonly role: 'user' | 'assistant' | 'tool' | 'subagent';
    /** Text blocks joined verbatim; `[image]` when the message carried only images. */
    readonly text: string;
    /** Unix epoch milliseconds of the durable event. */
    readonly time: number;
    /** Image blocks attached to this message (HTML exports embed them). */
    readonly images?: readonly ShareImage[];
}
/** One message as the host payload carries it. */
export interface SharePayloadMessage {
    readonly seq: number;
    readonly role: 'user' | 'assistant' | 'tool' | 'subagent';
    readonly time: number;
    readonly text: string;
    readonly images: readonly ShareImage[];
    /** Set only on items read from a subagent child conversation. */
    readonly child: {
        readonly sessionId: string;
        readonly title: string;
    } | null;
}
/** One session's host payload. */
export interface SharePayload {
    readonly sessionId: string;
    readonly title: string | null;
    readonly cwd: string | null;
    readonly messages: readonly SharePayloadMessage[];
}
/** Reads one session's share payload; wired to the host route by the client plugin. */
export type PayloadFetcher = (sessionId: SessionId, signal: AbortSignal) => Promise<SharePayload>;
/** Rasterize a detached artifact node to a PNG data URL; wired to `html-to-image`. */
export type PngConverter = (node: HTMLElement) => Promise<string>;
/** One Session's share-dialog state. */
export interface ChatShareEntry {
    readonly open: boolean;
    /** The host payload is still being read. */
    readonly loading: boolean;
    /** Shareable rows in chronological order (newest last), honoring the row options. */
    readonly messages: readonly ShareMessage[];
    /** Inclusive range start index into `messages` (single-select mode). */
    readonly from: number;
    /** Inclusive range end index into `messages` (single-select mode). */
    readonly to: number;
    /** Multi-select mode: exports the union of `selected` row indices instead of the range. */
    readonly multiMode: boolean;
    /** Row indices chosen in multi-select mode (sorted, no duplicates). */
    readonly selected: readonly number[];
    readonly format: ShareFormat;
    /** Best-effort redaction applied to every rendered artifact. */
    readonly redact: boolean;
    /** Tool-call rows included in the list and artifacts. */
    readonly includeTools: boolean;
    /** Subagent descendant conversations appended to the rows. */
    readonly includeSubagents: boolean;
    /** Which output action is in flight, if any. */
    readonly busy: 'copy' | 'download' | null;
    /** Whether the last copy succeeded (the dialog shows a brief check). */
    readonly copied: boolean;
    /** Raw error detail; the dialog maps known codes to localized copy. */
    readonly error: string | null;
}
/** Share-dialog states keyed by the Session whose Header owns the dialog. */
export interface ChatShareState {
    bySession: Record<string, ChatShareEntry | undefined>;
}
/** Cap on rows the dialog lists, so a huge session cannot stall the modal. */
export declare const SHARE_MAX_MESSAGES = 300;
/** Known controller error codes the dialog localizes; anything else is shown raw. */
export declare const CHAT_SHARE_ERROR: {
    readonly copyFailed: "copy-failed";
    readonly downloadFailed: "download-failed";
};
/**
 * Read one session's share payload from the host route.
 * @param sessionId - session whose messages are shared.
 * @param signal - caller cancellation.
 * @returns the parsed payload.
 * @throws when the host route reports a failure.
 */
export declare function fetchSharePayload(sessionId: SessionId, signal: AbortSignal): Promise<SharePayload>;
/**
 * Hand a Blob to the browser download manager through an object URL.
 * @param blob - artifact bytes.
 * @param filename - browser download filename.
 */
export declare function saveBlob(blob: Blob, filename: string): void;
/**
 * Build the dialog rows for one payload, honoring the row options.
 * @param payload - host payload with parent and subagent items.
 * @param includeTools - keep tool-call rows.
 * @param includeSubagents - keep subagent header and child rows.
 * @returns every shareable row in payload order.
 */
export declare function shareRows(payload: SharePayload, includeTools: boolean, includeSubagents: boolean): ShareMessage[];
/** Owns one in-flight payload read per Session and publishes dialog state. */
export declare class ChatShareController {
    private readonly fetchPayload;
    private readonly clipboard;
    private readonly save;
    private readonly labels?;
    private readonly toPng?;
    /** uSES-safe state source shared by every Session-scoped contribution. */
    readonly store: SnapshotStore<ChatShareState>;
    private readonly active;
    private readonly payloads;
    private disposed;
    /**
     * @param fetchPayload - host payload reader.
     * @param clipboard - clipboard writer returning whether the write landed.
     * @param save - browser save operation for the generated artifact Blob.
     * @param labels - optional live artifact vocabulary (follows the UI locale).
     * @param toPng - optional rasterizer for PNG downloads.
     */
    constructor(fetchPayload?: PayloadFetcher, clipboard?: (text: string) => Promise<boolean>, save?: (blob: Blob, filename: string) => void, labels?: (() => ShareLabels) | undefined, toPng?: PngConverter | undefined);
    /**
     * Open (or reopen) one Session's share dialog; concurrent gestures share one read.
     * @param sessionId - Session whose chat segment is shared.
     * @returns after the dialog state settles (open, loaded, or failed).
     */
    open(sessionId: SessionId): Promise<void>;
    /**
     * Save the whole chat as one plain-text file, without opening the dialog.
     * @param sessionId - Session whose chat is saved.
     * @param lastN - keep only the newest n rows; the whole chat when absent.
     * @returns after the browser save starts or the failure is published.
     */
    saveTxt(sessionId: SessionId, lastN?: number): Promise<void>;
    /**
     * Close one Session's dialog without cancelling an in-flight read.
     * @param sessionId - Session whose dialog closes.
     */
    dismiss(sessionId: SessionId): void;
    /**
     * Set the inclusive single-select range.
     * @param sessionId - Session owning the dialog.
     * @param from - start index.
     * @param to - end index.
     */
    setRange(sessionId: SessionId, from: number, to: number): void;
    /**
     * Choose the artifact format.
     * @param sessionId - Session owning the dialog.
     * @param format - next format.
     */
    setFormat(sessionId: SessionId, format: ShareFormat): void;
    /**
     * Toggle best-effort redaction.
     * @param sessionId - Session owning the dialog.
     * @param redact - next redaction state.
     */
    setRedact(sessionId: SessionId, redact: boolean): void;
    /**
     * Toggle tool-call rows.
     * @param sessionId - Session owning the dialog.
     * @param includeTools - next tool-row state.
     */
    setIncludeTools(sessionId: SessionId, includeTools: boolean): void;
    /**
     * Toggle subagent descendant rows.
     * @param sessionId - Session owning the dialog.
     * @param includeSubagents - next subagent-row state.
     * @returns after the rebuilt rows are published.
     */
    setIncludeSubagents(sessionId: SessionId, includeSubagents: boolean): Promise<void>;
    /**
     * Toggle multi-select mode; leaving it clears the selection.
     * @param sessionId - Session owning the dialog.
     * @param multiMode - next mode.
     */
    setMultiMode(sessionId: SessionId, multiMode: boolean): void;
    /**
     * Replace the multi-select membership.
     * @param sessionId - Session owning the dialog.
     * @param indices - chosen row indices.
     */
    setSelected(sessionId: SessionId, indices: readonly number[]): void;
    /**
     * Copy the selected range in the chosen format.
     * @param sessionId - Session owning the dialog.
     * @returns after the clipboard write settles.
     */
    copy(sessionId: SessionId): Promise<void>;
    /**
     * Download the selected range in the chosen format.
     * @param sessionId - Session owning the dialog.
     * @returns after the browser save starts or the failure is published.
     */
    download(sessionId: SessionId): Promise<void>;
    /**
     * Abort active reads and reach quiescence.
     * @returns after every active operation settles.
     */
    dispose(): Promise<void>;
    private load;
    private payloadOf;
    private rebuild;
    private capRows;
    private selection;
    private renderOptions;
    private downloadPng;
    private entry;
    private publish;
}
//# sourceMappingURL=controller.d.ts.map