import { Suspense } from "react";

import Link from "next/link";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import Header from "@/widgets/Layout/ui/Header";

import { getPlaceDetailApi } from "@/entities/place/api/place.server";

import BackButton from "@/shared/ui/BackButton";
import FetchBoundary from "@/shared/ui/Boundary/FetchBoundary";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import Photo from "./Photo";
import ThumbnailList from "./ThumbnailList";
import { SelectedPhotoContextProvider } from "../contexts/SelectedPhotoContext";
import { IconArrowLeft24 } from "public/icons";

import styles from "./PlacePhotoDetailPage.module.scss";

interface Props {
  params: Promise<{ placeId: number; photoId: number }>;
}

const PlacePhotoDetailPage: React.FC<Props> = async ({ params }) => {
  const { placeId } = await params;

  return (
    <SelectedPhotoContextProvider>
      <DvhHeightLayout dvh={100} heightType="height">
        <main className={styles.wrapper}>
          <Header className={cx(styles.header, styles.placePhotoDetailHeader)}>
            <BackButton className={styles.backButton}>
              <IconArrowLeft24 />
            </BackButton>
            <Suspense fallback={<Skeleton width={200} />}>
              <FetchBoundary fetchFunctions={[() => getPlaceDetailApi(placeId)]}>
                {([{ data }]) => <h2 className={styles.title}>{data.placeName}</h2>}
              </FetchBoundary>
            </Suspense>
            <Link href="todo" className={styles.reportLink}>
              신고
            </Link>
          </Header>
          <Photo />
          <ThumbnailList />
        </main>
      </DvhHeightLayout>
    </SelectedPhotoContextProvider>
  );
};

export default PlacePhotoDetailPage;
