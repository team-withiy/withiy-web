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
        <span className={styles.nickname} data-testid="review-nickname">
          <BlurImage
            src={review.reviewer.thumbnail}
            className={styles.thumbnail}
            alt={`${review.reviewer.nickname} 님의 프로필이미지`}
            data-testid="reviewer-thumbnail"
            fallbackProps={{
              src: "/images/default-profile.png",
              alt: "기본 프로필 이미지",
              width: 16,
              height: 16,
              className: styles.thumbnail,
            }}
          />
          <span data-testid="reviewer-nickname">{review.reviewer.nickname}</span>
        </span>
        <address className={styles.address} data-testid="review-address">
          장소 이름
        </address>
        <p className={styles.contents} data-testid="review-contents">
          {review.contents}
        </p>
      </div>
      <div className={styles.images} data-testid="review-images">
        {review.imageUrls.slice(0, 4).map((image, index) => (
          <BlurImage
            key={image}
            src={image}
            className={styles.image}
            alt="장소 이미지"
            data-testid={`review-image-${index}`}
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
      <span className={styles.score} data-testid="review-score">
        <IconSmile16 />
        <span data-testid="review-score-value">{review.score}도</span>
      </span>
    </article>
  );
};

export default ReviewItem;
