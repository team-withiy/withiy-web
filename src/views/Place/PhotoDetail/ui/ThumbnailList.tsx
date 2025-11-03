"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import { placeQueries } from "@/entities/place/api/place.queries";

import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";

import styles from "./ThumbnailList.module.scss";

const ThumbnailList: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();

  return (
    <InfiniteScroll.Suspense.Cursor.Horizontal.Boundary query={placeQueries.paginatePhotos(Number(placeId))}>
      {({ data, ...queryInfo }) => (
        <InfiniteScroll.Suspense.Cursor.Horizontal.Container
          className={styles.wrapper}
          data={data}
          {...queryInfo}
          elementType="ul"
          isElementRoot
          loadingElements={range(10).map((i) => (
            <Skeleton key={i} width={100} height={100} />
          ))}
        >
          {data.data.map((photo) => (
            <li className={styles.item} key={photo.photoId}>
              <Image
                width={100}
                height={100}
                src={photo.imageUrl}
                alt={`Thumbnail ${photo.photoId}`}
                className={styles.image}
              />
            </li>
          ))}
        </InfiniteScroll.Suspense.Cursor.Horizontal.Container>
      )}
    </InfiniteScroll.Suspense.Cursor.Horizontal.Boundary>
  );
};

export default ThumbnailList;
