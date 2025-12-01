import Header from "./Header";
import ReportForm from "./ReportForm";

import styles from "./PlaceReportPage.module.scss";

interface Props {
  params: Promise<{ placeId: number }>;
}

const PlaceReportPage: React.FC<Props> = async ({ params }) => {
  const { placeId } = await params;

  return (
    <main className={styles.wrapper}>
      <Header />
      <ReportForm placeId={placeId} />
    </main>
  );
};

export default PlaceReportPage;
