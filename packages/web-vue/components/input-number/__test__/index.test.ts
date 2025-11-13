import { mount } from '@vue/test-utils';
import InputNumber from '../index';

describe('InputNumber', () => {
  test('number add correctly', async () => {
    const wrapper = mount(InputNumber);

    const stepButton = wrapper.find('button');
    await stepButton.trigger('mousedown');
    await stepButton.trigger('mousedown');

    expect(wrapper.find('input').element.value).toBe('1');
  });

  test('should valid input', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        min: 0,
        max: 10,
      },
    });

    const input = wrapper.find('input');
    await input.setValue('-2');
    expect(input.element.value).toBe('-2');
    await input.trigger('blur');
    expect(input.element.value).toBe('0');
    await input.setValue('20');
    expect(input.element.value).toBe('20');
    await input.trigger('blur');
    expect(input.element.value).toBe('10');
  });

  test('readonly disables step buttons in button mode', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        mode: 'button',
        readOnly: true,
      },
    });

    const buttons = wrapper.findAll('.arco-input-number-step-button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].attributes('disabled')).toBeDefined();
    expect(buttons[1].attributes('disabled')).toBeDefined();

    // attempt to click should not change value
    await buttons[0].trigger('mousedown');
    await buttons[1].trigger('mousedown');
    expect(wrapper.find('input').element.value).toBe('');
  });

  test('readonly ignores keyboard arrows', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        readOnly: true,
      },
    });
    const input = wrapper.find('input');
    await input.trigger('keydown', { key: 'ArrowUp' });
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(input.element.value).toBe('');
  });

  test('readonly prevents manual typing', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        readOnly: true,
      },
    });
    const input = wrapper.find('input');
    await input.setValue('123');
    expect(input.element.value).toBe('');
  });
});
