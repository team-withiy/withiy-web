"use client";

import cx from "clsx";

import { ModalPortal, ModalPortalProps } from "../ModalPortal";

import styles from "./BaseModal.module.scss";

interface Props
  extends Pick<
    ModalPortalProps,
    "isShow" | "onClose" | "className" | "children" | "blockCloseWhenClickOverlay" | "hideOverlay" | "preventTransition"
  > {}

const BaseModal: React.FC<Props> = ({
  children,
  isShow,
  blockCloseWhenClickOverlay,
  className,
  onClose,
  hideOverlay,
  preventTransition,
}) => {
  return (
    <ModalPortal
      isShow={isShow}
      onClose={onClose}
      className={cx(styles.wrapper, className)}
      blockCloseWhenClickOverlay={blockCloseWhenClickOverlay}
      hideOverlay={hideOverlay}
      preventTransition={preventTransition}
    >
      {children}
    </ModalPortal>
  );
};

export default BaseModal;
