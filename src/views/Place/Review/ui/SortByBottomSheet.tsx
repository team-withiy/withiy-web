"use client";

import { MouseEventHandler } from "react";

import { usePathname, useRouter } from "next/navigation";

import cx from "clsx";

import { PaginationReviewSortBy } from "@/entities/place/api/place.interface";

import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";
import Button from "@/shared/ui/Button/Button";

import useSortBy from "../hooks/useSortBy";
import { SORT_BY_MAPPER } from "../models/sortBy";

import styles from "./SortByBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const SortByBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const { sortBy } = useSortBy();
  const router = useRouter();
  const pathname = usePathname();

  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    const sortBy = e.currentTarget.dataset.sortby as PaginationReviewSortBy;
    router.replace(`${pathname}?${new URLSearchParams({ sortBy }).toString()}`);
    onClose();
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} className={cx(styles.wrapper, styles.sortByBottomSheet)}>
      <Button
        data-sortby={PaginationReviewSortBy.LATEST}
        size={52}
        variant={sortBy === PaginationReviewSortBy.LATEST ? "default" : "text"}
        full
        type="button"
        onClick={onClickButton}
      >
        {SORT_BY_MAPPER[PaginationReviewSortBy.LATEST]}
      </Button>
      <Button
        data-sortby={PaginationReviewSortBy.SCORE}
        size={52}
        variant={sortBy === PaginationReviewSortBy.SCORE ? "default" : "text"}
        full
        type="button"
        onClick={onClickButton}
      >
        {SORT_BY_MAPPER[PaginationReviewSortBy.SCORE]}
      </Button>
    </BaseBottomSheet>
  );
};

export default SortByBottomSheet;
