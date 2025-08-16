import type { PhotoDTO } from "@/entities/photo/api/photo.interface";

import BlurImage from "@/shared/ui/Image/BlurImage";

import styles from "./PlaceCarouselImage.module.scss";

interface Props {
  photo: PhotoDTO;
}

const PlaceCarouselImage: React.FC<Props> = ({ photo }) => {
  return (
    <div className={styles.wrapper} data-testid={`${photo.photoId}-place-carousel-image`}>
      <BlurImage
        src={photo.imageUrl}
        alt={`${photo.uploader.nickname}님이 업로드하신 장소 이미지`}
        className={styles.image}
        fallbackProps={{
          src: "/images/fallback.png",
          alt: "Loading...",
        }}
      />
      <div className={styles.uploader}>
        <BlurImage
          src={photo.uploader.thumbnail}
          alt={`${photo.uploader.nickname}님의 썸네일`}
          className={styles.uploaderThumbnail}
          fallbackProps={{
            src: "/images/default-profile.png",
            alt: "Loading...",
          }}
        />
        {photo.uploader.nickname}
      </div>
    </div>
  );
};

export default PlaceCarouselImage;
