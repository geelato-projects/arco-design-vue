import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';
import { isPromise } from '../_utils/is';

export type DialogCloseGuard = () => boolean | void | Promise<boolean | void>;

export interface DialogCloseGuardContext {
  /**
   * 注册关闭守卫，返回注销函数。
   * 守卫返回 false（或 resolve false）时拦截本次关闭；返回 true 放行。
   */
  register: (guard: DialogCloseGuard) => () => void;
}

export const DIALOG_CLOSE_GUARD_KEY: InjectionKey<DialogCloseGuardContext> =
  Symbol('GeelatoDialogCloseGuard');

/**
 * 在 Drawer/Modal 的内容组件内注册关闭守卫。
 * 容器显式传入 onBeforeCancel 时，守卫整体让位（否决权由业务接管）。
 */
export function useDialogCloseGuard(): DialogCloseGuardContext | null {
  return inject(DIALOG_CLOSE_GUARD_KEY, null);
}

export function useDialogCloseGuardProvider(): () =>
  | boolean
  | Promise<boolean> {
  const guards: DialogCloseGuard[] = [];

  provide(DIALOG_CLOSE_GUARD_KEY, {
    register(guard) {
      guards.push(guard);
      return () => {
        const index = guards.indexOf(guard);
        if (index >= 0) {
          guards.splice(index, 1);
        }
      };
    },
  });

  const step = (index: number): boolean | Promise<boolean> => {
    if (index >= guards.length) {
      return true;
    }
    const result = guards[index]();
    if (isPromise<boolean>(result)) {
      return result.then((allowed) => (allowed ? step(index + 1) : false));
    }
    return result ? step(index + 1) : false;
  };

  return () => step(0);
}
