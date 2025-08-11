"use client";

import { useRef } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

import type { PhotoDTO } from "@/entities/photo/api/photo.interface";

import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";

import type { Settings } from "react-slick";

import styles from "./PlaceCarousel.module.scss";

interface Props {
  photos: PhotoDTO[];
}

const Slider = dynamic(() => import("react-slick"));

const settings: Settings = {
  accessibility: true,
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const PlaceCarousel: React.FC<Props> = ({ photos }) => {
  const { push } = useRouter();
  const isDragging = useRef(false);

  const onClickButton = () => {
    if (isDragging.current) return;
    push("/");
  };

  return (
    <section className={styles.wrapper} aria-label="Place Photos">
      <Slider
        {...settings}
        beforeChange={() => (isDragging.current = true)}
        afterChange={() => (isDragging.current = false)}
      >
        {photos.map((photo) => (
          <button key={photo.imageUrl} className={styles.photoLink} onClick={onClickButton}>
            <Image
              src={photo.imageUrl}
              alt={`${photo.uploader.nickname}님이 업로드하신 장소 이미지`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className={styles.image}
            />
            <div className={styles.uploader}>
              <FallbackHandlerImage
                src={photo.uploader.thumbnail}
                alt={`${photo.uploader.nickname}님의 썸네일`}
                width={20}
                height={20}
                className={styles.uploaderThumbnail}
                fallbackSrc="/images/default-profile.png"
              />
              {photo.uploader.nickname}
            </div>
          </button>
        ))}
      </Slider>
    </section>
  );
};

export default PlaceCarousel;
