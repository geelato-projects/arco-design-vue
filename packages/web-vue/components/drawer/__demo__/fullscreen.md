```yaml
title:
  zh-CN: 头部全屏切换
  en-US: Header Fullscreen Toggle
```

## zh-CN

在头部右上角增加了全屏切换按钮，点击可占满容器；也可通过 `v-model:fullscreen` 受控。

---

## en-US

Adds a fullscreen toggle button in the header. Click to fill the container; also supports `v-model:fullscreen`.

---

```vue
<template>
  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
    <a-button @click="open = true">Open Drawer</a-button>
    <span>显示全屏按钮：</span>
    <a-switch v-model="showFsBtn" />
  </div>
  <a-drawer
    v-model:visible="open"
    v-model:fullscreen="fullscreen"
    :show-fullscreen="showFsBtn"
    title="Title"
  >
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-drawer>
  <div style="margin-top: 12px;">当前全屏：{{ fullscreen }}</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const open = ref(false);
    const fullscreen = ref(false);
    const showFsBtn = ref(false);
    return { open, fullscreen, showFsBtn };
  },
};
</script>
```
