import { Suspense } from "react";

import Header from "@/widgets/Layout/ui/Header";

import BackButton from "@/shared/ui/BackButton";

import Content from "./Content";
import TabBar from "./TabBar";
import { IconArrowLeft24 } from "public/icons";

import styles from "./BookmarkPage.module.scss";

const BookmarkPage: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header className={styles.header}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 />
        </BackButton>
        <h2 className={styles.title}>저장한 장소/코스</h2>
      </Header>
      <Suspense fallback={null}>
        <TabBar />
      </Suspense>
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </main>
  );
};

export default BookmarkPage;
