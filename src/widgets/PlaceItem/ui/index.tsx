"use client";

import cx from "clsx";

import PlaceInfo from "@/widgets/PlaceInfo/ui/PlaceInfo.client";

import type { PlaceSummaryDTO } from "@/entities/place/api/place.interface";

import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";

import styles from "./PlaceItem.module.scss";

interface Props {
  place: PlaceSummaryDTO;
  className?: string;
  infoClassName?: string;
}

const PlaceItem: React.FC<Props> = ({ place, className, infoClassName }) => {
  return (
    <article className={cx(styles.wrapper, className)} data-testid="place-item">
      <PlaceInfo place={place} className={cx(styles.info, infoClassName)} />
      <div className={styles.images}>
        {place.imageUrls.map((url, index) => (
          <FallbackHandlerImage
            width={120}
            height={160}
            className={styles.image}
            key={`${place.placeId}-image-${index}`}
            src={url}
            alt={`${place.placeName} 이미지 ${index + 1}`}
            fallbackSrc="/images/fallback.png"
          />
        ))}
      </div>
    </article>
  );
};

export default PlaceItem;
