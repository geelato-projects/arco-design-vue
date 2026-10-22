<div align="center">
  <h1>Geelato Web Vue</h1>
</div>

<div align="center">

Vue 3 UI 组件库，派生（fork）自 [Arco Design Vue](https://github.com/arco-design/arco-design-vue)，
并按 Geelato 产品线的需求做了改造。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

> **来源说明。** 本仓库是一份独立的 fork。原始作品的版权为
> `Copyright (c) 2021 Bytedance, Inc. and its affiliates.`，按其 MIT 许可证使用；我们的修改在同一许可证下
> 提供。本项目与字节跳动、Arco Design 项目**不存在**任何关联、赞助、背书或官方维护关系，详见 [NOTICE](./NOTICE)。

# 安装

[npm 包](https://www.npmjs.com/package/@geelato/web-vue)

```bash
// npm
npm install @geelato/web-vue

// yarn
yarn add @geelato/web-vue

// pnpm
pnpm add @geelato/web-vue
```

# 例子

```typescript
import { createApp } from 'vue';
import GeelatoVue from '@geelato/web-vue';
import App from './App.vue';
import '@geelato/web-vue/dist/arco.css';

const app = createApp(App);
app.use(GeelatoVue);
app.mount('#app');
```

# 看文档时必须知道的两个差异

1. **包名是 `@geelato/web-vue`，不是 `@arco-design/web-vue`。** 上游文档里的示例都写成
   `import ... from '@arco-design/web-vue'`。原样复制就会装成上游官方包，本仓库的主题覆盖与改动都不会生效。
   请把示例里的包名替换：`@arco-design/web-vue` → `@geelato/web-vue`。
2. **API 文档仍由上游项目托管**在 [arco.design/vue](https://arco.design/vue)，我们并不运营该站点。
   它描述的是上游发布版本，可能滞后或不含本仓库的改动。本仓库的权威依据是组件源码与
   [变更日志](./packages/web-vue/CHANGELOG.md)。

# 为什么有些地方还叫 "arco"

下面这些标识改名会让既有主题、用户样式和插件全部失效，而在合规上没有任何收益，因此作为上游遗留的**功能性标识**
保留，它们不代表品牌归属：

| 你会看到 | 出现位置 | 保留原因 |
| --- | --- | --- |
| `arco-` 类名前缀（`arco-btn`、`arco-modal`） | 渲染出的 DOM | 所有主题文件、覆盖样式、E2E 选择器都指向它 |
| `--arco-*` CSS 变量、`arco-theme` 属性 | 主题 token、暗黑模式 | 同上，它们就是主题接口 |
| `dist/arco.css`、`dist/arco-vue.min.js` | 构建产物 | `unpkg`/CDN 引用与既有应用依赖该路径 |
| `@arco-design/color` | 运行时依赖 | 它本身是独立 MIT 许可的第三方依赖，不是我们的包 |

属于我们的部分是：npm 包名 `@geelato/web-vue`、物料 UMD 构建使用的 `GeelatoVue` 全局名、本仓库，
以及 [NOTICE](./NOTICE) 中列明的内容。

# 特性

## 全面

60 多个开箱即用的高质量组件，可以覆盖绝大部分的业务场景。

## 主题配置

海量的样式 tokens，支持全局以及组件级别的主题配置。有两种方式可以定制主题：

* [Less-loader](https://arco.design/vue/docs/theme)（上游文档）
* [风格配置平台](https://arco.design/themes)（上游平台）

## TypeScript 友好

所有组件都是用 TypeScript 编写的，所以天然的类型友好。

# 上游生态

以下平台由 Arco Design 项目运营，不属于本项目，列出仅因设计规范与资源来自上游：

* [Arco Design 官网](https://arco.design/)
* [React 组件库](https://arco.design/react/docs/start)
* [风格配置平台](https://arco.design/themes) · [物料平台](https://arco.design/material) · [图标平台](https://arco.design/iconbox) · [Arco Pro](https://arco.design/pro/)
* [Figma 设计资源](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/ArcoDesign%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)

# 仓库结构

| 目录 | 包名 | 是否发布 |
| --- | --- | --- |
| `packages/web-vue` | `@geelato/web-vue` | 是 |
| `packages/arco-*`、`packages/vite-plugin-arco-vue-docs`、`packages/web-vue-storybook` | `@arco-design/*`（内部构建工具，保留上游命名） | 否，全部 `private` |

内部工具包刻意保留 `@arco-design/*` 命名：该 npm scope 归属上游组织，因此这些包已标记 `private`，
不得由本仓库发布。

# 参与贡献

贡献之前请先阅读 [行为准则](./CODE_OF_CONDUCT.md) 和 [贡献指南](./CONTRIBUTING.zh-CN.md)。

感谢所有为上游 Arco Design Vue 项目做过贡献的人!

<a href="https://github.com/arco-design/arco-design-vue/graphs/contributors"><img src="https://contrib.rocks/image?repo=arco-design/arco-design-vue" /></a>

# 许可与署名

以 [MIT 许可证](./LICENSE) 发布。

* 原始作品：`Copyright (c) 2021 Bytedance, Inc. and its affiliates.` —— 声明原文保留。
* 我们的修改：`Copyright (c) 2025-present The Geelato Web Vue Authors.`
* 溯源与商标条款：见 [NOTICE](./NOTICE)。

"Arco"、"Arco Design"、"ByteDance" 为各自权利人的商标。MIT 许可证只授予著作权许可，不授予商标许可；
这些名称在此仅用于标识代码来源。
