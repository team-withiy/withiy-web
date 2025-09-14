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
      <ul>
        <li>
          <Link
            href={`${pathname}${getSearchParamsString({ tab: BookmarkTab.PLACES })}`}
            className={cx(styles.item, { [styles.active]: isPlaceActive(tab) })}
            data-testid="bookmark-page-tab-bar-places-tab"
            replace
          >
            장소
          </Link>
        </li>
        <li>
          <Link
            href={`${pathname}${getSearchParamsString({ tab: BookmarkTab.COURSES })}`}
            className={cx(styles.item, { [styles.active]: isCourseActive(tab) })}
            data-testid="bookmark-page-tab-bar-courses-tab"
            replace
          >
            코스
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TabBar;
