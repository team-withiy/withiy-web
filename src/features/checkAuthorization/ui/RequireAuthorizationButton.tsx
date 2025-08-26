"use client";

import { MouseEventHandler, type PropsWithChildren, useState } from "react";

import RequireAuthorizationBottomSheet from "./RequireAuthorizationBottomSheet";

interface Props {
  className?: string;
  callbackUrl: string;
}

const RequireAuthorizationButton: React.FC<PropsWithChildren<Props>> = ({ children, className, callbackUrl }) => {
  const [isShow, setIsShow] = useState(false);

  const onClickCapture: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsShow(true);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={className}
        onClickCapture={onClickCapture}
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
