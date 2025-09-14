"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import cx from "clsx";

import { getSearchParamsString } from "@/shared/lib/searchParams";

import { BookmarkTab, isCourseActive, isPlaceActive } from "../lib/tab";

import styles from "./TabBar.module.scss";

const TabBar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <nav className={styles.wrapper} data-testid="bookmark-page-tab-bar">
      <Link
        href={`${pathname}${getSearchParamsString({ tab: BookmarkTab.PLACES })}`}
        className={cx(styles.item, { [styles.active]: isPlaceActive(tab) })}
        replace
      >
        장소
      </Link>
      <Link
        href={`${pathname}${getSearchParamsString({ tab: BookmarkTab.COURSES })}`}
        className={cx(styles.item, { [styles.active]: isCourseActive(tab) })}
        replace
      >
        코스
      </Link>
    </nav>
  );
};

export default TabBar;
