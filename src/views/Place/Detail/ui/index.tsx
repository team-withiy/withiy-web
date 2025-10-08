import cx from "clsx";

import PlaceCarousel from "@/widgets/PlaceCarousel/ui";
import PlaceCarouselImage from "@/widgets/PlaceCarousel/ui/PlaceCarouselImage";
import PlaceInfo from "@/widgets/PlaceInfo/ui/PlaceInfo.server";
import PreviewReview from "@/widgets/PreviewReview/ui";

import { getPlaceDetailApi } from "@/entities/place/api/place.server";
import { convertPlaceDetailToSummary } from "@/entities/place/models/place";

import Header from "./Header";

import styles from "./PlaceDetailPage.module.scss";

interface Props {
  params: Promise<{ placeId: number }>;
}

const PlaceDetailPage: React.FC<Props> = async ({ params }) => {
  const { placeId } = await params;
  const { data } = await getPlaceDetailApi(placeId);

  return (
    <main className={styles.wrapper}>
      <Header title={data.placeName} />
      <PlaceCarousel totalPhotos={data.photos.length} clickPath={`/places/${placeId}/photos`}>
        {data.photos.map((photo) => (
          <PlaceCarouselImage key={photo.photoId} photo={photo} />
        ))}
      </PlaceCarousel>
      <PlaceInfo place={convertPlaceDetailToSummary(data)} className={styles.section} />
      {data.reviews.length > 0 && (
        <section className={cx(styles.section, styles.reviewSection)}>
          <h2 className={styles.title}>리뷰</h2>
          <PreviewReview reviews={data.reviews} moreHref={`/places/${placeId}/reviews`} />
        </section>
      )}
    </main>
  );
};

export default PlaceDetailPage;
