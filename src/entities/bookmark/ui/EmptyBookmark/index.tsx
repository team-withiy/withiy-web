"use client";

import cx from "clsx";

import Button from "@/shared/ui/Button/Button";

import { IconLargePin } from "public/icons";

import styles from "./EmptyBookmark.module.scss";

type EmptyType = "folder" | "course";

const TYPE_TO_TEXT: Record<EmptyType, string> = {
  folder: "장소",
  course: "코스",
};

interface Props {
  type: EmptyType;
  className?: string;
}

const EmptyBookmark: React.FC<Props> = ({ className, type }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <IconLargePin className={styles.pin} />
      <p className={styles.text}>
        가고 싶은 {TYPE_TO_TEXT[type]}를<br />
        저장해보세요!
      </p>
      <Button type="button" size={36} variant="outline">
        {TYPE_TO_TEXT[type]} 구경하러 가기
      </Button>
    </div>
  );
};

export default EmptyBookmark;
