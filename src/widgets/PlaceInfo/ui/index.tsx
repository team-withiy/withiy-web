import cx from "clsx";

import FavoritePlaceButton from "@/features/toggleFavorite/ui/FavoritePlaceButton";

import type { PlaceDetailDTO } from "@/entities/place/api/place.interface";

import IconButton from "@/shared/ui/IconButton";
import BlurImage from "@/shared/ui/Image/BlurImage";

import { IconCornerUpRight16, IconSmile16 } from "public/icons";

import styles from "./PlaceInfo.module.scss";

interface Props {
  place: PlaceDetailDTO;
  className?: string;
}

const PlaceInfo: React.FC<Props> = ({ place, className }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <div className={styles.titleSection}>
        <h2 className={styles.title}>{place.placeName}</h2>
        <span className={styles.category}>
          <BlurImage
            src={place.category.icon}
            alt={place.category.name}
            fallbackProps={{ src: "/images/fallback.png", alt: "카테고리 아이콘", width: 16, height: 16 }}
          />
          {place.category.name}
        </span>
      </div>
      <address className={styles.address}>{place.address}</address>
      <div className={styles.buttonWrapper}>
        <FavoritePlaceButton placeId={place.placeId} />
        <IconButton type="button" variant="outline" icon={<IconCornerUpRight16 />}>
          길찾기
        </IconButton>
        <IconButton type="button" variant="outline" icon={<IconSmile16 />}>
          {place.score}도
        </IconButton>
      </div>
    </section>
  );
};

export default PlaceInfo;
