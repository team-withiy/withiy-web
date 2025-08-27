"use client";

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
  return (
    <BaseBottomSheet isShow={isShow} blockCloseWhenClickOverlay className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>{placeName}</h2>
        <button type="button" className={styles.plusButton}>
          <IconPlus24 />
        </button>
      </header>
      <Form placeId={placeId} onClose={onClose} />
    </BaseBottomSheet>
  );
};

export default BookmarkPlaceBottomSheet;
