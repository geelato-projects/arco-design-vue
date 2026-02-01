```yaml
title:
  zh-CN: 格式化展示值
  en-US: Format
```

## zh-CN

通过 `show-group-separator` 可以展示进位分隔符（如 `1,200.00`）。如需自定义格式，可通过 `formatter` 和 `parser` 配合使用定义输入框展示值。

---

## en-US

Use `show-group-separator` to display the group separator (e.g. `1,200.00`). If you need a custom format, use `formatter` and `parser` together.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      class="input-demo"
      :default-value="1200"
      :min="0"
      :precision="2"
      show-group-separator
    />
    <a-input-number
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      class="input-demo"
      :default-value="12000"
      :min="0"
      :formatter="formatter"
      :parser="parser"
    />
  </a-space>
</template>

<script>
export default {
  setup(){
    const formatter = (value) => {
      const values = value.split('.');
      values[0]=values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return values.join('.')
    };

    const parser = (value) => {
      return value.replace(/,/g, '')
    };

    return {
      formatter,
      parser
    }
  },
}
</script>
```
