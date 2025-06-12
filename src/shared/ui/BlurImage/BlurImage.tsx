import { ComponentProps } from "react";

import Image from "next/image";

import { getRemotePlaiceholderImage } from "@/shared/lib/plaiceholder";

interface Props extends Omit<ComponentProps<typeof Image>, "width" | "height" | "blurDataURL" | "placeholder"> {}

const BlurImage: React.FC<Props> = async ({ src, alt, ...props }) => {
  if (typeof src !== "string") throw new Error("Remote Image만을 지원합니다.");
  const { base64, img } = await getRemotePlaiceholderImage(src);

  return (
    <Image
      src={img.src}
      blurDataURL={base64}
      width={img.width}
      height={img.height}
      placeholder="blur"
      alt={alt}
      {...props}
    />
  );
};

export default BlurImage;
