import cx from "clsx";

import BlurImage from "@/shared/ui/Image/BlurImage";

import { IconSmile16 } from "public/icons";

import type { ReviewDTO } from "../../api/review.interface";

import styles from "./ReviewItem.module.scss";

interface Props {
  review: ReviewDTO;
  className?: string;
}

const ReviewItem: React.FC<Props> = ({ review, className }) => {
  return (
    <article className={cx(styles.wrapper, className)} data-testid={`${review.reviewId}-review-item`}>
      <div className={styles.info}>
        <span className={styles.nickname}>
          <BlurImage
            src={review.reviewer.thumbnail}
            className={styles.thumbnail}
            alt={`${review.reviewer.nickname} 님의 프로필이미지`}
            fallbackProps={{
              src: "/images/default-profile.png",
              alt: "기본 프로필 이미지",
              width: 16,
              height: 16,
              className: styles.thumbnail,
            }}
          />
          {review.reviewer.nickname}
        </span>
        <address className={styles.address}>장소 이름</address>
        <p className={styles.contents}>{review.contents}</p>
      </div>
      <div className={styles.images}>
        {review.imageUrls.slice(0, 4).map((image) => (
          <BlurImage
            key={image}
            src={image}
            className={styles.image}
            alt="장소 이미지"
            fallbackProps={{
              src: "/images/fallback.png",
              alt: "기본 장소 이미지",
              width: 75,
              height: 100,
              className: styles.image,
            }}
          />
        ))}
      </div>
      <span className={styles.score}>
        <IconSmile16 />
        {review.score}도
      </span>
    </article>
  );
};

export default ReviewItem;
