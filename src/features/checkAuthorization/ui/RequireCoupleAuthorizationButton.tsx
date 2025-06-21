"use client";

import { type PropsWithChildren, useState } from "react";

import RequireCoupleAuthorizationBottomSheet from "./RequireCoupleAuthorizationBottomSheet";

interface Props {
  className?: string;
  callbackUrl: string;
}

const RequireCoupleAuthorizationButton: React.FC<PropsWithChildren<Props>> = ({ children, className, callbackUrl }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div
        role="button"
        className={className}
        onClick={() => setIsShow(true)}
        aria-label="커플 연결이 필요한 기능입니다."
        data-testid="require-couple-authorization-button"
      >
        {children}
      </div>
      <RequireCoupleAuthorizationBottomSheet
        isShow={isShow}
        onClose={() => setIsShow(false)}
        callbackUrl={callbackUrl}
      />
    </>
  );
};

export default RequireCoupleAuthorizationButton;
