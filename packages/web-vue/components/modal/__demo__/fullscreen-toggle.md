```yaml
title:
  zh-CN: 头部全屏切换
  en-US: Header Fullscreen Toggle
```

## zh-CN

在头部右上角显示全屏切换按钮（`show-fullscreen`），非全屏打开后可点击切换到全屏，也支持 `v-model:fullscreen` 受控。

---

## en-US

Show the fullscreen toggle button in the header (`show-fullscreen`). Open in non-fullscreen and click to switch to fullscreen; also supports `v-model:fullscreen`.

---

```vue
<template>
  <a-button @click="open = true">Open Modal</a-button>
  <a-modal
    v-model:visible="open"
    v-model:fullscreen="fullscreen"
    :show-fullscreen="true"
  >
    <template #title>
      Title
    </template>
    <div>当前全屏：{{ fullscreen }}</div>
  </a-modal>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const open = ref(false);
    const fullscreen = ref(false);
    return { open, fullscreen };
  },
};
</script>
```
