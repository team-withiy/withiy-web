import Link from "next/link";

import cx from "clsx";

import type { ReviewDTO } from "@/entities/review/api/review.interface";
import ReviewItem from "@/entities/review/ui/ReviewItem";

import Button from "@/shared/ui/Button/Button";

import styles from "./PreviewReview.module.scss";

const MAX_REVIEWS = 4;

interface Props {
  reviews: ReviewDTO[];
  moreHref: string;
  className?: string;
  reviewItemClassName?: string;
}

const PreviewReview: React.FC<Props> = ({ reviews, className, reviewItemClassName, moreHref }) => {
  if (reviews.length <= MAX_REVIEWS)
    return (
      <div className={cx(styles.wrapper, className)} data-testid="preview-review">
        {reviews.map((review) => (
          <ReviewItem className={cx(styles.reviewItem, reviewItemClassName)} key={review.reviewId} review={review} />
        ))}
      </div>
    );

  return (
    <div className={cx(styles.wrapper, styles.dimmed, className)} data-testid="dimmed-preview-review">
      {reviews.slice(0, MAX_REVIEWS).map((review) => (
        <ReviewItem className={cx(styles.reviewItem, reviewItemClassName)} key={review.reviewId} review={review} />
      ))}
      <div className={styles.dimmedOverlay} data-testid="dimmed-preview-review-overlay" />
      <div className={styles.moreButtonWrapper} data-testid="dimmed-preview-review-button-wrapper">
        <Link href={moreHref} className={styles.moreButtonLink}>
          <Button size={52} variant="outline" type="button" full>
            더보기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PreviewReview;
