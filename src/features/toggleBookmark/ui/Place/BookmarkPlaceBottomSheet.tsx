"use client";

import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";
import Button from "@/shared/ui/Button/Button";

import PlaceList from "./PlaceList";
import { IconPlus24 } from "public/icons";

import styles from "./BookmarkPlaceBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  placeId: number;
}

const BookmarkPlaceBottomSheet: React.FC<Props> = ({ isShow, placeId }) => {
  return (
    <BaseBottomSheet isShow={isShow} blockCloseWhenClickOverlay className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>장소 이름</h2>
        <button type="button" className={styles.plusButton}>
          <IconPlus24 />
        </button>
      </header>
      <form className={styles.form}>
        <PlaceList placeId={placeId} />
        <div className={styles.buttonWrapper}>
          <Button type="submit" size={52} variant="default" full>
            장소 저장하기
          </Button>
        </div>
      </form>
    </BaseBottomSheet>
  );
};

export default BookmarkPlaceBottomSheet;
