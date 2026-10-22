<div align="center">
  <h1>Geelato Web Vue</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) 派生（fork）并按 Geelato 业务需求改造的 Vue UI 组件库。
原始开源项目地址：https://github.com/arco-design/arco-design-vue。
完整 API 与设计规范请参考官方文档；本仓库主要记录我们的改造与扩展，所有变更将同步至 `CHANGELOG.md`。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

> **来源说明。** `@geelato/web-vue` 是我们基于 Arco Design Vue 改造的版本，**不是**字节跳动或 Arco Design
> 项目发布、维护、审核或背书的产品，也**不是** `@arco-design/web-vue` 的别名 —— 两者只装一个，同时装会把库和
> 样式各打进两份。许可与署名见 [LICENSE](./LICENSE) · [NOTICE](./NOTICE)。

## 复制示例代码时的包名差异

上游文档与网上答案里的示例都是 `import ... from '@arco-design/web-vue'`，在本包中需要替换成
`@geelato/web-vue`：

```diff
- import { Button, Modal } from '@arco-design/web-vue';
- import '@arco-design/web-vue/dist/arco.css';
+ import { Button, Modal } from '@geelato/web-vue';
+ import '@geelato/web-vue/dist/arco.css';
```

子路径形状不变（`/es/icon`、`/es/locale/lang/zh-cn`、`/dist/arco.css`）。

`arco-` 类名前缀、`--arco-*` 主题变量、`arco-theme` 属性以及 `dist/arco*.js`、`dist/arco.css` 文件名
**有意保留**：它们继承自上游，属于主题接口与 CDN 路径，改名会让既有样式和引用链接全部失效，而在许可层面没有任何收益。

# 特性

## 全面

60多个开箱即用的高质量组件, 可以覆盖绝大部份的业务场景。

## 主题配置

海量的样式 tokens, 支持全局以及组件级别的主题配置。有以下2种方式可以定制主题：

* [Less-loader](https://arco.design/vue/docs/theme)
* [风格配置平台](https://arco.design/themes) - 推荐!

## TypeScript 友好

所有组件都是用 TypeScript 编写的，所以天然的类型友好。

# 安装

[npm package](https://www.npmjs.com/package/@geelato/web-vue)

```bash
// npm
npm install @geelato/web-vue

// yarn
yarn add @geelato/web-vue
```

# 例子

```typescript
import { createApp } from 'vue'
import GeelatoVue from '@geelato/web-vue';
import App from './App.vue';
import '@geelato/web-vue/dist/arco.css';

const app = createApp(App);
app.use(GeelatoVue);
app.mount('#app');
```

## 开发

1. 使用 `npm install -g` 安装 `lerna` 和 `yarn` 等基础包

2. 使用 `yarn install` 安装 `workspaces` 中各个包的依赖（如果遇到 `YN0018` 错误，可以使用 `YARN_CHECKSUM_BEHAVIOR=update yarn` 进行安装）

3. 使用 `npm run init` 初始化项目

## 变更日志

运行 `pnpm -F @geelato/web-vue run changelog` 生成并更新 `CHANGELOG.md`，请在每次功能变更或修复后及时维护变更记录（建议使用 Conventional Commits）。


# 相关链接

上游文档由 Arco Design 项目托管，并非我们运营，其内容可能滞后于本仓库的改动。本仓库的权威依据是组件源码与
`CHANGELOG.md`。

* [上游官网](https://arco.design/)
* [上游组件文档](https://arco.design/vue)
* [暗黑模式（上游）](https://arco.design/vue/docs/dark)
* [主题配置（上游）](https://arco.design/vue/docs/theme)
* [Figma 设计资源](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/ArcoDesign%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)

# 上游生态

以下平台属于 Arco Design 项目，不属于本 fork：

| 项目               | 介绍                                             |
| --------------------- | ------------------------------------------------------- |
| [React 组件库] | 基于 [Arco Design](https://arco.design/) 的 React UI 组件库。 |
| [风格配置平台] | 精确到组件级的主题视觉配置平台 |
| [物料平台] | 上游 Arco Design 项目提供的业务定制物料平台 |
| [图标平台] | 一站式图标管理平台 |
| [Arco Pro] | 快速构建中后台的前端解决方案 |

[React 组件库]: https://arco.design/react/docs/start
[风格配置平台]: https://arco.design/themes
[物料平台]: https://arco.design/material
[图标平台]: https://arco.design/iconbox
[Arco Pro]: https://arco.design/pro/

# 参与贡献

贡献之前请先阅读 [行为准则](https://github.com/geelato-projects/arco-design-vue/blob/main/CODE_OF_CONDUCT.md)
和 [贡献指南](https://github.com/geelato-projects/arco-design-vue/blob/main/CONTRIBUTING.zh-CN.md)。

感谢所有为上游 Arco Design Vue 项目做过贡献的人!

<a href="https://github.com/arco-design/arco-design-vue/graphs/contributors"><img src="https://contrib.rocks/image?repo=arco-design/arco-design-vue" /></a>

# 许可与署名

本包以 [MIT 许可证](./LICENSE) 发布：

* 原始作品：`Copyright (c) 2021 Bytedance, Inc. and its affiliates.` —— 上游版权与许可声明原文保留，未被本 fork 修改。
* 我们的修改：`Copyright (c) 2025-present The Geelato Web Vue Authors.`

溯源与商标条款见 [NOTICE](./NOTICE)。"Arco"、"Arco Design"、"ByteDance" 为各自权利人的商标；MIT 许可证只授予
著作权许可，不授予商标许可，这些名称在本包中仅用于标识代码来源。
