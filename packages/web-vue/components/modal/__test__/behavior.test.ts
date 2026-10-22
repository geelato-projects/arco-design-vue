import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import Modal from '../modal.vue';
import { setDialogBehaviorReader } from '../../_utils/dialog-behavior';

const pressEsc = () => {
  document.documentElement.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
  );
};

const mountModal = (props: Record<string, unknown> = {}) =>
  mount(Modal, {
    props: { visible: true, renderToBody: false, ...props },
    attachTo: document.body,
  });

describe('Modal dialog behavior', () => {
  afterEach(() => {
    setDialogBehaviorReader(null);
    document.body.innerHTML = '';
  });

  test('esc closes and the preference can disable it while open', async () => {
    const escToClose = ref(true);
    setDialogBehaviorReader(() => ({
      escToClose: escToClose.value,
      maskClosable: true,
    }));
    const wrapper = mountModal();
    await nextTick();

    escToClose.value = false;
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
    let pref = { escToClose: false, maskClosable: true };
    setDialogBehaviorReader(() => pref);
    const wrapper = mountModal();
    await nextTick();

    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();

    pref = { escToClose: true, maskClosable: true };
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  test('authored esc-to-close=false wins over a permissive preference (AND)', async () => {
    setDialogBehaviorReader(() => ({
      escToClose: true,
      maskClosable: true,
    }));
    const wrapper = mountModal({ escToClose: false });
    await nextTick();
    pressEsc();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();
    wrapper.unmount();
  });

  test('async onBeforeCancel result decides the close', async () => {
    const wrapper = mountModal({
      onBeforeCancel: () => Promise.resolve(false),
    });
    await nextTick();
    await wrapper.find('.arco-modal-close-btn').trigger('click');
    await Promise.resolve();
    await Promise.resolve();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();

    const allowed = mountModal({
      onBeforeCancel: () => Promise.resolve(true),
    });
    await nextTick();
    await allowed.find('.arco-modal-close-btn').trigger('click');
    await Promise.resolve();
    await Promise.resolve();
    await nextTick();
    expect(allowed.emitted('cancel')).toHaveLength(1);
    allowed.unmount();
    wrapper.unmount();
  });

  test('floating close covers simple/headerless shapes only when the preference strips exits', async () => {
    setDialogBehaviorReader(() => ({
      escToClose: false,
      maskClosable: false,
    }));
    const simple = mountModal({ simple: true });
    await nextTick();
    const floating = simple.find('.arco-modal-floating-close-btn');
    expect(floating.exists()).toBe(true);
    await floating.trigger('click');
    expect(simple.emitted('cancel')).toHaveLength(1);
    simple.unmount();

    const hideTitle = mountModal({ hideTitle: true });
    await nextTick();
    expect(hideTitle.find('.arco-modal-floating-close-btn').exists()).toBe(
      true
    );
    hideTitle.unmount();

    const normal = mountModal({ escToClose: false, maskClosable: false });
    await nextTick();
    expect(normal.find('.arco-modal-floating-close-btn').exists()).toBe(false);
    expect(normal.find('.arco-modal-close-btn').exists()).toBe(true);
    normal.unmount();

    const authored = mountModal({
      simple: true,
      escToClose: false,
      maskClosable: false,
    });
    await nextTick();
    expect(authored.find('.arco-modal-floating-close-btn').exists()).toBe(
      false
    );
    authored.unmount();
  });
});
