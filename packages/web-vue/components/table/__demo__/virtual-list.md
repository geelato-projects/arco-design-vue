```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

设置 `virtual-list-props` 开启虚拟列表功能。
本示例提供大数据（10 万行 / 50 列）树形表格，用于验证虚拟滚动与列宽拖拽调整能力。

---

## en-US

Set `virtual-list-props` to enable the virtual list function.
This demo includes a large dataset (100k rows / 50 columns) tree table to validate virtual scroll and column resizing.

---

```vue
<template>
  <a-space direction="vertical" size="large" fill>
    <a-space wrap>
      <span>树形数据：</span>
      <a-switch v-model="useTree" />
      <span>大数据模式(10万行)：</span>
      <a-switch v-model="useBigData" />
      <a-button type="primary" :loading="loading" @click="genData">生成数据</a-button>
      <a-button :disabled="!useTree" @click="expandRoots">展开根节点</a-button>
      <a-button :disabled="!useTree" @click="collapseAll">全部折叠</a-button>
    </a-space>
    <a-space wrap>
      <span>列宽拖拽：</span>
      <a-switch v-model="resizable" />
      <span>开启选择：</span>
      <a-switch v-model="selectable" />
      <span>显示汇总：</span>
      <a-switch v-model="showSummary" />
    </a-space>
    <a-typography-paragraph>
      Rows: {{ stats.rows }} / Cols: {{ stats.cols }} / Expanded: {{ expandedKeys.length }} / Time: {{ stats.time }}ms
    </a-typography-paragraph>
    <a-table
      :columns="columns"
      :data="data"
      :virtual-list-props="virtualListProps"
      :pagination="false"
      :row-selection="selectable ? rowSelection : undefined"
      :column-resizable="resizable"
      :summary="showSummary"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      :scroll="scrollConfig"
      :indent-size="20"
    />
  </a-space>
</template>

<script>
import { defineComponent, ref, shallowRef, reactive, computed, nextTick } from 'vue';

export default defineComponent({
  setup() {
    const useTree = ref(true);
    const useBigData = ref(true);
    const loading = ref(false);
    const resizable = ref(true);
    const selectable = ref(true);
    const showSummary = ref(false);

    const data = shallowRef([]);
    const columns = shallowRef([]);
    const expandedKeys = ref([]);
    const selectedKeys = ref([]);

    const stats = reactive({
      rows: 0,
      cols: 0,
      time: 0
    });

    const rowSelection = {
      type: 'checkbox',
      showCheckedAll: true,
      fixed: true,
      width: 60
    };

    const virtualListProps = {
      height: 500,
      fixedSize: true,
    };

    const scrollConfig = computed(() => ({
      x: Math.max(1200, columns.value.length * 120),
      y: 500
    }));

    const genData = async () => {
        loading.value = true;
        // Allow UI to update before freezing for generation
        await nextTick();
        await new Promise(resolve => setTimeout(resolve, 50));

        const startTime = performance.now();
        const isBig = useBigData.value;
        const isTree = useTree.value;

        const colCount = isBig ? 50 : 10;

        // Generate Columns
        const cols = [];
        for (let i = 0; i < colCount; i++) {
            cols.push({
                title: i === 0 ? 'Data Node' : (i % 5 === 1 ? `Long Text ${i}` : `Column ${i}`),
                dataIndex: `col${i}`,
                width: i === 0 ? 240 : (i % 5 === 1 ? 200 : 120),
                fixed: i === 0 ? 'left' : (i === colCount - 1 ? 'right' : undefined),
                ellipsis: i % 5 === 1,
                tooltip: i % 5 === 1,
            });
        }
        columns.value = cols;

        // Generate Data
        const result = [];
        let totalRows = 0;
        const longText = 'Very long text content that might cause layout issues if not handled correctly. ';

        if (isTree) {
             // 100 * (1 + 20 * (1 + 50)) = 102100 rows for big data
             const roots = isBig ? 100 : 10;
             const children = isBig ? 20 : 5;
             const grandChildren = isBig ? 50 : 5;

             for (let i = 0; i < roots; i++) {
                 const root = { key: `r-${i}`, col0: `Root ${i}` };
                 for(let c=1; c<colCount; c++) {
                     root[`col${c}`] = c % 5 === 1 ? `${longText} (Root ${i})` : i * 1000 + c;
                 }
                 totalRows++;

                 const childNodes = [];
                 for(let j=0; j<children; j++) {
                     const child = { key: `r-${i}-c-${j}`, col0: `Child ${j}` };
                     for(let c=1; c<colCount; c++) {
                         child[`col${c}`] = c % 5 === 1 ? `${longText} (Child ${j})` : j * 1000 + c;
                     }
                     totalRows++;

                     const grandNodes = [];
                     for(let k=0; k<grandChildren; k++) {
                        const grand = { key: `r-${i}-c-${j}-g-${k}`, col0: `Grand ${k}` };
                        for(let c=1; c<colCount; c++) {
                            grand[`col${c}`] = c % 5 === 1 ? `${longText} (Grand ${k})` : k * 1000 + c;
                        }
                        totalRows++;
                        grandNodes.push(grand);
                     }
                     if (grandNodes.length) child.children = grandNodes;
                     childNodes.push(child);
                 }
                 if (childNodes.length) root.children = childNodes;
                 result.push(root);
             }
        } else {
             const rowCount = isBig ? 100000 : 1000;
             for (let i = 0; i < rowCount; i++) {
                const item = { key: `${i}`, col0: `Row ${i}` };
                for(let c=1; c<colCount; c++) {
                    item[`col${c}`] = c % 5 === 1 ? `${longText} (Row ${i})` : i + c;
                }
                result.push(item);
             }
             totalRows = rowCount;
        }

        data.value = result;
        stats.rows = totalRows;
        stats.cols = colCount;
        stats.time = Math.round(performance.now() - startTime);

        if (isTree) {
            expandedKeys.value = result.map(item => item.key);
        } else {
            expandedKeys.value = [];
        }
        selectedKeys.value = [];
        loading.value = false;
    };

    const expandRoots = () => {
        if (!useTree.value) return;
        expandedKeys.value = data.value.map(item => item.key);
    };

    const collapseAll = () => {
        expandedKeys.value = [];
    };

    if (typeof window !== 'undefined') {
        try {
            const params = new URLSearchParams(window.location.search);
            if (params.get('tableVirtualBigTree') === '1') {
                nextTick(genData);
            }
        } catch (e) {}
    }

    return {
        useTree,
        useBigData,
        loading,
        resizable,
        selectable,
        showSummary,
        data,
        columns,
        expandedKeys,
        selectedKeys,
        stats,
        rowSelection,
        virtualListProps,
        scrollConfig,
        genData,
        expandRoots,
        collapseAll
    };
  }
});
</script>
```
