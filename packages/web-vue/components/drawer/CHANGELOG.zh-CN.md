```yaml
changelog: true
```

## 3.0.0

`2026-10-22`

### 🆕 新增功能

- 新增读取宿主注册的全局弹窗行为偏好（`setDialogBehaviorReader`），ESC 与遮罩事件每次都取值、不在注册时快照，业务 props 只能收紧
- 新增 `useDialogCloseGuard`，内容组件可注册关闭守卫，支持异步否决
- `on-before-cancel` 支持 `() => boolean | void | Promise<boolean | void>`，关闭按钮、ESC、遮罩与取消按钮统一走同一条决口，异步确认未落定期间防重入
- 当偏好组合后不再保留任何便捷出口时，渲染浮动关闭按钮
- ESC 监听改为在抽屉可见期间常驻、按键时再判定是否允许关闭，因此在抽屉打开期间把偏好切回允许关闭即刻生效（此前仅当 `esc-to-close` 为 true 时才注册监听）

## 2.58.0

`2025-11-13`

### 🆕 新增功能

- 新增全屏能力：支持 `v-model:fullscreen` 与头部按钮 `show-fullscreen`
- 文档新增「头部全屏切换」示例

## 2.57.0

`2025-03-10`

### 🆕 新增功能

- 增加 bodyClass 和 bodyStyle ([#3437](https://github.com/arco-design/arco-design-vue/pull/3437))

### 💎 功能优化

- 修复执行 onBeforeOk  时错误未传播的问题 ([#3407](https://github.com/arco-design/arco-design-vue/pull/3407))


## 2.45.3

`2023-04-28`

### 💎 功能优化

- 添加 onOk & onCancel 的事件参数 ([#2358](https://github.com/arco-design/arco-design-vue/pull/2358))


## 2.43.2

`2023-02-24`

### 💎 功能优化

- 添加函数调用的更新方法 ([#2155](https://github.com/arco-design/arco-design-vue/pull/2155))


## 2.43.0

`2023-02-10`

### 🆕 新增功能

- 添加 `before-open` 和 `before-close` 事件 ([#2064](https://github.com/arco-design/arco-design-vue/pull/2064))


## 2.38.0

`2022-10-28`

### 🐛 问题修复

- 修复函数式调用中关闭未卸载内部组件的问题 ([#1778](https://github.com/arco-design/arco-design-vue/pull/1778))


## 2.37.4

`2022-09-30`

### 💎 功能优化

- 修复抽屉关闭的问题 ([#1696](https://github.com/arco-design/arco-design-vue/pull/1696))


## 2.36.1

`2022-09-09`

### 💎 功能优化

- on-before-ok 属性支持函数返回 Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))


## 2.35.2

`2022-08-29`


## 2.34.0

`2022-07-29`

### 🆕 新增功能

- 添加函数调用 ([#1409](https://github.com/arco-design/arco-design-vue/pull/1409))


## 2.33.0

`2022-07-08`

### 🆕 新增功能

- 添加 header 属性和插槽 ([#1399](https://github.com/arco-design/arco-design-vue/pull/1399))


## 2.19.0

`2022-03-11`

### 🆕 新增功能

- 增加 `hide-cancel` 属性 ([#803](https://github.com/arco-design/arco-design-vue/pull/803))


## 2.15.0

`2022-01-14`

### 🆕 新增功能

- 增加 `escToClose` 属性并默认开启 ([#577](https://github.com/arco-design/arco-design-vue/pull/577))


## 2.14.0

`2022-01-07`

### 🆕 新增功能

- 当没有设置 title 和 closable 时，隐藏标题栏 ([#515](https://github.com/arco-design/arco-design-vue/pull/515))


## 2.12.0

`2021-12-24`

### 🆕 新增功能

- 增加 unmount-on-close 属性 ([#449](https://github.com/arco-design/arco-design-vue/pull/449))


## 2.11.0

`2021-12-17`

### 🆕 新增功能

- 新增属性 `footer` ([#394](https://github.com/arco-design/arco-design-vue/pull/394))


## 2.9.0

`2021-12-03`

### 🆕 新增功能

- `Drawer` 支持 `okButtonProps` 和  `cancelButtonProps` 属性 ([#325](https://github.com/arco-design/arco-design-vue/pull/325))


## 2.8.0

`2021-12-01`

### 🐛 问题修复

- 修复设置 `popup-container` 属性时，抽屉仍然是 `fixed` 布局的问题 ([#297](https://github.com/arco-design/arco-design-vue/pull/297))


## 2.7.0

`2021-11-26`

### 🆕 新增功能

- 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))

### 🐛 问题修复

- 修复初始触发 `open` 事件的问题 ([#267](https://github.com/arco-design/arco-design-vue/pull/267))


## 2.4.0

`2021-11-17`

### 🆕 新增功能

- `width` 和 `height` 增加支持字符类型 ([#172](https://github.com/arco-design/arco-design-vue/pull/172))


## 2.0.3

`2021-10-29`

### 🐛 问题修复

- 修复主按钮类型错误的问题 ([#30](https://github.com/arco-design/arco-design-vue/pull/30))
