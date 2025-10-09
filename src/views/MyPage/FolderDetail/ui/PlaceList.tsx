"use client";

import { useParams } from "next/navigation";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import PlaceItem from "@/widgets/PlaceItem/ui";

import EmptyBookmark from "@/entities/bookmark/ui/EmptyBookmark";
import { folderQueries } from "@/entities/folder/api/folder.queries";

import Button from "@/shared/ui/Button/Button";
import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import styles from "./PlaceList.module.scss";

// TODO: 데이트 일정 만들기 버튼 기능 구현 필요
const PlaceList: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();

  return (
    <InfiniteScroll.Suspense.Cursor.Vertical.Boundary query={folderQueries.paginateFolderPlaces(Number(folderId))}>
      {({ data, ...queryInfo }) => (
        <InfiniteScroll.EmptyBoundary fallback={<EmptyBookmark type="folder" />}>
          <Button type="button" size={36} full variant="outline" className={styles.createDatePlanButton}>
            데이트 일정 만들기
          </Button>
          <InfiniteScroll.Suspense.Cursor.Vertical.Container
            data={data}
            elementType="ul"
            rootMargin="300px"
            isElementRoot
            className={styles.wrapper}
            throwOnEmpty
            loadingElements={range(10).map((value) => (
              <Skeleton containerClassName={styles.loadingContainer} className={styles.loading} key={value} />
            ))}
            {...queryInfo}
          >
            {data.data.map((place) => (
              <PlaceItem className={styles.item} place={place} key={place.placeId} />
            ))}
          </InfiniteScroll.Suspense.Cursor.Vertical.Container>
        </InfiniteScroll.EmptyBoundary>
      )}
    </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
  );
};

export default SSRSafeSuspense.with(PlaceList, {
  fallback: (
    <>
      <Button type="button" size={36} full variant="outline" className={styles.createDatePlanButton} disabled>
        데이트 일정 만들기
      </Button>
      <ul className={styles.wrapper}>
        {range(10).map((value) => (
          <Skeleton containerClassName={styles.loadingContainer} className={styles.loading} key={value} />
        ))}
      </ul>
    </>
  ),
});
