"use client";

import { useRouter } from "next/navigation";

import UnderlineButton from "@/shared/ui/Button/UnderlineButton";

const BackButton: React.FC = () => {
  const { back } = useRouter();

  return (
    <UnderlineButton size={20} onClick={back} type="button" aria-label="뒤로가기">
      위디 둘러보기
    </UnderlineButton>
  );
};

export default BackButton;
