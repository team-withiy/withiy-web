"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import cx from "clsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useUnmount } from "react-use";

import {
  TOAST_ACTION_MAPPER,
  TOAST_TIMEOUT,
  type ToastCallbackType,
  type ToastItem,
  type ToastState,
} from "./toast.interface";
import { ToastEventEmitter } from "./ToastEventEmitter";
import { IconCheck16, IconX16 } from "public/icons";

import styles from "./Toast.module.scss";

const TOAST_MAX_LENGTH = 1;

const TOAST_ICON_MAPPER = {
  default: null,
  danger: (
    <span className={cx(styles.iconWrapper, styles.danger)}>
      <IconX16 />
    </span>
  ),
  success: (
    <span className={cx(styles.iconWrapper, styles.success)}>
      <IconCheck16 />
    </span>
  ),
} as const satisfies Record<ToastState, ReactNode>;

const toastRoot = (document.querySelector("#toast") as HTMLDivElement) || document.createElement("div");

const Toast: React.FC = () => {
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prevState) => prevState.filter((notification) => notification.id !== id));
    delete timers.current?.[id];
  }, []);

  const addToast = useCallback(
    (toast: ToastItem) => {
      setToasts((prev) => {
        if (prev.length >= TOAST_MAX_LENGTH) {
          delete timers.current?.[prev[0].id];
          return [...prev.slice(1), toast];
        }
        return [...prev, toast];
      });

      timers.current[toast.id] = setTimeout(() => remove(toast.id), TOAST_TIMEOUT);
    },
    [remove],
  );

  const clear = useCallback(() => {
    setToasts([]);
    timers.current = {};
  }, []);

  useEffect(() => {
    const eventCallback: ToastCallbackType = (toast) => {
      if (toast.action === TOAST_ACTION_MAPPER.ADD_TOAST) addToast(toast as ToastItem);
      if (toast.action === TOAST_ACTION_MAPPER.REMOVE_TOAST) remove(toast.id);
      if (toast.action === TOAST_ACTION_MAPPER.CLEAR_TOASTS) clear();
    };

    ToastEventEmitter.getInstance().addEventListener(eventCallback);
    return () => {
      ToastEventEmitter.getInstance().removeEventListener(eventCallback);
    };
  }, [addToast, clear, remove]);

  useUnmount(() => {
    setToasts([]);
    Object.values(timers.current).forEach((timer) => {
      if (timer) {
        clearTimeout(timer);
      }
    });
  });

  return createPortal(
    <TransitionGroup className={styles.wrapper}>
      {toasts.map((toast) => (
        <CSSTransition
          in
          key={toast.id}
          nodeRef={toast.ref}
          timeout={200}
          classNames={{
            enterDone: styles.enterDone,
            exitActive: styles.exitActive,
            exit: styles.exit,
            enter: styles.enter,
          }}
          unmountOnExit
        >
          <output className={cx(styles.toast, styles[toast.state])} ref={toast.ref}>
            {TOAST_ICON_MAPPER[toast.state]}
            <span className={styles.text}>{toast.message}</span>
          </output>
        </CSSTransition>
      ))}
    </TransitionGroup>,
    toastRoot,
  );
};

export default Toast;
