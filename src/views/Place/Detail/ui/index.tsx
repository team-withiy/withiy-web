import PlaceCarousel from "@/widgets/PlaceCarousel/ui";
import PlaceCarouselImage from "@/widgets/PlaceCarousel/ui/PlaceCarouselImage";

import { getPlaceDetailApi } from "@/entities/place/api/place.server";

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
      <PlaceCarousel totalPhotos={data.photos.length}>
        {data.photos.map((photo) => (
          <PlaceCarouselImage key={photo.imageUrl} photo={photo} />
        ))}
      </PlaceCarousel>
    </main>
  );
};

export default PlaceDetailPage;
