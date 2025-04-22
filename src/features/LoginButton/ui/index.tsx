"use client";

import { type ComponentProps, type ReactNode, useTransition } from "react";

import cx from "clsx";

import type { SocialType } from "@/shared/api/auth/auth.interface";
import Tooltip from "@/shared/ui/Tooltip";

import { getOAuthLinkWithSetStateAction } from "../api/actions";
import { IconGoogle, IconKakao, IconNaver } from "public/icons/auth";

import styles from "./LoginButton.module.scss";

interface Props extends Omit<ComponentProps<"button">, "children"> {
  socialType: SocialType;
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

const LoginButton: React.FC<Props> = ({ socialType, className, ...props }) => {
  const { children, icon } = SOCIAL_TYPE_MAPPER[socialType];

  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const redirectUrl = await getOAuthLinkWithSetStateAction(socialType);
      window.open(redirectUrl, "_self");
    });
  };

  return (
    <Tooltip tooltipContent="최근에 로그인했어요!" className={styles.wrapper} leftPositionBasedOnTail="85%">
      <button
        type="button"
        disabled={isPending}
        aria-label={`${socialType} 로그인 버튼`}
        className={cx(styles.loginButton, className, styles[socialType])}
        data-testid={`${socialType}-login-button`}
        onClick={onClick}
        {...props}
      >
        {icon}
        {children}
      </button>
    </Tooltip>
  );
};

export default LoginButton;
