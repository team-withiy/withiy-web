import { Suspense } from "react";

import CategoryList, { LoadingCategoryList } from "@/widgets/CategoryList/ui";
import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import GNB from "@/widgets/Layout/ui/GNB";

import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";

import { getCategoriesApi } from "@/entities/category/api/category.server";
import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";
import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/FetchBoundary";

import styles from "./index.module.scss";

export default async function Home() {
  const data = await getMeApi();

  return (
    <main className={styles.wrapper}>
      <GNB />
      {JSON.stringify(data)}
      <div className={styles.top}>
        <ScheduleCard />
        <Suspense fallback={<LoadingCategoryList />}>
          <FetchBoundary fetchFunctions={[getCategoriesApi]}>
            {([categories]) => <CategoryList categories={categories.data} />}
          </FetchBoundary>
        </Suspense>
      </div>
      <BottomNavigation />
      <AuthorizationRouteHandler />
    </main>
  );
}
