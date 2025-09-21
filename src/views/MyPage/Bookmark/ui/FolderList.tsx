"use client";

import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import { folderQueries } from "@/entities/folder/api/folder.queries";
import { getFolderDetailPath } from "@/entities/folder/model/folder";

import PartitionedThumbnail from "@/shared/ui/PartitionedThumbnail";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import CreateFolderButton from "./CreateFolderButton";

import styles from "./FolderList.module.scss";

const FolderList: React.FC = () => {
  const { data } = useSuspenseQuery(folderQueries.getFolders);

  return (
    <>
      <ul className={styles.wrapper} data-testid="folder-list">
        <CreateFolderButton />
        {data.data.map((folder) => (
          <li key={folder.id} className={styles.item} data-testid={`folder-item-${folder.id}`}>
            <Link href={getFolderDetailPath(folder)} data-testid={`folder-link-${folder.id}`}>
              <PartitionedThumbnail imageUrls={folder.thumbnails} className={styles.thumbnail} />
              <span className={styles.name}>
                {folder.name}
                <span className={styles.count}>{folder.bookmarkCount}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SSRSafeSuspense.with(FolderList, {
  fallback: (
    <ul className={styles.wrapper}>
      <CreateFolderButton />
      {range(5).map((value) => (
        <li key={value} className={styles.item}>
          <div className={styles.thumbnail}>
            <Skeleton width="100%" height="100%" />
          </div>
          <Skeleton width={80} height={16} />
        </li>
      ))}
    </ul>
  ),
});
