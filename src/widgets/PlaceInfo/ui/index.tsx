import cx from "clsx";

import type { PlaceDetailDTO } from "@/entities/place/api/place.interface";

import BlurImage from "@/shared/ui/Image/BlurImage";

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
    </section>
  );
};

export default PlaceInfo;
