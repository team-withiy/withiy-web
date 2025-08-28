"use client";

import { MouseEventHandler, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "clsx";
import { CSSTransition } from "react-transition-group";

import Overlay from "../Overlay";

import styles from "./BottomSheetPortal.module.scss";

const bottomSheetRoot = document.querySelector("#bottom-sheet") as HTMLDivElement;

export interface BottomSheetPortalProps {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  wrapperClassName?: string;
  hideOverlay?: boolean;
  overlayClassName?: string;
  blockCloseWhenClickOverlay?: boolean;
  preventTransition?: boolean;
  children: React.ReactNode;
}

const BottomSheetPortal: React.FC<BottomSheetPortalProps> = ({
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
          hidden={hideOverlay}
          onClose={blockCloseWhenClickOverlay ? undefined : onClose}
        />
        <aside
          className={cx(styles.bottomSheet, className, { [styles.preventTransition]: preventTransition })}
          data-testid="bottom-sheet"
        >
          {children}
        </aside>
      </div>
    </CSSTransition>,
    bottomSheetRoot,
  );
};

export default BottomSheetPortal;
