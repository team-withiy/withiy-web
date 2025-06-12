/* eslint-disable jsx-a11y/alt-text */
"use client";

import type { ComponentProps } from "react";

import Image from "next/image";

interface Props extends Omit<ComponentProps<typeof Image>, "onError"> {
  fallbackSrc: string;
}

const FallbackHandlerImage: React.FC<Props> = ({ fallbackSrc, ...props }) => {
  const onError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.src = fallbackSrc;
  };

  return <Image onError={onError} data-testid="fallback-handler-image" {...props} />;
};

export default FallbackHandlerImage;
