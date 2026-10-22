import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import Drawer from '../drawer.vue';
import {
  resolveDialogBehavior,
  setDialogBehaviorReader,
} from '../../_utils/dialog-behavior';
import { useDialogCloseGuard } from '../../_hooks/use-dialog-close-guard';

const pressEsc = () => {
  document.documentElement.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
  );
};

const mountDrawer = (props: Record<string, unknown> = {}, slots = {}) =>
  mount(Drawer, {
    props: { visible: true, renderToBody: false, ...props },
    slots,
    attachTo: document.body,
  });

describe('Drawer dialog behavior', () => {
  afterEach(() => {
    setDialogBehaviorReader(null);
    document.body.innerHTML = '';
  });

  test('esc closes by default when no reader is registered', async () => {
    expect(resolveDialogBehavior()).toEqual({
      escToClose: true,
      maskClosable: true,
    });
    const wrapper = mountDrawer();
    await nextTick();
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  test('preference disables esc without changing the authored prop', async () => {
    setDialogBehaviorReader(() => ({
      escToClose: false,
      maskClosable: true,
    }));
    const wrapper = mountDrawer();
    await nextTick();
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();
    wrapper.unmount();
  });

  test('preference is pulled on every event, not snapshotted on open', async () => {
    const escToClose = ref(false);
    setDialogBehaviorReader(() => ({
      escToClose: escToClose.value,
      maskClosable: true,
    }));
    const wrapper = mountDrawer();
    await nextTick();
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();

    escToClose.value = true;
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  test('a non-reactive preference source still applies to the next event', async () => {
    let pref = { escToClose: false, maskClosable: false };
    setDialogBehaviorReader(() => pref);
    const wrapper = mountDrawer();
    await nextTick();

    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();
    await wrapper.find('.arco-drawer-mask').trigger('click');
    expect(wrapper.emitted('cancel')).toBeUndefined();

    pref = { escToClose: true, maskClosable: true };
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);

    await wrapper.find('.arco-drawer-mask').trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(2);
    wrapper.unmount();
  });

  test('authored esc-to-close=false wins over a permissive preference (AND)', async () => {
    setDialogBehaviorReader(() => ({
      escToClose: true,
      maskClosable: true,
    }));
    const wrapper = mountDrawer({ escToClose: false });
    await nextTick();
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();
    wrapper.unmount();
  });

  test('sync onBeforeCancel vetoes, allows, and treats undefined as false', async () => {
    let result: boolean | void = false;
    const wrapper = mountDrawer({
      onBeforeCancel: () => result,
    });
    await nextTick();
    const close = wrapper.find('.arco-drawer-close-btn');

    await close.trigger('click');
    expect(wrapper.emitted('cancel')).toBeUndefined();

    result = undefined;
    await close.trigger('click');
    expect(wrapper.emitted('cancel')).toBeUndefined();

    result = true;
    await close.trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  test('async onBeforeCancel blocks re-entry until it settles', async () => {
    const resolvers: Array<(value: boolean) => void> = [];
    const wrapper = mountDrawer({
      onBeforeCancel: () =>
        new Promise<boolean>((resolve) => resolvers.push(resolve)),
    });
    await nextTick();
    const close = wrapper.find('.arco-drawer-close-btn');

    await close.trigger('click');
    await close.trigger('click');
    expect(resolvers).toHaveLength(1);

    resolvers[0](false);
    await Promise.resolve();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();

    await close.trigger('click');
    resolvers[1](true);
    await Promise.resolve();
    await nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  test('guards block by default and are bypassed when onBeforeCancel exists', async () => {
    let allow = false;
    let guardCalls = 0;
    const Child = defineComponent({
      setup() {
        useDialogCloseGuard()?.register(() => {
          guardCalls += 1;
          return allow;
        });
        return () => h('div');
      },
    });
    const wrapper = mountDrawer({}, { default: () => h(Child) });
    await nextTick();
    pressEsc();
    await nextTick();
    expect(guardCalls).toBe(1);
    expect(wrapper.emitted('cancel')).toBeUndefined();

    allow = true;
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();

    guardCalls = 0;
    const owned = mountDrawer(
      { onBeforeCancel: () => true },
      { default: () => h(Child) }
    );
    await nextTick();
    pressEsc();
    await nextTick();
    expect(guardCalls).toBe(0);
    expect(owned.emitted('cancel')).toHaveLength(1);
    owned.unmount();
  });

  test('floating close appears only when the preference removes the last exit', async () => {
    setDialogBehaviorReader(() => ({
      escToClose: false,
      maskClosable: false,
    }));
    const wrapper = mountDrawer({
      header: false,
      escToClose: true,
      maskClosable: true,
    });
    await nextTick();
    const floating = wrapper.find('.arco-drawer-floating-close-btn');
    expect(floating.exists()).toBe(true);

    await floating.trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  test('floating close respects authored exits and explicit closable=false', async () => {
    setDialogBehaviorReader(() => ({
      escToClose: false,
      maskClosable: false,
    }));
    const authored = mountDrawer({
      header: false,
      escToClose: false,
      maskClosable: false,
    });
    await nextTick();
    expect(authored.find('.arco-drawer-floating-close-btn').exists()).toBe(
      false
    );
    authored.unmount();

    const notClosable = mountDrawer({ header: false, closable: false });
    await nextTick();
    expect(notClosable.find('.arco-drawer-floating-close-btn').exists()).toBe(
      false
    );
    notClosable.unmount();

    const withHeader = mountDrawer({ escToClose: false, maskClosable: false });
    await nextTick();
    expect(withHeader.find('.arco-drawer-floating-close-btn').exists()).toBe(
      false
    );
    expect(withHeader.find('.arco-drawer-close-btn').exists()).toBe(true);
    withHeader.unmount();
  });
});
