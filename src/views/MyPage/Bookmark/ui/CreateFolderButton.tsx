"use client";

import { useState } from "react";

import { CreateFolderBottomSheet } from "@/features/createFolder/ui";

import { IconPlus24 } from "public/icons";

import styles from "./CreateFolderButton.module.scss";

const CreateFolderButton: React.FC = () => {
  const [isShowCreateFolderModal, setIsShowCreateFolderModal] = useState(false);

  return (
    <>
      <li className={styles.wrapper}>
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
      <CreateFolderBottomSheet isShow={isShowCreateFolderModal} onClose={() => setIsShowCreateFolderModal(false)} />
    </>
  );
};

export default CreateFolderButton;
