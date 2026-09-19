# dsh-session-share

English | [中文](README.zh.md)

Share a selected range of chat messages as Markdown, HTML, TXT, or PNG — a community plugin for
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (tagged
[`dsh-plugin`](https://github.com/topics/dsh-plugin) and listed in the
[awesome-dsh-plugin](https://awesome-dsh-plugin.com) market registry).

This repository is the **standalone distribution** of the plugin: it ships both halves prebuilt
(`lib/`), installable with `dsh plugin add` and from the Plugin Market. The reference
implementation lives in the harness repository as `packages/session-query/session-chat-share`,
where both halves are built and tested.

Compatibility: **DeepSeek Harness 0.1.6-alpha.2 or later**. The plugin reads session data through
the host's session-query service and one payload route, and contributes to the Session Header's
utilities slot. Harness `0.1.0-rc.x` needs the previous `dsh-chat-share` package instead (its last compatible release is `dsh-chat-share@1.3.0`).

## What it does

- Registers the Web `/share` slash command — plain `/share` opens the dialog, `/share txt` saves
  the whole chat as one `.txt`, `/share last <n>` saves only the newest `n` messages (combine:
  `/share txt last 10`).
- The **browser half** adds a **Share** action to the Session Header. The dialog lists the
  session's shareable messages (append-origin `user/message` and `assistant/message` text), lets
  you pick an inclusive range via From/To selects or by clicking message rows — or switch to
  **multi-select mode** to export the union of chosen rows — choose Markdown, HTML, TXT, or PNG,
  preview the rendered artifact (GFM), then copy it to the clipboard or download the file
  (`.md` / `.html` / `.txt` / `.png`). Nothing is uploaded: the recipient opens the artifact
  directly.
- Options: **redact sensitive info** (credential shapes and local absolute/home paths, on by
  default), **include tool calls** (bounded tool-call rows, off by default), and **include
  subagent conversations** (child sessions appended with section headers, off by default).
- The HTML artifact is a self-contained page with **GFM-lite** rendering (headings, lists,
  tables, blockquotes, links, fenced code, inline code/emphasis) and **session images embedded
  as data URIs**; artifacts follow the active UI locale. PNG is the HTML artifact rasterized as
  one long image.
- Optional host-side **auto-save**: with `autoSaveDir` configured on the plugin row, one TXT per
  session is written after every completed turn.
- Session data is read **cold-safely through the host's session-query service**, so an export
  covers the whole session no matter what the browser has paged into the transcript — no
  persistence changes and no model involvement. The command stays on the human-command plane with
  zero token effect.

## Install

**npm** (preferred — the Plugin Market prefers npm sources):

```sh
dsh plugin --profile demo add dsh-session-share
```

**GitHub** (alternative; ships the same prebuilt artifacts):

```sh
dsh plugin --profile demo add github:chrisx9z/dsh-session-share#v1.4.2
```

The package ships **prebuilt artifacts** (`lib/` — host and browser halves), so neither install
needs a build step. Releases are tagged `v1.x.y`; pin a tag or commit for reproducible installs.

Then use it in any session of that profile:

```
/share
```

### Plugin Market

The plugin is listed in the [awesome-dsh-plugin](https://awesome-dsh-plugin.com) registry, so it
appears in **Settings → Plugin Market** — browse, one-click install, and updates once the catalog
refreshes (usually within a day of a registry change). The npm source above makes market installs
resolve to the published package.

## Browser-half requirements

The installed package's browser half is picked up by the host's `dsh.client` scan, so the Header
button and its dialog work on hosts whose composition includes it. Its imports are limited to
platform modules every web build provides (`@deepseek-ai/dsh-client-store`,
`@deepseek-ai/dsh-client-ui-primitives`, React), plus a bundled copy of `html-to-image` used for
PNG export.

For the official distribution path (the harness repository's own web bundle), integrate the
package as `packages/session-query/session-chat-share` and compose the `chat-share` row in
`packages/bundle/web-app/cordis.patch.yml`.

## How it works

- Host half (`src/index.ts`): registers `/share` on the human-command plane and serves
  `GET /api/session.share?sessionId=<id>&includeSubagents=<bool>`. The route observes the session
  through `sessionQuery` (live or cold), folds durable events into shareable messages
  (`user/message`, `assistant/message`, append-origin `tool/call`), appends direct subagent
  children when asked, and inlines referenced images as base64. With `autoSaveDir` configured it
  also writes one TXT per session after each completed turn.
- Browser half (`src/client/`): a controller fetches that payload once per session, keeps
  per-session dialog state, filters rows by the dialog options, and renders the chosen range with
  pure renderers (`render.ts`) into Markdown (verbatim text under role headers), a self-contained
  HTML page (GFM-lite), plain text, or a PNG rasterization.
- The dialog lists at most the newest 300 shareable rows and says so; direct saves (`/share txt`)
  always export the whole chat.

## Development and tests

The package's test suite (command and payload-route behaviour, controller state, renderers,
dialog, header action, and a real Loader composition) runs inside a deepseek-harness checkout
where the `@deepseek-ai/*` workspace dependencies resolve:

```sh
pnpm exec vitest run packages/session-query/session-chat-share
```

## Limitations

- The dialog lists up to 300 shareable rows; older messages stay reachable through direct saves,
  which always export the whole chat.
- Sharing is a copy/download artifact, not a hosted link: nothing is uploaded to a server.
- Redaction is best-effort pattern matching, not a guarantee; review the artifact before sharing.
- Message text is shared as rendered on the surface; reasoning text and tool results are not
  included (tool calls only, opt-in).
- The sidebar session-row `...` menu entries that older harness versions supported are gone, since
  harness 0.1.6 no longer exposes a session-row menu registry to plugins.

## License

MIT
