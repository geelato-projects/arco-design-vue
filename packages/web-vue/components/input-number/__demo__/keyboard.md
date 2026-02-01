```yaml
title:
  zh-CN: 禁用键盘事件
  en-US: Disable Keyboard
```

## zh-CN

通过 `keyboard` 属性，可以控制是否允许通过键盘上下键调整数值。

## en-US

By setting the `keyboard` property, you can control whether to allow adjusting the value via the keyboard up and down keys.

```vue
<template>
  <a-input-number v-model="value" :keyboard="false" placeholder="Keyboard disabled" />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(10);
    return {
      value,
    };
  },
};
</script>
```
