"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import useLogout from "@/entities/user/hooks/useLogout";

import useAlert from "@/shared/ui/Alert/useAlert";
import Loading from "@/shared/ui/Loading";

import styles from "./LogoutButton.module.scss";

const LogoutButton: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const { showAlert, closeAlert } = useAlert();
  const { replace } = useRouter();
  const { logout } = useLogout();

  const onClickLogout = () => {
    showAlert({
      uiType: "twoButton",
      title: "정말 로그아웃할까요?",
      content: "위디는 언제든 기다리고 있을게요!",
      confirmText: "로그아웃할게요",
      cancelText: "다시 생각해볼게요",
      onConfirm: () => {
        startTransition(async () => {
          await logout();
          replace("/");
          closeAlert();
        });
      },
      onCancel: closeAlert,
    });
  };

  return (
    <>
      <button type="button" className={styles.wrapper} onClick={onClickLogout} data-testid="logout-button">
        로그아웃
      </button>
      <Loading isShow={isPending} />
    </>
  );
};

export default LogoutButton;
