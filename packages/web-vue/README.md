<div align="center">
  <h1>Geelato Web Vue</h1>
</div>

<div align="center">

Geelato's Vue UI library derived (forked) from the [Arco Design](https://arco.design/) project and customized for our business needs.
Upstream project: https://github.com/arco-design/arco-design-vue.
For full API and design specs, please refer to the upstream documentation. All modifications will be tracked in `CHANGELOG.md`.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md)

</div>

> **Fork notice.** `@geelato/web-vue` is our modified build of Arco Design Vue. It is **not** published,
> maintained, endorsed or reviewed by ByteDance or the Arco Design project, and it is **not** a drop-in
> alias for `@arco-design/web-vue` — install one, not both, or you will bundle two copies of the library
> and two sets of styles. License and attribution: [LICENSE](./LICENSE) · [NOTICE](./NOTICE).

## Import specifier in copied snippets

Upstream docs and StackOverflow answers import from `@arco-design/web-vue`. In this package the specifier
must be `@geelato/web-vue`:

```diff
- import { Button, Modal } from '@arco-design/web-vue';
- import '@arco-design/web-vue/dist/arco.css';
+ import { Button, Modal } from '@geelato/web-vue';
+ import '@geelato/web-vue/dist/arco.css';
```

Sub-paths keep the same shape (`/es/icon`, `/es/locale/lang/zh-cn`, `/dist/arco.css`).

The `arco-` CSS class prefix, `--arco-*` theme variables, `arco-theme` attribute and `dist/arco*.js` /
`dist/arco.css` file names are unchanged on purpose: they are the theme and CDN interface inherited from
upstream, and renaming them would break existing stylesheets and CDN links without any licensing benefit.

# Features

## Comprehensive

With more than 60 crafted components that you can use out of the box.

## Customizable theme

Extensive theme tokens can be customized to build your own theme. Two ways of customization are supported:

* [With less-loader](https://arco.design/vue/docs/theme)
* [Design Lab](https://arco.design/themes) - Recommended!

## TypeScript friendly

All components are written in TypeScript so it's type friendly.

# Installation

Available as an [npm package](https://www.npmjs.com/package/@geelato/web-vue)

```bash
// with npm
npm install @geelato/web-vue

// with yarn
yarn add @geelato/web-vue
```

# Examples

```typescript
import { createApp } from 'vue'
import GeelatoVue from '@geelato/web-vue';
import App from './App.vue';
import '@geelato/web-vue/dist/arco.css';

const app = createApp(App);
app.use(GeelatoVue);
app.mount('#app');
```

## Development

1. Use `npm install` to install basic packages such as `lerna` and `yarn`

2. Use `yarn install` to install the dependencies of each package in `workspaces` (If you encounter a `YN0018` error, you can use `YARN_CHECKSUM_BEHAVIOR=update yarn` to install)

3. Use `npm run init` to initialize the project

## Changelog

Run `pnpm -F @geelato/web-vue run changelog` to generate and update `CHANGELOG.md`. Please keep changelog entries up to date for every feature change or fix (Conventional Commits recommended).

# Useful Links

Upstream documentation is hosted by the Arco Design project, which we do not operate; it may lag behind the
changes in this fork. Our source of truth is this repository's component source and `CHANGELOG.md`.

* [Upstream documentation](https://arco.design/)
* [Upstream API docs](https://arco.design/vue)
* [Dark mode (upstream)](https://arco.design/vue/docs/dark)
* [Theme customization (upstream)](https://arco.design/vue/docs/theme)
* [Figma component library](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/ArcoDesign%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)

# Upstream ecosystem

These platforms belong to the Arco Design project, not to this fork:

| Project | Description |
| --- | --- |
| [React Component Library] | A React UI components library based on the Arco Design system |
| [Design Lab] | A platform to create and manage your themes |
| [Material Market] | A platform of customized materials from the Arco Design project |
| [Icon Box] | One-stop platform to manage your icons |
| [Arco Pro] | A solution to quickly building applications from scratch |

[React Component Library]: https://arco.design/react/docs/start

[Design Lab]: https://arco.design/themes

[Material Market]: https://arco.design/material

[Icon Box]: https://arco.design/iconbox

[Arco Pro]: https://arco.design/pro/

# Contributing

Developers interested in contributing should read the [Code of Conduct](https://github.com/geelato-projects/arco-design-vue/blob/main/CODE_OF_CONDUCT.md)
and the [Contributing Guide](https://github.com/geelato-projects/arco-design-vue/blob/main/CONTRIBUTING.md).

Thank you to all the people who already contributed to the upstream Arco Design Vue project!

<a href="https://github.com/arco-design/arco-design-vue/graphs/contributors"><img src="https://contrib.rocks/image?repo=arco-design/arco-design-vue" /></a>

# License & attribution

This package is released under the [MIT License](./LICENSE):

* Original work: `Copyright (c) 2021 Bytedance, Inc. and its affiliates.` — the upstream copyright and
  permission notices are preserved verbatim and are not altered by this fork.
* Modifications: `Copyright (c) 2025-present The Geelato Web Vue Authors.`

Provenance and trademark terms are in [NOTICE](./NOTICE). "Arco", "Arco Design" and "ByteDance" are
trademarks of their respective owners; the MIT License grants copyright permissions only, no trademark
rights, and those names are used here solely to identify the origin of the source code.
