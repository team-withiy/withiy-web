"use client";

import cx from "clsx";

import { BottomSheetPortal, BottomSheetPortalProps } from "../BottomSheetPortal";

import styles from "./BaseBottomSheet.module.scss";

interface Props
  extends Pick<
    BottomSheetPortalProps,
    "isShow" | "onClose" | "className" | "children" | "blockCloseWhenClickOverlay"
  > {}

const BaseBottomSheet: React.FC<Props> = ({ children, isShow, blockCloseWhenClickOverlay, className, onClose }) => {
  return (
    <BottomSheetPortal
      isShow={isShow}
      onClose={onClose}
      className={cx(styles.wrapper, className)}
      blockCloseWhenClickOverlay={blockCloseWhenClickOverlay}
    >
      {children}
    </BottomSheetPortal>
  );
};

export default BaseBottomSheet;
