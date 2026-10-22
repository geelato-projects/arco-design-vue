<div align="center">
  <h1>Geelato Web Vue</h1>
</div>

<div align="center">

A comprehensive Vue 3 UI component library, forked from
[Arco Design Vue](https://github.com/arco-design/arco-design-vue) and modified for the Geelato product line.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md)

</div>

> **Provenance.** This repository is an independent fork. The original work is
> `Copyright (c) 2021 Bytedance, Inc. and its affiliates.` and is used under its MIT License; our
> modifications are added under the same license. This project is **not** affiliated with, sponsored,
> endorsed, or officially maintained by ByteDance or the Arco Design project. See [NOTICE](./NOTICE).

# Installation

Available as an [npm package](https://www.npmjs.com/package/@geelato/web-vue).

```bash
// with npm
npm install @geelato/web-vue

// with yarn
yarn add @geelato/web-vue

// with pnpm
pnpm add @geelato/web-vue
```

# Examples

```typescript
import { createApp } from 'vue';
import GeelatoVue from '@geelato/web-vue';
import App from './App.vue';
import '@geelato/web-vue/dist/arco.css';

const app = createApp(App);
app.use(GeelatoVue);
app.mount('#app');
```

# Reading the docs — two things to know

1. **The package name is `@geelato/web-vue`, not `@arco-design/web-vue`.** Upstream documentation
   examples import from `@arco-design/web-vue`. Copy that as-is and you install the upstream package
   instead of this fork, so your theme overrides and the components changed here will not take effect.
   Replace the specifier: `@arco-design/web-vue` → `@geelato/web-vue`.
2. **API docs are still hosted by the upstream project** at [arco.design/vue](https://arco.design/vue)
   — we do not operate that site. It documents the upstream release it ships, so it can lag behind or
   miss what is changed here. The source of truth for this fork is this repository's component source
   and [CHANGELOG](./packages/web-vue/CHANGELOG.md).

# Why some names still say "arco"

Renaming these would break every existing theme, stylesheet and plugin without any licensing benefit,
so they are kept as functional identifiers inherited from upstream — they are not brand claims:

| What you see | Where | Why it stays |
| --- | --- | --- |
| `arco-` CSS class prefix (`arco-btn`, `arco-modal`) | rendered markup | Every theme file, override stylesheet and e2e selector targets it |
| `--arco-*` CSS custom properties, `arco-theme` attribute | theme tokens, dark mode | Same; they are the theme API |
| `dist/arco.css`, `dist/arco-vue.min.js` | built artifacts | Referenced by `unpkg`/CDN links and existing apps |
| `@arco-design/color` | runtime dependency | A normal third-party dependency of its own MIT license, not our package |

What **is** ours: the npm package name `@geelato/web-vue`, the `GeelatoVue` UMD global used by material
bundles, this repository, and everything in [NOTICE](./NOTICE).

# Features

## Comprehensive

With more than 60 crafted components that you can use out of the box.

## Customizable theme

Extensive theme tokens can be customized to build your own theme. Two ways of customization are supported:

* [With less-loader](https://arco.design/vue/docs/theme) (upstream docs)
* [Design Lab](https://arco.design/themes) (upstream platform)

## TypeScript friendly

All components are written in TypeScript so it's type friendly.

# Upstream ecosystem

Operated by the Arco Design project, not by us. Listed only because the design system, Figma resources and
platforms are theirs:

* [Arco Design website](https://arco.design/)
* [React component library](https://arco.design/react/docs/start)
* [Design Lab](https://arco.design/themes) · [Material Market](https://arco.design/material) · [Icon Box](https://arco.design/iconbox) · [Arco Pro](https://arco.design/pro/)
* [Figma component library](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/ArcoDesign%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)

# Repository layout

| Path | Package | Published |
| --- | --- | --- |
| `packages/web-vue` | `@geelato/web-vue` | yes |
| `packages/arco-*`, `packages/vite-plugin-arco-vue-docs`, `packages/web-vue-storybook` | `@arco-design/*` (internal build tooling, upstream names kept) | no — all `private` |

The internal tooling keeps its upstream `@arco-design/*` names on purpose: that npm scope belongs to the
upstream organization, so those packages are marked `private` and must never be published from here.

# Contributing

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md) and
the [Contributing Guide](./CONTRIBUTING.md).

Thank you to all the people who already contributed to the upstream Arco Design Vue project!

<a href="https://github.com/arco-design/arco-design-vue/graphs/contributors"><img src="https://contrib.rocks/image?repo=arco-design/arco-design-vue" /></a>

# License & attribution

Released under the [MIT License](./LICENSE).

* Original work: `Copyright (c) 2021 Bytedance, Inc. and its affiliates.` — notice preserved verbatim.
* Modifications: `Copyright (c) 2025-present The Geelato Web Vue Authors.`
* Provenance and trademark terms: [NOTICE](./NOTICE).

"Arco", "Arco Design" and "ByteDance" are trademarks of their respective owners. The MIT License grants
copyright permissions only and grants no trademark rights; these names appear here solely to identify the
origin of the source code.
