"use client";

import cx from "clsx";

import styles from "./EmptyBookmark.module.scss";

interface Props {
  type: "folder" | "course";
  className?: string;
}

const EmptyBookmark: React.FC<Props> = ({ className }) => {
  return <div className={cx(styles.wrapper, className)}>EMPTY</div>;
};

export default EmptyBookmark;
