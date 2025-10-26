"use client";
import styles from "./ListTopSection.module.scss";

interface Props {
  total: number;
}

const ListTopSection: React.FC<Props> = ({ total }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.total}>전체 {total}개</span>
      <button type="button">최신순</button>
    </div>
  );
};

export default ListTopSection;
