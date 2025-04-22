"use client";

import { type ReactNode } from "react";

import Link from "next/link";

import cx from "clsx";

import type { SocialType } from "@/shared/api/auth/auth.interface";
import Tooltip from "@/shared/ui/Tooltip";

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

  return (
    <Tooltip tooltipContent="최근에 로그인했어요!" className={styles.wrapper} leftPositionBasedOnTail="85%" isHidden>
      <Link
        aria-label={`${socialType} 로그인 버튼`}
        className={cx(styles.loginButton, className, styles[socialType])}
        data-testid={`${socialType}-login-button`}
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/${socialType}`}
      >
        {icon}
        {children}
      </Link>
    </Tooltip>
  );
};

export default LoginButton;
