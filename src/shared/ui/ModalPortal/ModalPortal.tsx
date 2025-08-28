"use client";

import { memo, MouseEventHandler, type ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "clsx";
import { CSSTransition } from "react-transition-group";

import Overlay from "../Overlay";

import styles from "./ModalPortal.module.scss";

const modalRoot = document.querySelector("#modal") as HTMLDivElement;

export interface ModalPortalProps {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  wrapperClassName?: string;
  overlayClassName?: string;
  hideOverlay?: boolean;
  blockCloseWhenClickOverlay?: boolean;
  preventTransition?: boolean;
  children: ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({
  isShow,
  onClose,
  wrapperClassName,
  hideOverlay,
  className,
  children,
  overlayClassName,
  blockCloseWhenClickOverlay = false,
  preventTransition = false,
}) => {
  const nodeRef = useRef(null);

  return createPortal(
    <CSSTransition
      in={isShow}
      timeout={preventTransition ? 0 : 200}
      classNames={{
        enter: styles.enter,
        enterDone: styles.enterDone,
        exitActive: styles.exitActive,
        exit: styles.exit,
      }}
      nodeRef={nodeRef}
      unmountOnExit
      {...(!preventTransition && {
        classNames: {
          enter: styles.enter,
          enterDone: styles.enterDone,
          exitActive: styles.exitActive,
          exit: styles.exit,
        },
      })}
    >
      <div className={cx(styles.wrapper, wrapperClassName)} ref={nodeRef} data-testid="modal-wrapper">
        <Overlay
          className={cx(styles.overlay, overlayClassName, {
            [styles.blockCloseOverlay]: blockCloseWhenClickOverlay,
          })}
          hidden={hideOverlay}
          onClose={blockCloseWhenClickOverlay ? undefined : onClose}
        />
        <aside
          className={cx(styles.modal, className, { [styles.preventTransition]: preventTransition })}
          data-testid="modal"
        >
          {children}
        </aside>
      </div>
    </CSSTransition>,
    modalRoot,
  );
};

export default memo(ModalPortal);
