import PlaceCarousel from "@/widgets/PlaceCarousel/ui";

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
      <Header />
      <PlaceCarousel photos={data.photos} />
    </main>
  );
};

export default PlaceDetailPage;
