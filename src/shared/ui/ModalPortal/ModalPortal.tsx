"use client";

import { memo, MouseEventHandler, type ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "clsx";
import { CSSTransition } from "react-transition-group";

import Overlay from "../Overlay";

import styles from "./ModalPortal.module.scss";

let modalRoot = document.querySelector("#modal") as HTMLDivElement | null;

if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.id = "modal";
  document.body.appendChild(modalRoot);
}

export interface ModalPortalProps {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  wrapperClassName?: string;
  overlayClassName?: string;
  blockCloseWhenClickOverlay?: boolean;
  children: ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({
  isShow,
  onClose,
  wrapperClassName,
  className,
  children,
  overlayClassName,
  blockCloseWhenClickOverlay = false,
}) => {
  const nodeRef = useRef(null);

  return createPortal(
    <CSSTransition
      in={isShow}
      timeout={200}
      classNames={{
        enter: styles.enter,
        enterDone: styles.enterDone,
        exitActive: styles.exitActive,
        exit: styles.exit,
      }}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div className={cx(styles.wrapper, wrapperClassName)} ref={nodeRef} data-testid="modal-wrapper">
        <Overlay
          className={cx(styles.overlay, overlayClassName, {
            [styles.blockCloseOverlay]: blockCloseWhenClickOverlay,
          })}
          onClose={blockCloseWhenClickOverlay ? undefined : onClose}
        />
        <aside className={cx(styles.modal, className)} data-testid="modal">
          {children}
        </aside>
      </div>
    </CSSTransition>,
    modalRoot,
  );
};

export default memo(ModalPortal);
