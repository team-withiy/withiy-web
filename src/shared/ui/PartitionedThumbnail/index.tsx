"use client";

import cx from "clsx";

import FallbackHandlerImage from "../Image/FallbackHandlerImage";

import styles from "./PartitionedThumbnail.module.scss";

const MAX_IMAGES = 4;

interface Props {
  imageUrls: string[];
  className?: string;
}

const PartitionedThumbnail: React.FC<Props> = ({ imageUrls, className }) => {
  const imageCount = Math.min(imageUrls.length, MAX_IMAGES);
  const displayImages = imageUrls.slice(0, MAX_IMAGES);

  const style = { "--count": imageCount } as React.CSSProperties;

  return (
    <div className={cx(styles.wrapper, className)} style={style}>
      {displayImages.map((url, index) => (
        <div className={styles.imageWrapper} key={`${url}-wrapper-${index}`}>
          <FallbackHandlerImage
            key={`${url}-${index}`}
            src={url}
            fill
            alt={`Image ${index + 1}`}
            className={styles.image}
            fallbackSrc="/images/fallback.png"
          />
        </div>
      ))}
    </div>
  );
};

export default PartitionedThumbnail;
