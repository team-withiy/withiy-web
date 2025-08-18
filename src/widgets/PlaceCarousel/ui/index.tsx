"use client";

import { KeyboardEventHandler, ReactNode, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import { type Settings } from "react-slick";

import Suspense from "@/shared/ui/Suspense";

import styles from "./PlaceCarousel.module.scss";

const Slider = dynamic(() => import("react-slick"));

interface Props {
  children: ReactNode;
  totalPhotos: number;
  clickPath: string;
}

export const PLACE_CAROUSEL_ID = "place-carousel";

const settings: Settings = {
  accessibility: true,
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const PlaceCarousel: React.FC<Props> = ({ children, totalPhotos, clickPath }) => {
  const { push } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(1);
  const isDragging = useRef(false);

  const onClickButton = () => {
    if (isDragging.current) return;
    push(clickPath);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClickButton();
    }
  };

  const beforeChange = () => {
    isDragging.current = true;
  };

  const afterChange = (newIndex: number) => {
    setCurrentSlide(newIndex + 1);
    isDragging.current = false;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.wrapper}
      id={PLACE_CAROUSEL_ID}
      data-testid="place-carousel"
      aria-label="Place Photos"
      onClick={onClickButton}
      onKeyDown={onKeyDown}
    >
      <Slider {...settings} beforeChange={beforeChange} afterChange={afterChange}>
        {children}
      </Slider>
      <span className={styles.pages} data-testid="place-carousel-pages">
        <strong className={styles.currentPage}>{currentSlide}</strong> / {totalPhotos}
      </span>
    </div>
  );
};

export default Suspense.with(PlaceCarousel, {
  fallback: (
    <div className={styles.wrapper} id={PLACE_CAROUSEL_ID}>
      <Skeleton containerClassName={styles.loading} height={styles.carouselHeight} />
    </div>
  ),
});
