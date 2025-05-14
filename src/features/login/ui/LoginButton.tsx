"use client";

import { type ReactNode } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import cx from "clsx";

import type { SocialType } from "@/shared/api/auth/auth.interface";
import { authQueries } from "@/shared/api/auth/auth.queries";
import Tooltip from "@/shared/ui/Tooltip";

import { useSetRecentLoginedSocialTypeMutation } from "../api/loginButton.mutations";
import { IconGoogle, IconKakao, IconNaver } from "public/icons/auth";

import styles from "./LoginButton.module.scss";

interface Props {
  socialType: SocialType;
  className?: string;
}

interface SocialTypeValue {
  children: string;
  icon: ReactNode;
}

const SOCIAL_TYPE_MAPPER: Record<SocialType, SocialTypeValue> = {
  google: {
    children: "Google 로그인",
    icon: <IconGoogle className={styles.icon} />,
  },

  kakao: {
    children: "Kakao 로그인",
    icon: <IconKakao className={styles.icon} />,
  },
  naver: {
    children: "Naver 로그인",
    icon: <IconNaver className={styles.icon} />,
  },
};

const LoginButton: React.FC<Props> = ({ socialType, className }) => {
  const { children, icon } = SOCIAL_TYPE_MAPPER[socialType];
  const { data } = useSuspenseQuery(authQueries.getRecentLoginedSocialType);

  const { mutateAsync } = useSetRecentLoginedSocialTypeMutation();

  const onClick = async () => {
    await mutateAsync(socialType);
  };

  return (
    <Tooltip
      tooltipContent="최근에 로그인했어요!"
      className={styles.wrapper}
      leftPositionBasedOnTail="85%"
      isHidden={data.socialType !== socialType}
    >
      <button
        type="button"
        aria-label={`${socialType} 로그인 버튼`}
        className={cx(styles.loginButton, className, styles[socialType])}
        data-testid={`${socialType}-login-button`}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    </Tooltip>
  );
};

export default LoginButton;

interface LoadingLoginButtonProps {
  socialType: SocialType;
  className?: string;
}

export const LoadingLoginButton: React.FC<LoadingLoginButtonProps> = ({ socialType, className }) => {
  const { children, icon } = SOCIAL_TYPE_MAPPER[socialType];

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.loginButton, styles.loading, className, styles[socialType])}
        data-testid={`${socialType}-login-button`}
      >
        {icon}
        {children}
      </div>
    </div>
  );
};
