"use client";

import { useLayoutEffect, useRef } from "react";

import Skeleton from "react-loading-skeleton";
import Slider, { type Settings } from "react-slick";

import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";
import Suspense from "@/shared/ui/Suspense";

import usePhotoList from "../hooks/usePhotoList";

import styles from "./Photo.module.scss";

const settings: Settings = {
  accessibility: true,
  arrows: false,
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Photo: React.FC = () => {
  const slickRef = useRef<Slider>(null);
  const { photos, currentPhotoIndex, onFocusPhoto } = usePhotoList();

  const afterChange = (newIndex: number) => {
    const newPhotoId = photos[newIndex].photoId;
    onFocusPhoto(newPhotoId);
  };

  useLayoutEffect(() => {
    if (slickRef.current) {
      slickRef.current.slickGoTo(currentPhotoIndex, true);
    }
  }, [currentPhotoIndex]);

  return (
    <div className={styles.wrapper}>
      <Slider {...settings} className={styles.slider} afterChange={afterChange} ref={slickRef}>
        {photos.map((photo) => (
          <div key={photo.photoId} className={styles.photoWrapper}>
            <FallbackHandlerImage
              src={photo.imageUrl}
              fill
              alt="Photo"
              className={styles.photo}
              fallbackSrc="/images/fallback.png"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Suspense.with(Photo, {
  fallback: <Skeleton containerClassName={styles.wrapper} className={styles.loading} />,
});
