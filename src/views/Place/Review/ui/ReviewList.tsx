"use client";

import { useParams } from "next/navigation";

import { placeQueries } from "@/entities/place/api/place.queries";
import ReviewItem from "@/entities/review/ui/ReviewItem/ReviewItem.client";

import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import Suspense from "@/shared/ui/Suspense";

import ListTopSection from "./ListTopSection";

import styles from "./ReviewList.module.scss";

const ReviewList: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();

  return (
    <InfiniteScroll.Suspense.Cursor.Vertical.Boundary
      query={placeQueries.paginateReviews({ placeId: Number(placeId), sortBy: "latest" })}
    >
      {({ data, ...queryInfo }) => (
        <div className={styles.wrapper}>
          <ListTopSection total={data.meta.total} />
          <InfiniteScroll.Suspense.Cursor.Vertical.Container data={data} elementType="ul" {...queryInfo}>
            {data.data.map((review) => (
              <ReviewItem review={review} className={styles.reviewItem} key={review.reviewId} />
            ))}
          </InfiniteScroll.Suspense.Cursor.Vertical.Container>
        </div>
      )}
    </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
  );
};

export default Suspense.with(ReviewList, { fallback: <>LOADING</> });
