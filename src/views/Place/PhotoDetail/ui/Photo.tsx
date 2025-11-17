"use client";

import Skeleton from "react-loading-skeleton";

import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";
import Suspense from "@/shared/ui/Suspense";

import { useSelectedPhoto } from "../contexts/SelectedPhotoContext";

import styles from "./Photo.module.scss";

const Photo: React.FC = () => {
  const { selectedPhoto } = useSelectedPhoto();

  return (
    <div className={styles.wrapper}>
      {!!selectedPhoto && (
        <>
          <FallbackHandlerImage
            src={selectedPhoto.imageUrl}
            fill
            alt={`${selectedPhoto.photoId} 사진`}
            fallbackSrc="/images/fallback.png"
            className={styles.image}
          />
          <div className={styles.uploader}>
            <FallbackHandlerImage
              src={selectedPhoto.uploader.thumbnail}
              alt={`${selectedPhoto.uploader.nickname}님의 썸네일`}
              className={styles.uploaderThumbnail}
              fallbackSrc="/images/default-profile.png"
              width={20}
              height={20}
            />
            {selectedPhoto.uploader.nickname}
          </div>
        </>
      )}
      {!selectedPhoto && <Skeleton className={styles.loading} />}
    </div>
  );
};

export default Suspense.with(Photo, {
  fallback: <Skeleton containerClassName={styles.wrapper} className={styles.loading} />,
});
