"use client";

import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

import { folderQueries } from "@/entities/folder/api/folder.queries";

import useSuspenseCursorPaginationQuery from "@/shared/hooks/useSuspenseCursorPaginationQuery";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import styles from "./Title.module.scss";

const Title: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { data: folders } = useSuspenseQuery(folderQueries.getFolders);
  const { data: placeData } = useSuspenseCursorPaginationQuery(folderQueries.paginateFolderPlaces(Number(folderId)));

  const folder = folders.data.find((folder) => folder.id === Number(folderId));

  if (!folder) return null;

  const style = { "--folder-color": folder.color } as React.CSSProperties;

  return (
    <h1 className={styles.wrapper} style={style}>
      {folder.name}
      <span className={styles.count}>{placeData.meta.total}</span>
    </h1>
  );
};

export default SSRSafeSuspense.with(Title, {
  fallback: <Skeleton width={200} height={34} />,
});
