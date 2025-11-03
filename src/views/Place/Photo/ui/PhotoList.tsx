"use client";

import { useParams } from "next/navigation";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import { placeQueries } from "@/entities/place/api/place.queries";

import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";
import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import Suspense from "@/shared/ui/Suspense";

import styles from "./PhotoList.module.scss";

const PhotoList: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();

  return (
    <InfiniteScroll.Suspense.Cursor.Vertical.Boundary query={placeQueries.paginatePhotos(Number(placeId))}>
      {({ data, isFetchingNextPage, isFetchingPreviousPage, ...queryInfo }) => (
        <InfiniteScroll.Suspense.Cursor.Vertical.Container
          className={styles.wrapper}
          data={data}
          isFetchingNextPage={isFetchingNextPage}
          isFetchingPreviousPage={isFetchingPreviousPage}
          {...queryInfo}
          elementType="div"
          isElementRoot
        >
          <ul className={styles.list}>
            {isFetchingPreviousPage &&
              range(10).map((i) => <Skeleton key={i} containerClassName={styles.loadingItem} />)}
            {data.data.map((photo) => (
              <li className={styles.item} key={photo.photoId}>
                <div className={styles.imageWrapper}>
                  <FallbackHandlerImage
                    src={photo.imageUrl}
                    fill
                    alt={`Photo ${photo.photoId}`}
                    className={styles.image}
                    fallbackSrc="/images/fallback.png"
                  />
                </div>
              </li>
            ))}
            {isFetchingNextPage && range(10).map((i) => <Skeleton key={i} containerClassName={styles.loadingItem} />)}
          </ul>
        </InfiniteScroll.Suspense.Cursor.Vertical.Container>
      )}
    </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
  );
};

export default Suspense.with(PhotoList, {
  fallback: (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {range(10).map((i) => (
          <Skeleton key={i} containerClassName={styles.loadingItem} />
        ))}
      </ul>
    </div>
  ),
});
