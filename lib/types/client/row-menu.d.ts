/**
 * Session row-menu contributions for the chat-segment share dialog.
 *
 * The harness exposes `sessionRowMenu` only in builds whose ui-workspace
 * carries the contribution registry; the browser half registers these two rows
 * through `ctx.inject`, so a stock build without the registry simply never
 * calls this module's product and keeps the Header button as its entry point.
 */
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { SessionRowMenuAction } from '@deepseek-ai/dsh-client-ui-workspace/client';
/** Localized row labels for the two contributions. */
export interface ChatShareMenuLabels {
    /** Open the share dialog for one Session. */
    readonly share: string;
    /** Save the whole chat as one TXT file, without opening the dialog. */
    readonly saveTxt: string;
}
/**
 * Build the two Session row-menu contributions, in display order.
 * @param open - open the share dialog for one Session.
 * @param saveTxt - save the whole chat as one TXT file.
 * @param labels - live labels, read on every render so they follow the UI locale.
 * @returns the contributions the browser half registers on the harness registry.
 */
export declare function chatShareRowMenuActions(open: (sessionId: SessionId) => void | Promise<void>, saveTxt: (sessionId: SessionId) => void | Promise<void>, labels: () => ChatShareMenuLabels): readonly SessionRowMenuAction[];
//# sourceMappingURL=row-menu.d.ts.map