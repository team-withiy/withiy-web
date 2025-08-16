"use client";

import { ReactNode, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import Slider, { type Settings } from "react-slick";

import styles from "./PlaceCarousel.module.scss";

interface Props {
  children: ReactNode;
  totalPhotos: number;
}

const settings: Settings = {
  accessibility: true,
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const PlaceCarousel: React.FC<Props> = ({ children, totalPhotos }) => {
  const { push } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(1);
  const isDragging = useRef(false);

  const onClickButton = () => {
    if (isDragging.current) return;
    push("/");
  };

  const beforeChange = () => {
    isDragging.current = true;
  };

  const afterChange = (newIndex: number) => {
    setCurrentSlide(newIndex + 1);
    isDragging.current = false;
  };

  return (
    <section
      role="button"
      className={styles.wrapper}
      data-testid="place-carousel"
      aria-label="Place Photos"
      onClick={onClickButton}
    >
      <Slider {...settings} beforeChange={beforeChange} afterChange={afterChange}>
        {children}
      </Slider>
      <span className={styles.pages} data-testid="place-carousel-pages">
        <strong className={styles.currentPage}>{currentSlide}</strong> / {totalPhotos}
      </span>
    </section>
  );
};

export default PlaceCarousel;
