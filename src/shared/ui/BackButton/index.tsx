"use client";

import { PropsWithChildren } from "react";

import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const BackButton: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
  const { back } = useRouter();

  return (
    <div role="button" className={className} onClick={back} data-testid="back-button" aria-label="뒤로가기">
      {children}
    </div>
  );
};

export default BackButton;
