"use client";

import Skeleton from "react-loading-skeleton";

import { folderQueries } from "@/entities/folder/api/folder.queries";

import useSuspenseCursorPaginationQuery from "@/shared/hooks/useSuspenseCursorPaginationQuery";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import styles from "./PlaceTotalCount.module.scss";

const PlaceTotalCount: React.FC = () => {
  const { data } = useSuspenseCursorPaginationQuery(folderQueries.paginateBookmarkedPlaces);

  return <span className={styles.wrapper}>{data.meta.total}</span>;
};

export default SSRSafeSuspense.with(PlaceTotalCount, {
  fallback: <Skeleton width={24} />,
});
