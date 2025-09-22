import Header from "@/widgets/Layout/ui/Header";

import BackButton from "@/shared/ui/BackButton";
import Button from "@/shared/ui/Button/Button";

import PlaceList from "./PlaceList";
import PlaceTotalCount from "./PlaceTotalCount";
import { IconArrowLeft24 } from "public/icons";

import styles from "./AllPlacesFolderDetailPage.module.scss";

// TODO: 데이트 일정 만들기 버튼 기능 구현 필요
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
      <Button type="button" size={36} full variant="outline" className={styles.createDatePlanButton}>
        데이트 일정 만들기
      </Button>
      <PlaceList />
    </main>
  );
};

export default AllPlacesFolderDetailPage;
