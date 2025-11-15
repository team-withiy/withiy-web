"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";
import { type Settings } from "react-slick";

import { placeQueries } from "@/entities/place/api/place.queries";

import useSuspenseCursorPaginationQuery from "@/shared/hooks/useSuspenseCursorPaginationQuery";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import styles from "./Photo.module.scss";

const Slider = dynamic(() => import("react-slick"));

const settings: Settings = {
  accessibility: true,
  arrows: false,
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Photo: React.FC = () => {
  const { photoId, placeId } = useParams<{ placeId: string; photoId: string }>();
  const {} = useSuspenseQuery(placeQueries.getPhoto({ photoId: Number(photoId), placeId: Number(placeId) }));
  const { data: photoList } = useSuspenseCursorPaginationQuery(placeQueries.paginatePhotos(Number(placeId)));
  console.log({ photoList });

  return (
    <div className={styles.wrapper}>
      <Slider {...settings}></Slider>
    </div>
  );
};

export default SSRSafeSuspense.with(Photo, { fallback: <div className={styles.wrapper}></div> });
