"use client";

import { useParams } from "next/navigation";

import { range } from "lodash-es";

import { placeQueries } from "@/entities/place/api/place.queries";
import ReviewItem from "@/entities/review/ui/ReviewItem/ReviewItem.client";

import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import Suspense from "@/shared/ui/Suspense";

import ListTopSection from "./ListTopSection";

import styles from "./ReviewList.module.scss";

const ReviewList: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();

  return (
    <>
      <InfiniteScroll.Suspense.Cursor.Vertical.Boundary
        query={placeQueries.paginateReviews({ placeId: Number(placeId), sortBy: "latest" })}
      >
        {({ data, ...queryInfo }) => (
          <div className={styles.wrapper}>
            <ListTopSection total={data.meta.total} />
            <InfiniteScroll.Suspense.Cursor.Vertical.Container
              isElementRoot
              data={data}
              elementType="ul"
              loadingElements={range(10).map((value) => (
                <ReviewItem.Loading className={styles.reviewItem} key={value} />
              ))}
              className={styles.list}
              {...queryInfo}
            >
              {data.data.map((review) => (
                <li key={review.reviewId} className={styles.reviewItem}>
                  <ReviewItem review={review} />
                </li>
              ))}
            </InfiniteScroll.Suspense.Cursor.Vertical.Container>
          </div>
        )}
      </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
    </>
  );
};

export default Suspense.with(ReviewList, {
  fallback: range(10).map((value) => <ReviewItem.Loading key={value} className={styles.reviewItem} />),
});
