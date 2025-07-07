/* eslint-disable jsx-a11y/alt-text */
import { ComponentProps } from "react";

import Image from "next/image";

import { getRemotePlaiceholderImage } from "@/shared/lib/plaiceholder";

interface Props extends Omit<ComponentProps<typeof Image>, "width" | "height" | "blurDataURL" | "placeholder"> {
  fallbackProps: ComponentProps<typeof Image>;
}

const BlurImage: React.FC<Props> = async ({ src, alt, fallbackProps, ...props }) => {
  try {
    if (typeof src !== "string") {
      throw new Error("Image src must be a string for blurring.");
    }
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
  } catch {
    return <Image {...fallbackProps} />;
  }
};

export default BlurImage;
