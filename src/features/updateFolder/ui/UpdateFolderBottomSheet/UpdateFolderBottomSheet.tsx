"use client";

import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";

import Form from "./Form";
import { IconChevronLeft24 } from "public/icons";

import styles from "./UpdateFolderBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  preventTransition?: boolean;
  hideOverlay?: boolean;
  folderId: number;
}

const UpdateFolderBottomSheet: React.FC<Props> = ({ isShow, onClose, hideOverlay, preventTransition, folderId }) => {
  return (
    <BaseBottomSheet
      className={styles.wrapper}
      isShow={isShow}
      onClose={onClose}
      blockCloseWhenClickOverlay
      hideOverlay={hideOverlay}
      preventTransition={preventTransition}
    >
      <header className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onClose}>
          <IconChevronLeft24 />
        </button>
        <h2 className={styles.title}>폴더 수정</h2>
      </header>
      <Form onClose={onClose} folderId={folderId} />
    </BaseBottomSheet>
  );
};

export default UpdateFolderBottomSheet;
