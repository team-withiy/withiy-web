import { Suspense } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import Header from "@/widgets/Layout/ui/Header";

import { placeQueries } from "@/entities/place/api/place.queries";
import { getPlaceDetailApi } from "@/entities/place/api/place.server";

import BackButton from "@/shared/ui/BackButton";
import FetchBoundary from "@/shared/ui/Boundary/FetchBoundary";

import PhotoList from "./PhotoList";
import { IconArrowLeft24 } from "public/icons";

import styles from "./PlacePhotoPage.module.scss";

interface Props {
  params: Promise<{ placeId: number }>;
}

const PlacePhotoPage: React.FC<Props> = async ({ params }) => {
  const { placeId } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(placeQueries.paginatePhotos(placeId));

  return (
    <main className={styles.wrapper}>
      <Header className={cx(styles.header, styles.placePhotoHeader)}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 />
        </BackButton>
        <Suspense fallback={<Skeleton width={200} />}>
          <FetchBoundary fetchFunctions={[() => getPlaceDetailApi(placeId)]}>
            {([{ data }]) => <h2 className={styles.title}>{data.placeName}</h2>}
          </FetchBoundary>
        </Suspense>
      </Header>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PhotoList />
      </HydrationBoundary>
    </main>
  );
};

export default PlacePhotoPage;
