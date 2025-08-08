"use client";

import { MouseEventHandler, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "clsx";
import { CSSTransition } from "react-transition-group";

import Overlay from "../Overlay";

import styles from "./BottomSheetPortal.module.scss";

let bottomSheetRoot = document.querySelector("#bottom-sheet") as HTMLDivElement;

if (!bottomSheetRoot) {
  bottomSheetRoot = document.createElement("div");
  bottomSheetRoot.id = "bottom-sheet";
  document.body.appendChild(bottomSheetRoot);
}

export interface BottomSheetPortalProps {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  wrapperClassName?: string;
  overlayClassName?: string;
  blockCloseWhenClickOverlay?: boolean;
  children: React.ReactNode;
}

const BottomSheetPortal: React.FC<BottomSheetPortalProps> = ({
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
      <div
        className={cx(styles.wrapper, wrapperClassName)}
        ref={nodeRef}
        data-testid="bottom-sheet-wrapper"
        data-is-show={isShow}
      >
        <Overlay
          className={cx(styles.overlay, overlayClassName, {
            [styles.blockCloseOverlay]: blockCloseWhenClickOverlay,
          })}
          onClose={blockCloseWhenClickOverlay ? undefined : onClose}
        />
        <aside className={cx(styles.bottomSheet, className)} data-testid="bottom-sheet">
          {children}
        </aside>
      </div>
    </CSSTransition>,
    bottomSheetRoot,
  );
};

export default BottomSheetPortal;
