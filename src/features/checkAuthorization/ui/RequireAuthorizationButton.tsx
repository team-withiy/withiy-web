"use client";

import { type PropsWithChildren, useState } from "react";

import RequireAuthorizationBottomSheet from "./RequireAuthorizationBottomSheet";

interface Props {
  className?: string;
  callbackUrl: string;
}

const RequireAuthorizationButton: React.FC<PropsWithChildren<Props>> = ({ children, className, callbackUrl }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div
        role="button"
        className={className}
        onClick={() => setIsShow(true)}
        aria-label="로그인이 필요한 기능입니다."
        data-testid="require-authorization-button"
      >
        {children}
      </div>
      <RequireAuthorizationBottomSheet isShow={isShow} onClose={() => setIsShow(false)} callbackUrl={callbackUrl} />
    </>
  );
};

export default RequireAuthorizationButton;
