```yaml
title:
  zh-CN: 只读状态
  en-US: Readonly
```

## zh-CN

只读时不允许通过键盘输入、左右/上下按钮或键盘方向键修改数值。

---

## en-US

Value cannot be changed via typing, step buttons or arrow keys when readonly.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <span>下面两个示例均为只读：尝试输入或使用方向键/步进按钮，值不会变化。</span>
    <a-space>
      <span style="color: var(--color-text-2)">Embed 模式：</span>
      <a-input-number :default-value="10" :read-only="true" :style="{ width: '200px' }" />
    </a-space>
    <a-space>
      <span style="color: var(--color-text-2)">Button 模式：</span>
      <a-input-number mode="button" :default-value="5" :read-only="true" :style="{ width: '200px' }" />
    </a-space>
  </a-space>
</template>

<script>
export default {};
</script>
```
