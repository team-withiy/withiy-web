import cx from "clsx";

import BookmarkPlaceButton from "@/features/toggleBookmark/ui/Place";

import type { PlaceSummaryDTO } from "@/entities/place/api/place.interface";

import IconButton from "@/shared/ui/IconButton";
import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";

import { IconCornerUpRight16, IconSmile16 } from "public/icons";

import styles from "./PlaceInfo.module.scss";

interface Props {
  place: PlaceSummaryDTO;
  className?: string;
}

const PlaceInfo: React.FC<Props> = ({ place, className }) => {
  return (
    <section className={cx(styles.wrapper, className)} data-testid="place-info">
      <div className={styles.titleSection}>
        <h2 className={styles.title} data-testid="place-info-title">
          {place.placeName}
        </h2>
        <span className={styles.category}>
          <FallbackHandlerImage
            src={place.category.icon}
            className={styles.categoryIcon}
            alt={place.category.name}
            width={16}
            height={16}
            data-testid="category-icon"
            fallbackSrc="/images/fallback.png"
          />
          {place.category.name}
        </span>
      </div>
      <address className={styles.address}>{place.address}</address>
      <div className={styles.buttonWrapper}>
        <BookmarkPlaceButton placeId={place.placeId} placeName={place.placeName} />
        <IconButton type="button" variant="outline" icon={<IconCornerUpRight16 />} data-testid="find-road-button">
          길찾기
        </IconButton>
        <IconButton type="button" variant="outline" icon={<IconSmile16 />} data-testid="place-score-button">
          {place.score}도
        </IconButton>
      </div>
    </section>
  );
};

export default PlaceInfo;
