import { Suspense } from "react";

import CategoryList, { LoadingCategoryList } from "@/widgets/CategoryList/ui";
import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import GNB from "@/widgets/Layout/ui/GNB";

import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";

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
