import { ComponentProps } from "react";

/* eslint-disable @next/next/no-img-element */
export const Image = ({ src, alt, className, onError, ...props }: ComponentProps<"img">) => {
  return <img src={src} alt={alt} className={className} onError={onError} {...props} />;
};

export default Image;
