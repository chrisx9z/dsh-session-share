/**
 * Browser half of chat-segment share: the Session-header share action and the
 * modal it opens. Rows arrive from the host share route, so this half owns only
 * presentation, format choice, and the browser-side save.
 */
import { toPng } from 'html-to-image';
import { ChatShareController } from "./controller.js";
import { ChatShareHeaderAction } from "./HeaderAction.js";
import { en, NS, zh } from "./locales.js";
import { chatShareRowMenuActions } from "./row-menu.js";
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
/** Follow the live UI locale in the sidebar row menu. */
function menuLabelsOf(t) {
    return () => ({ share: t('menu.share'), saveTxt: t('menu.saveTxt') });
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
    ctx.effect(() => async () => { await controller.dispose(); }, 'session-chat-share: browser lifecycle');
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'session-chat-share: browser dictionaries');
    ctx.on('command/executed', (sessionId, commandName, result) => {
        if (commandName === 'share' && result.kind === 'success')
            runShareIntent(controller, sessionId, result.text ?? 'share');
    });
    // Sidebar Session row menu: only a harness whose ui-workspace carries the
    // contribution registry provides `sessionRowMenu`. `ctx.inject` keeps this a
    // soft dependency — on a build without the registry the callback never runs
    // and the Header action above stays the single entry point.
    ctx.inject(['sessionRowMenu'], (menuCtx) => {
        const t = menuCtx.locale.bind(NS);
        menuCtx.effect(() => {
            // A composition can carry this plugin twice (bundle row plus an installed
            // package); the registry rejects duplicate ids, so an already-registered
            // row is left to its owner instead of failing the whole browser boot.
            const registered = new Set(menuCtx.sessionRowMenu.getSnapshot().map(action => action.id));
            const disposers = chatShareRowMenuActions(sessionId => controller.open(sessionId), sessionId => controller.saveTxt(sessionId), menuLabelsOf(t))
                .filter(action => !registered.has(action.id))
                .map(action => menuCtx.sessionRowMenu.register(action));
            return () => { for (const dispose of disposers)
                dispose(); };
        }, 'session-chat-share: session row menu');
    });
    ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
        name: 'conversation.session.header.utilities',
        id: 'session-chat-share',
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