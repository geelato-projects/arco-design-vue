export interface DialogBehavior {
  escToClose: boolean;
  maskClosable: boolean;
}

const LIB_DEFAULT: DialogBehavior = {
  escToClose: true,
  maskClosable: true,
};

let read: (() => DialogBehavior) | null = null;

/**
 * 宿主注册一次弹窗行为读取器；传 null 恢复库默认。
 * 拉取式：注册时不做快照，每次事件读取当前值，宿主可在弹窗打开期间切换偏好。
 */
export function setDialogBehaviorReader(fn: (() => DialogBehavior) | null) {
  read = fn;
}

export function resolveDialogBehavior(): DialogBehavior {
  return read ? read() : LIB_DEFAULT;
}
