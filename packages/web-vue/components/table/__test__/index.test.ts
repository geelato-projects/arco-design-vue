import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, reactive, ref } from 'vue';
import Table from '../table';
import { TableChangeExtra, TableColumnData, TableData } from '../interface';

const demoData = [
  {
    key: '1',
    name: 'Jane Doe1',
    age: 1,
  },
  {
    key: '2',
    name: 'Jane Doe2',
    age: 2,
  },
  {
    key: '3',
    name: 'Jane Doe3',
    age: 3,
  },
  {
    key: '4',
    name: 'Jane Doe4',
    age: 4,
  },
  {
    key: '5',
    age: 5,
    name: 'Jane Doe5',
  },
];
const demoColumns: TableColumnData[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];
const JSONCopy = (val: unknown) => JSON.parse(JSON.stringify(val));
describe('Table', () => {
  test('Correct rendering after deleting data on the last page', async () => {
    const data = reactive(JSONCopy(demoData));
    const columns = JSONCopy(demoColumns);
    const current = ref(5);
    const handleChange = (data: number) => {
      current.value = data;
    };
    const pagination = reactive({
      current,
      onChange: handleChange,
      pageSize: 1,
    });
    const wrapper = mount(Table as any, {
      props: {
        columns,
        data,
        pagination,
      },
    });
    await nextTick();
    let content = wrapper.find('.arco-table-td-content').element.innerHTML;
    expect(content).toBe('Jane Doe5');
    data.pop();
    await nextTick();
    content = wrapper.find('.arco-table-td-content').element.innerHTML;
    expect(content).toBe('Jane Doe4');
  });

  test('table sort', async () => {
    const data = reactive(JSONCopy(demoData));
    const columns = JSONCopy(demoColumns);
    columns[1].sortable = {
      sortDirections: ['ascend', 'descend'],
    };
    let testSortRes = {
      data: [] as TableData[],
      extra: {} as TableChangeExtra,
      currentDataSource: [] as TableData[],
    };
    const handleChange = (
      data: TableData[],
      extra: TableChangeExtra,
      currentDataSource: TableData[]
    ) => {
      testSortRes = { data, extra, currentDataSource };
    };
    const wrapper = mount(Table as any, {
      props: {
        columns,
        data,
        onChange: handleChange,
        pagination: {
          pageSize: 2,
        },
      },
    });
    await nextTick();
    wrapper.find('.arco-table-cell-with-sorter').trigger('click');
    expect(testSortRes.data[0].key).toBe('1');
    expect(testSortRes.extra.sorter?.direction).toBe('ascend');
    expect(testSortRes.currentDataSource).toBeTruthy();
    expect(testSortRes.currentDataSource.length).toBe(5);
    expect(testSortRes.currentDataSource[0].key).toBe('1');
    expect(testSortRes.currentDataSource[4].key).toBe('5');
    await nextTick();
    wrapper.find('.arco-table-cell-with-sorter').trigger('click');
    expect(testSortRes.data[0].key).toBe('5');
    expect(testSortRes.extra.sorter?.direction).toBe('descend');
    expect(testSortRes.currentDataSource).toBeTruthy();
    expect(testSortRes.currentDataSource.length).toBe(5);
    expect(testSortRes.currentDataSource[0].key).toBe('5');
    expect(testSortRes.currentDataSource[4].key).toBe('1');
  });

  test('column resize should keep header and body col widths aligned with editable cells', async () => {
    const data = reactive(
      JSONCopy([
        { key: '1', name: 'Jane Doe1', age: 1 },
        { key: '2', name: 'Jane Doe2', age: 2 },
      ])
    );

    const columns: TableColumnData[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 100,
        slotName: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width: 100,
        slotName: 'age',
      },
    ];

    const EditableCell = defineComponent({
      name: 'EditableCell',
      props: {
        modelValue: [String, Number],
      },
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        return () =>
          h('input', {
            value: String(props.modelValue ?? ''),
            onInput: (ev: Event) => {
              emit('update:modelValue', (ev.target as HTMLInputElement).value);
            },
          });
      },
    });

    const wrapper = mount(Table as any, {
      props: {
        columns,
        data,
        scroll: { y: 200 },
        columnResizable: true,
        pagination: false,
      },
      slots: {
        name: ({ record }: { record: any }) =>
          h(EditableCell, {
            'modelValue': record.name,
            'onUpdate:modelValue': (v: string) => {
              record.name = v;
            },
          }),
        age: ({ record }: { record: any }) =>
          h(EditableCell, {
            'modelValue': record.age,
            'onUpdate:modelValue': (v: string) => {
              record.age = Number(v);
            },
          }),
      },
    });

    await nextTick();
    expect(wrapper.find('.arco-table-header').exists()).toBe(true);
    expect(wrapper.find('.arco-table-body').exists()).toBe(true);
    expect(wrapper.findAll('input').length).toBeGreaterThan(0);

    const headerThs = wrapper.findAll('.arco-table-header .arco-table-th');
    expect(headerThs.length).toBe(2);

    const firstHeaderTh = headerThs[0].element as HTMLElement;
    Object.defineProperty(firstHeaderTh, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({
        x: 0,
        y: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 100,
        height: 0,
        toJSON: () => undefined,
      }),
    });

    const firstHandle = wrapper.find(
      '.arco-table-header .arco-table-column-handle'
    );
    expect(firstHandle.exists()).toBe(true);
    await firstHandle.trigger('mousedown');
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 160 }));
    window.dispatchEvent(new MouseEvent('mouseup'));
    await nextTick();

    const headerCols = wrapper.findAll('.arco-table-header colgroup col');
    const bodyCols = wrapper.findAll('.arco-table-body colgroup col');

    expect(headerCols.length).toBe(2);
    expect(bodyCols.length).toBe(2);

    const headerColStyle = headerCols[0].attributes('style');
    const bodyColStyle = bodyCols[0].attributes('style');

    const getWidth = (style?: string) => style?.match(/width:\s*(\d+)px/)?.[1];

    expect(getWidth(headerColStyle)).toBe('160');
    expect(getWidth(bodyColStyle)).toBe('160');
  });
});
