import { Suspense } from "react";

import BottomNavigation from "@/widgets/layout/ui/BottomNavigation";
import GNB from "@/widgets/layout/ui/GNB";

import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";

import CategoryList, { LoadingCategoryList } from "./CategoryList";

import styles from "./index.module.scss";

export default async function Home() {
  return (
    <main className={styles.wrapper}>
      <GNB />
      <div className={styles.top}>
        <ScheduleCard />
        <Suspense fallback={<LoadingCategoryList />}>
          <CategoryList />
        </Suspense>
      </div>
      <BottomNavigation />
    </main>
  );
}
