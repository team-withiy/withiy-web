"use client";

import { useState } from "react";

import cx from "clsx";

import { CreateFolderBottomSheet } from "@/features/createFolder/ui";

import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";

import Form from "./Form";
import { IconPlus24 } from "public/icons";

import styles from "./BookmarkPlaceBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  placeId: number;
  placeName: string;
}

const BookmarkPlaceBottomSheet: React.FC<Props> = ({ isShow, placeId, placeName, onClose }) => {
  const [isShowCreateFolder, setIsShowCreateFolder] = useState(false);

  return (
    <>
      <BaseBottomSheet
        isShow={isShow}
        blockCloseWhenClickOverlay
        className={cx(styles.wrapper, { [styles.hide]: isShowCreateFolder })}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{placeName}</h2>
          <button type="button" className={styles.plusButton} onClick={() => setIsShowCreateFolder(true)}>
            <IconPlus24 />
          </button>
        </header>
        <Form placeId={placeId} onClose={onClose} />
      </BaseBottomSheet>
      <CreateFolderBottomSheet
        isShow={isShowCreateFolder}
        onClose={() => setIsShowCreateFolder(false)}
        hideOverlay
        preventTransition
      />
    </>
  );
};

export default BookmarkPlaceBottomSheet;
