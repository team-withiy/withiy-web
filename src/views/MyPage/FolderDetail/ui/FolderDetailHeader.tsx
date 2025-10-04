"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import UpdateFolderMenuBottomSheet from "@/features/updateFolder/ui/UpdateFolderMenuBottomSheet";

import { folderQueries } from "@/entities/folder/api/folder.queries";

import BackButton from "@/shared/ui/BackButton";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import { IconArrowLeft24, IconEllipsisVertical20 } from "public/icons";

import styles from "./FolderDetailHeader.module.scss";

const FolderDetailHeader: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { data: folders } = useSuspenseQuery(folderQueries.getFolders);
  const folder = folders.data.find((folder) => folder.id === Number(folderId))!;

  const [isShowEditMenuBottomSheet, setIsShowEditMenuBottomSheet] = useState(false);

  if (!folder) return null;

  return (
    <>
      <header className={styles.wrapper}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 />
        </BackButton>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="메뉴 열기"
          onClick={() => setIsShowEditMenuBottomSheet(true)}
        >
          <IconEllipsisVertical20 />
        </button>
      </header>
      <UpdateFolderMenuBottomSheet
        isShow={isShowEditMenuBottomSheet}
        onClose={() => setIsShowEditMenuBottomSheet(false)}
        folderId={Number(folderId)}
        hasDeletePermission={folder.type === "CUSTOM"}
      />
    </>
  );
};

export default SSRSafeSuspense.with(FolderDetailHeader, {
  fallback: (
    <header className={styles.wrapper}>
      <BackButton className={styles.backButton}>
        <IconArrowLeft24 />
      </BackButton>
    </header>
  ),
});
