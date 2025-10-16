"use client";

import { useParams } from "next/navigation";

import { placeQueries } from "@/entities/place/api/place.queries";

import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import Suspense from "@/shared/ui/Suspense";

import styles from "./PhotoList.module.scss";

const PhotoList: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();

  return (
    <InfiniteScroll.Suspense.Cursor.Vertical.Boundary query={placeQueries.paginatePhotos(Number(placeId))}>
      {({ data, ...queryInfo }) => (
        <InfiniteScroll.Suspense.Cursor.Vertical.Container data={data} {...queryInfo} elementType="ul" isElementRoot>
          {data.data.map((photo) => (
            <li className={styles.item} key={photo.photoId}>
              <img src={photo.imageUrl} alt={`Photo ${photo.photoId}`} className={styles.image} />
            </li>
          ))}
        </InfiniteScroll.Suspense.Cursor.Vertical.Container>
      )}
    </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
  );
};

export default Suspense.with(PhotoList, { fallback: <>LOADING</> });
