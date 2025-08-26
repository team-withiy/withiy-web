"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { folderQueries } from "@/entities/folder/api/folder.queries";

import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import { IconHeart16 } from "public/icons";

import styles from "./PlaceList.module.scss";

interface Props {
  placeId: number;
}

const PlaceList: React.FC<Props> = ({ placeId }) => {
  const { data } = useSuspenseQuery(folderQueries.getPlaceFolders(placeId));

  return (
    <ul className={styles.wrapper}>
      {data.data.map((folder) => (
        <li className={styles.item} key={folder.id}>
          <div className={styles.info}>
            <div className={styles.color} style={{ backgroundColor: folder.color }} />
          </div>
          <span className={styles.name}>{folder.name}</span>
          <span className={styles.count}>{folder.bookmarkCount}</span>
          <button type="button">
            <IconHeart16 className={cx(styles.icon, { [styles.active]: folder.bookmarked })} />
          </button>
        </li>
      ))}
    </ul>
  );
};

const LoadingPlaceList: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.item} />
      <Skeleton className={styles.item} />
      <Skeleton className={styles.item} />
    </div>
  );
};

export default SSRSafeSuspense.with(PlaceList, {
  fallback: <LoadingPlaceList />,
});
