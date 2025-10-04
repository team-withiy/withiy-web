"use client";

import { useState } from "react";

import cx from "clsx";

import useAlert from "@/shared/ui/Alert/useAlert";
import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";
import Button from "@/shared/ui/Button/Button";

import { useDeleteFolderMutation } from "../../api/deleteFolder.mutations";
import { UpdateFolderBottomSheet } from "../UpdateFolderBottomSheet";

import styles from "./UpdateFolderMenuBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  folderId: number;
  hasDeletePermission?: boolean;
}

const UpdateFolderMenuBottomSheet: React.FC<Props> = ({ isShow, onClose, folderId, hasDeletePermission = false }) => {
  const [isShowUpdateFolder, setIsShowUpdateFolder] = useState(false);

  const { showAlert, closeAlert } = useAlert();
  const { mutateAsync: deleteFolder } = useDeleteFolderMutation();

  const onClickDelete = () => {
    onClose();
    showAlert({
      title: "데이트 폴더를 지울까요?",
      content: "폴더 안의 모든 장소가 삭제돼요",
      confirmText: "지울게요",
      cancelText: "다시 생각해볼게요",
      uiType: "twoButton",
      onConfirm: async () => {
        await deleteFolder(folderId);
        closeAlert();
      },
      onCancel: () => {
        closeAlert();
      },
    });
  };

  return (
    <>
      <BaseBottomSheet
        isShow={isShow}
        onClose={onClose}
        className={cx(styles.wrapper, styles.bottomSheet, { [styles.hide]: isShowUpdateFolder })}
      >
        <Button variant="text" full type="button" size={52} onClick={() => setIsShowUpdateFolder(true)}>
          수정하기
        </Button>
        {hasDeletePermission && (
          <Button variant="text" full type="button" size={52} className={styles.deleteButton} onClick={onClickDelete}>
            삭제하기
          </Button>
        )}
      </BaseBottomSheet>
      <UpdateFolderBottomSheet
        isShow={isShowUpdateFolder}
        onClose={() => setIsShowUpdateFolder(false)}
        folderId={folderId}
        hideOverlay
        preventTransition
      />
    </>
  );
};

export default UpdateFolderMenuBottomSheet;
