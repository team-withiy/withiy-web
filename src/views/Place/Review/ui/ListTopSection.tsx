"use client";

import { useState } from "react";

import SortByBottomSheet from "./SortByBottomSheet";
import useSortBy from "../hooks/useSortBy";
import { SORT_BY_MAPPER } from "../models/sortBy";
import { IconChevronDown24 } from "public/icons";

import styles from "./ListTopSection.module.scss";

interface Props {
  total: number;
}

const ListTopSection: React.FC<Props> = ({ total }) => {
  const [isShow, setIsShow] = useState(false);
  const { sortBy } = useSortBy();

  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.total}>전체 {total}개</span>
        <button
          data-testid="sort-by-bottom-sheet-button"
          className={styles.button}
          type="button"
          onClick={() => setIsShow(true)}
        >
          {SORT_BY_MAPPER[sortBy]}
          <IconChevronDown24 />
        </button>
      </div>
      <SortByBottomSheet isShow={isShow} onClose={() => setIsShow(false)} />
    </>
  );
};

export default ListTopSection;
