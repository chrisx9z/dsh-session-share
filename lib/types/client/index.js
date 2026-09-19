/**
 * Browser half of chat-segment share: the Session-header share action and the
 * modal it opens. Rows arrive from the host share route, so this half owns only
 * presentation, format choice, and the browser-side save.
 */
import { toPng } from 'html-to-image';
import { ChatShareController } from "./controller.js";
import { ChatShareHeaderAction } from "./HeaderAction.js";
import { en, NS, zh } from "./locales.js";
/** Required services for the dictionaries and the header-slot contribution. */
export const inject = ['slots', 'locale'];
/** Follow the live UI locale in generated artifacts. */
function labelsOf(t) {
    return () => ({
        user: t('role.user'),
        assistant: t('role.assistant'),
        tool: t('role.tool'),
        subagent: t('role.subagent'),
        sharedFrom: t('artifact.sharedFrom'),
    });
}
/** Run a `/share` command intent produced by the host command handler. */
function runShareIntent(controller, sessionId, resultText) {
    const [verb, flag, count] = resultText.split(':');
    if (verb !== 'share')
        return;
    if (flag === 'txt') {
        const lastN = count === undefined || count === '' ? undefined : Number(count);
        void controller.saveTxt(sessionId, Number.isFinite(lastN) ? lastN : undefined);
    }
    else {
        void controller.open(sessionId);
    }
}
/**
 * Provide the share controller and mount its dialog into the Session Header.
 * @param ctx - browser context carrying slots and locale services.
 */
export function apply(ctx) {
    const controller = new ChatShareController(undefined, undefined, undefined, labelsOf(ctx.locale.bind(NS)), node => toPng(node, { pixelRatio: 2, cacheBust: true }));
    ctx.provide('chatShare', controller);
    ctx.effect(() => async () => { await controller.dispose(); }, 'session-share: browser lifecycle');
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'session-share: browser dictionaries');
    ctx.on('command/executed', (sessionId, commandName, result) => {
        if (commandName === 'share' && result.kind === 'success')
            runShareIntent(controller, sessionId, result.text ?? 'share');
    });
    ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
        name: 'conversation.session.header.utilities',
        id: 'session-share',
        locale: NS,
        inject: () => ({
            hooks: { chatShare: controller.store },
            open: (sessionId) => controller.open(sessionId),
            setRange: (sessionId, from, to) => { controller.setRange(sessionId, from, to); },
            setFormat: (sessionId, format) => { controller.setFormat(sessionId, format); },
            setRedact: (sessionId, redact) => { controller.setRedact(sessionId, redact); },
            setIncludeTools: (sessionId, includeTools) => {
                controller.setIncludeTools(sessionId, includeTools);
            },
            setIncludeSubagents: (sessionId, includeSubagents) => controller.setIncludeSubagents(sessionId, includeSubagents),
            setMultiMode: (sessionId, multiMode) => { controller.setMultiMode(sessionId, multiMode); },
            setSelected: (sessionId, indices) => { controller.setSelected(sessionId, indices); },
            copy: (sessionId) => controller.copy(sessionId),
            download: (sessionId) => controller.download(sessionId),
            dismiss: (sessionId) => { controller.dismiss(sessionId); },
        }),
    }, ChatShareHeaderAction));
}
//# sourceMappingURL=index.js.map