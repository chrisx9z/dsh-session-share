/**
 * Browser half of chat-segment share: the Session-header share action and the
 * modal it opens. Rows arrive from the host share route, so this half owns only
 * presentation, format choice, and the browser-side save.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import { ChatShareController } from './controller.ts';
import { type SessionChatShareKey } from './locales.ts';
declare module '@deepseek-ai/cordis' {
    interface Context {
        chatShare: ChatShareController;
    }
}
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'session-share': SessionChatShareKey;
    }
}
export type { ChatShareEntry, ChatShareState, ShareFormat, ShareMessage } from './controller.ts';
/** Required services for the dictionaries and the header-slot contribution. */
export declare const inject: string[];
/**
 * Provide the share controller and mount its dialog into the Session Header.
 * @param ctx - browser context carrying slots and locale services.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map