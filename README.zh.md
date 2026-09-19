# dsh-session-share

[English](README.md) | 中文

将选中的聊天片段分享为 Markdown、HTML、TXT 或 PNG——面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的社区插件（已标记 [`dsh-plugin`](https://github.com/topics/dsh-plugin)，并收录于 [awesome-dsh-plugin](https://awesome-dsh-plugin.com) 市场目录）。

本仓库是该插件的**独立分发版**：host 与 browser 两个半区均以预构建产物（`lib/`）随包发布，可通过 `dsh plugin add` 或插件市场安装。参考实现位于 harness 仓库的 `packages/session-query/session-chat-share`，两个半区在那里构建并通过测试。

兼容性：**DeepSeek Harness 0.1.6-alpha.2 或更高版本**。插件通过 host 的 session-query 服务与一条载荷路由读取会话数据，并把控件贡献到 Session Header 的 utilities 槽位。更早的 harness 版本（0.1.0-rc.x）请改用此前的 `dsh-chat-share` 包（最后兼容版本为 `dsh-chat-share@1.3.0`）。

## 功能

- 注册 Web `/share` 斜杠命令：`/share` 打开对话框，`/share txt` 将整个聊天保存为一个 `.txt`，`/share last <n>` 只保存最新的 `n` 条消息（可组合：`/share txt last 10`）。
- **浏览器半区**在 Session Header 添加 **Share** 按钮。对话框列出会话中可分享的消息（追加来源的 `user/message` 与 `assistant/message` 文本），可通过 From/To 下拉框或点击消息行选择闭区间范围——也可切换到**多选模式**导出所选行的并集——选择 Markdown、HTML、TXT 或 PNG，预览渲染结果（GFM），然后复制到剪贴板或下载为文件（`.md` / `.html` / `.txt` / `.png`）。不会上传任何内容：接收方直接打开产物即可。
- 选项：**脱敏敏感信息**（凭据形态与本地绝对/家目录路径，默认开启）、**包含工具调用**（有界工具调用行，默认关闭）、**包含子代理对话**（子会话以分节标题追加，默认关闭）。
- HTML 产物是自包含页面，具备 **GFM-lite** 渲染（标题、列表、表格、引用、链接、围栏代码、行内代码/强调），并把**会话图片以 data URI 内嵌**；产物跟随当前 UI 语言。PNG 是把 HTML 产物栅格化成长图。
- 可选的 host 端**自动保存**：在插件行上配置 `autoSaveDir` 后，每个回合结束都会为每个会话写一个 TXT。
- 会话数据**通过 host 的 session-query 服务冷读**，因此无论浏览器已分页多少内容，导出都覆盖整个会话——不改动持久化，也不涉及模型。命令停留在人工命令平面，Token 影响为零。

## 安装

**npm**（推荐——插件市场优先 npm 源）：

```sh
dsh plugin --profile demo add dsh-session-share
```

**GitHub**（备选；附带相同的预构建产物）：

```sh
dsh plugin --profile demo add github:chrisx9z/dsh-session-share#v1.4.2
```

包内已带**预构建产物**（`lib/`——host 与 browser 两个半区），两种安装都不需要构建步骤。发布版本以 `v1.x.y` 标记；如需可复现安装，可固定 tag 或 commit。

然后在该 profile 的任意会话中使用：

```
/share
```

### 插件市场

插件已收录于 [awesome-dsh-plugin](https://awesome-dsh-plugin.com) 目录，因此会出现在 **设置 → 插件市场** 中——可浏览、一键安装，目录刷新后即可获得更新（通常一天内生效）。上方的 npm 源可让市场安装直接解析到已发布的包。

## 浏览器半区要求

已安装包的浏览器半区由 host 的 `dsh.client` 扫描识别，因此只要其组合包含本插件，Header 按钮与对话框即可工作。其导入仅限所有 Web 构建都提供的平台模块（`@deepseek-ai/dsh-client-store`、`@deepseek-ai/dsh-client-ui-primitives`、React），外加一份用于 PNG 导出的内置 `html-to-image`。

若要走官方分发路径（harness 仓库自带的 Web bundle），请把包集成到 `packages/session-query/session-chat-share`，并在 `packages/bundle/web-app/cordis.patch.yml` 中组合 `chat-share` 行。

## 工作原理

- Host 半边（`src/index.ts`）：在人工命令平面注册 `/share`，并提供 `GET /api/session.share?sessionId=<id>&includeSubagents=<bool>`。该路由通过 `sessionQuery` 观测会话（活跃或冷会话），把持久事件折叠为可分享消息（`user/message`、`assistant/message`、追加来源的 `tool/call`），在需要时追加直接子代理会话，并把引用的图片内联为 base64。配置 `autoSaveDir` 后，它还会在每个回合结束为每个会话写一个 TXT。
- 浏览器半区（`src/client/`）：控制器每个会话只取一次载荷，维护每会话对话框状态，按选项过滤行，并用纯渲染器（`render.ts`）把所选范围渲染为 Markdown（角色标题下保留原文）、自包含 HTML 页面（GFM-lite）、纯文本或 PNG 长图。
- 对话框最多列出最新的 300 行并会提示；直接保存（`/share txt`）始终导出完整对话。

## 开发与测试

包的测试套件（命令与载荷路由行为、控制器状态、渲染器、对话框、Header 操作，以及真实的 Loader 组合）需要在 `@deepseek-ai/*` 工作区依赖可解析的 deepseek-harness 检出中运行：

```sh
pnpm exec vitest run packages/session-query/session-chat-share
```

## 限制

- 对话框最多列出 300 行可分享消息；更早的消息可通过直接保存获取，直接保存始终导出完整对话。
- 分享是复制/下载产物，而非托管链接：不上传任何内容到服务器。
- 脱敏是尽力而为的模式匹配，不构成保证；分享前请自行检查产物。
- 消息文本按界面呈现分享；推理文本与工具结果不包含在内（仅工具调用，需显式开启）。
- 早期 harness 版本支持的侧边栏会话行 `...` 菜单项已不再提供，因为 harness 0.1.6 不再向插件开放会话行菜单注册表。

## License

MIT
