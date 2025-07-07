"use client";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { DEFAULT_PROFILE_IMAGE_SRC, IMAGE_ACCEPT, IMAGE_MAX_SIZE } from "@/shared/constants/image";
import Dropzone from "@/shared/ui/Dropzone";
import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";

import { IconCamera24 } from "public/icons";

import type { DropzoneOptions } from "react-dropzone";

import styles from "./ThumbnailInput.module.scss";

interface Props {
  file?: File;
  defaultValue?: string;
  onDrop: DropzoneOptions["onDrop"];
  className?: string;
  "data-testid"?: string;
}

const ThumbnailInput: React.FC<Props> = ({ className, onDrop, defaultValue, file, "data-testid": testId }) => {
  const src = file ? URL.createObjectURL(file) : defaultValue;

  return (
    <Dropzone
      className={cx(styles.wrapper, className)}
      options={{ accept: IMAGE_ACCEPT, maxSize: IMAGE_MAX_SIZE, maxFiles: 1, onDrop }}
      data-testid={testId}
    >
      <FallbackHandlerImage
        src={src || DEFAULT_PROFILE_IMAGE_SRC}
        alt="thumbnail"
        className={styles.image}
        fallbackSrc={DEFAULT_PROFILE_IMAGE_SRC}
        width={Number(styles.imageSize)}
        height={Number(styles.imageSize)}
        data-testid={testId ? `${testId}-image` : undefined}
      />
      <div className={styles.cameraIconWrapper} data-testid={testId ? `${testId}-camera` : undefined}>
        <IconCamera24 className={styles.cameraIcon} />
      </div>
    </Dropzone>
  );
};

export default ThumbnailInput;

interface LoadingThumbnailInputProps {
  className?: string;
  "data-testid"?: string;
}

export const LoadingThumbnailInput = ({ className, "data-testid": testId }: LoadingThumbnailInputProps) => {
  return (
    <div className={cx(styles.wrapper, styles.loading, className)} data-testid={testId}>
      <Skeleton className={styles.image} circle />
      <div className={styles.cameraIconWrapper}>
        <IconCamera24 className={styles.cameraIcon} />
      </div>
    </div>
  );
};
