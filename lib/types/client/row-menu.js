import { jsx as _jsx } from "react/jsx-runtime";
import { IconDownloadOutline16, IconShareOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
/**
 * Build the two Session row-menu contributions, in display order.
 * @param open - open the share dialog for one Session.
 * @param saveTxt - save the whole chat as one TXT file.
 * @param labels - live labels, read on every render so they follow the UI locale.
 * @returns the contributions the browser half registers on the harness registry.
 */
export function chatShareRowMenuActions(open, saveTxt, labels) {
    return [
        {
            id: 'chat-share',
            order: 10,
            label: () => labels().share,
            icon: _jsx(IconShareOutline16, { size: 16 }),
            run: sessionId => open(sessionId),
        },
        {
            id: 'chat-share-save-txt',
            order: 20,
            label: () => labels().saveTxt,
            icon: _jsx(IconDownloadOutline16, { size: 16 }),
            run: sessionId => saveTxt(sessionId),
        },
    ];
}
//# sourceMappingURL=row-menu.js.map