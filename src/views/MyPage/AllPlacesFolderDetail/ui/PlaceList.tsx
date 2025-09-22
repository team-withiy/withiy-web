"use client";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import EmptyBookmark from "@/widgets/EmptyBookmark/ui";
import PlaceItem from "@/widgets/PlaceItem/ui";

import { folderQueries } from "@/entities/folder/api/folder.queries";

import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import styles from "./PlaceList.module.scss";

const PlaceList: React.FC = () => {
  return (
    <InfiniteScroll.EmptyBoundary fallback={<EmptyBookmark type="folder" />}>
      <InfiniteScroll.Suspense.Cursor.Vertical
        elementType="ul"
        query={folderQueries.paginateBookmarkedPlaces}
        isElementRoot
        rootMargin="300px"
        throwOnEmpty
        className={styles.wrapper}
        loadingElements={range(10).map((value) => (
          <Skeleton containerClassName={styles.loadingContainer} className={styles.loading} key={value} />
        ))}
      >
        {({ data }) =>
          data.data.map((place) => <PlaceItem className={styles.item} place={place} key={place.placeId} />)
        }
      </InfiniteScroll.Suspense.Cursor.Vertical>
    </InfiniteScroll.EmptyBoundary>
  );
};

export default SSRSafeSuspense.with(PlaceList, {
  fallback: (
    <ul className={styles.wrapper}>
      {range(10).map((value) => (
        <Skeleton containerClassName={styles.loadingContainer} className={styles.loading} key={value} />
      ))}
    </ul>
  ),
});
