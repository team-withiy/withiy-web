"use client";

import { KeyboardEventHandler, ReactNode, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import Slider, { type Settings } from "react-slick";

import styles from "./PlaceCarousel.module.scss";

interface Props {
  children: ReactNode;
  totalPhotos: number;
  clickPath: string;
}

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

export default PlaceCarousel;
