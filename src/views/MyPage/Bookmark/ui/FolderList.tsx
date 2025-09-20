"use client";

import { useState } from "react";

import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";

import { CreateFolderBottomSheet } from "@/features/createFolder/ui";

import { folderQueries } from "@/entities/folder/api/folder.queries";

import PartitionedThumbnail from "@/shared/ui/PartitionedThumbnail";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import { IconPlus24 } from "public/icons";

import styles from "./FolderList.module.scss";

const FolderList: React.FC = () => {
  const { data } = useSuspenseQuery(folderQueries.getFolders);

  const [isShowCreateFolderModal, setIsShowCreateFolderModal] = useState(false);

  return (
    <>
      <ul className={styles.wrapper}>
        <li className={styles.item}>
          <button
            type="button"
            data-testid="create-folder-button"
            className={styles.createFolderButton}
            onClick={() => setIsShowCreateFolderModal(true)}
          >
            <div className={styles.plusIconWrapper}>
              <IconPlus24 className={styles.plusIcon} />
            </div>
            <span className={styles.text}>새로운 폴더</span>
          </button>
        </li>
        {data.data.map((folder) => (
          <li key={folder.id} className={styles.item}>
            <Link href={`/folder/${folder.id}`}>
              <PartitionedThumbnail imageUrls={folder.thumbnails} className={styles.thumbnail} />
              <span className={styles.name}>
                {folder.name}
                <span className={styles.count}>{folder.bookmarkCount}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <CreateFolderBottomSheet isShow={isShowCreateFolderModal} onClose={() => setIsShowCreateFolderModal(false)} />
    </>
  );
};

export default SSRSafeSuspense.with(FolderList, {
  fallback: <>LOADING</>,
});
