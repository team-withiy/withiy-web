import cx from "clsx";

import Header from "@/widgets/Layout/ui/Header";

import BackButton from "@/shared/ui/BackButton";

import ReviewList from "./ReviewList";
import { IconArrowLeft24 } from "public/icons";

import styles from "./PlaceReviewPage.module.scss";

const PlaceReviewPage: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header className={cx(styles.header, styles.placeReviewHeader)}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 />
        </BackButton>
        <h2 className={styles.title}>리뷰</h2>
      </Header>
      <ReviewList />
    </main>
  );
};

export default PlaceReviewPage;
