import Header from "@/widgets/Layout/ui/Header";

import BackButton from "@/shared/ui/BackButton";

import PlaceList from "./PlaceList";
import PlaceTotalCount from "./PlaceTotalCount";
import { IconArrowLeft24 } from "public/icons";

import styles from "./AllPlacesFolderDetailPage.module.scss";

const AllPlacesFolderDetailPage: React.FC = () => {
  return (
    <main className={styles.wrapper} data-testid="all-places-folder-detail-page">
      <Header className={styles.header}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 />
        </BackButton>
      </Header>
      <h1 className={styles.title} data-testid="all-places-folder-detail-page-title">
        저장한 모든 장소
        <PlaceTotalCount />
      </h1>
      <PlaceList />
    </main>
  );
};

export default AllPlacesFolderDetailPage;
