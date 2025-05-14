"use client";

import { useRouter } from "next/navigation";

import { logoutApi } from "@/shared/api/auth/auth.mutations";

const Test: React.FC = () => {
  const { refresh } = useRouter();

  const onClick = async () => {
    await logoutApi();
    refresh();
  };

  return (
    <button type="button" onClick={onClick}>
      로그아웃
    </button>
  );
};

export default Test;
