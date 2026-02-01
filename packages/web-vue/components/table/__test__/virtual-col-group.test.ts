import { mount } from '@vue/test-utils';
import Table from '../table';

describe('Table Virtual List', () => {
  test('should render colgroup in virtual list table', async () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 100,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width: 100,
      },
    ];
    const data = Array.from({ length: 100 }).map((_, index) => ({
      key: index,
      name: `Name ${index}`,
      age: index,
    }));

    const wrapper = mount(Table as any, {
      props: {
        columns,
        data,
        scroll: { y: 200 },
        virtualListProps: {
          height: 200,
        },
      },
    });

    // Wait for virtual list to render
    await new Promise((resolve) => setTimeout(resolve, 100));

    const bodyTable = wrapper.find('.arco-table-body table');
    expect(bodyTable.exists()).toBe(true);

    // Check if colgroup exists in the body table
    const colgroup = bodyTable.find('colgroup');
    expect(colgroup.exists()).toBe(true);

    const cols = colgroup.findAll('col');
    expect(cols.length).toBe(2);
    // Note: styles might be formatted differently, but should contain width
    const style0 = cols[0].attributes('style');
    expect(style0).toMatch(/width:\s*100px/);
  });
});
