"use client";

import { PropsWithChildren } from "react";

import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  fallbackUrl?: string;
}

const BackButton: React.FC<PropsWithChildren<Props>> = ({ children, className, fallbackUrl = "/" }) => {
  const router = useRouter();

  const handleBack = () => {
    if (document.referrer && document.referrer.includes(window.location.origin)) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <div role="button" className={className} onClick={handleBack} data-testid="back-button" aria-label="뒤로가기">
      {children}
    </div>
  );
};

export default BackButton;
