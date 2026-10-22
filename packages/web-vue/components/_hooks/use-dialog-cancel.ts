import { isFunction, isPromise } from '../_utils/is';

export type DialogBeforeCancel = () => boolean | void | Promise<boolean | void>;

interface DialogCancelOptions {
  getBeforeCancel: () => DialogBeforeCancel | undefined;
  runGuards: () => boolean | Promise<boolean>;
  onCancel: (e: Event) => void;
}

/**
 * 统一的取消/关闭决口：显式 onBeforeCancel 接管否决权，否则执行容器守卫。
 * 防重入：否决结果未落定前，重复的 ESC/遮罩点击不会叠加。
 */
export function useDialogCancel({
  getBeforeCancel,
  runGuards,
  onCancel,
}: DialogCancelOptions): (e: Event) => void {
  let pending = false;

  return (e: Event) => {
    if (pending) {
      return;
    }
    pending = true;

    const finish = (allowed: boolean | void) => {
      if (!allowed) {
        pending = false;
        return;
      }
      try {
        onCancel(e);
      } finally {
        pending = false;
      }
    };

    try {
      const beforeCancel = getBeforeCancel();
      const result = isFunction(beforeCancel) ? beforeCancel() : runGuards();
      if (isPromise<boolean | void>(result)) {
        result.then(finish, (error) => {
          pending = false;
          throw error;
        });
        return;
      }
      finish(result ?? false);
    } catch (error) {
      pending = false;
      throw error;
    }
  };
}
