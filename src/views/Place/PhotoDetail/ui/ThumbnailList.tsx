"use client";

import { useLayoutEffect } from "react";

import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";
import cx from "clsx";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { PhotoDTO } from "@/entities/photo/api/photo.interface";
import { placeQueries } from "@/entities/place/api/place.queries";

import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";
import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import Suspense from "@/shared/ui/Suspense";

import { useSelectedPhoto } from "../contexts/SelectedPhotoContext";

import styles from "./ThumbnailList.module.scss";

const INITIAL_DATA_MESSAGE = "__INITIAL_DATA__";

const ThumbnailList: React.FC = () => {
  const { placeId, photoId } = useParams<{ placeId: string; photoId: string }>();
  const { selectedPhoto, onChangeSelectedPhoto } = useSelectedPhoto();

  const { data: photoData } = useSuspenseQuery(
    placeQueries.getPhoto({ photoId: Number(photoId), placeId: Number(placeId) }),
  );

  const onClickThumbnail = (photo: PhotoDTO) => {
    onChangeSelectedPhoto(photo);
    window.history.replaceState(null, "", `/places/${placeId}/photos/${photo.photoId}`);
  };

  useLayoutEffect(() => {
    onChangeSelectedPhoto(photoData.data);
  }, [onChangeSelectedPhoto, photoData]);

  return (
    <InfiniteScroll.Suspense.Cursor.Vertical.Boundary
      query={{
        ...placeQueries.paginatePhotos(Number(placeId)),
        initialData: {
          pages: [
            {
              data: [photoData.data],
              total: 1,
              status: 200,
              message: INITIAL_DATA_MESSAGE,
              hasNext: true,
              hasPrev: true,
              nextCursor: photoData.data.photoId,
              prevCursor: photoData.data.photoId,
            },
          ],
          pageParams: [{ cursor: photoData.data.photoId, prev: false }],
        },
      }}
    >
      {({ data, isFetchingPreviousPage, isFetchingNextPage, ...queryInfo }) => (
        <InfiniteScroll.Suspense.Cursor.Vertical.Container
          className={styles.container}
          data={data}
          isFetchingPreviousPage={isFetchingPreviousPage}
          isFetchingNextPage={isFetchingNextPage}
          elementType="div"
          {...queryInfo}
        >
          <ul className={styles.wrapper}>
            {(isFetchingPreviousPage || data.meta.message === INITIAL_DATA_MESSAGE) &&
              range(10).map((value) => <Skeleton key={value} className={styles.photoWrapper} />)}
            {data.data.map((item) => (
              <li key={item.photoId} className={styles.photoWrapper}>
                <button type="button" className={styles.button} onClick={() => onClickThumbnail(item)}>
                  <FallbackHandlerImage
                    fill
                    src={item.imageUrl}
                    fallbackSrc="/images/fallback.png"
                    alt={`${item.photoId} 사진`}
                    className={cx(styles.photo, { [styles.active]: item.photoId === selectedPhoto?.photoId })}
                  />
                </button>
              </li>
            ))}
            {(isFetchingPreviousPage || data.meta.message === INITIAL_DATA_MESSAGE) &&
              range(10).map((value) => <Skeleton key={value} className={styles.photoWrapper} />)}
          </ul>
        </InfiniteScroll.Suspense.Cursor.Vertical.Container>
      )}
    </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
  );
};

export default Suspense.with(ThumbnailList, {
  fallback: (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {range(10).map((value) => (
          <Skeleton key={value} className={styles.photoWrapper} />
        ))}
      </div>
    </div>
  ),
});
