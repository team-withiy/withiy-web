import { Suspense } from "react";

import CategoryList, { LoadingCategoryList } from "@/widgets/CategoryList/ui";
import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import GNB from "@/widgets/Layout/ui/GNB";

import AuthorizationRouteHandler from "@/features/handleAuthorizationRoute/ui/AuthorizationRouteHandler";

import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";
import { getMeApi } from "@/entities/user/api/user.server";

import styles from "./index.module.scss";

// https://velog.io/@haryan248/server-component-with-dx fetchBoundary 작업
export default async function Home() {
  const data = await getMeApi();

  return (
    <Suspense fallback={<>LOADING...</>}>
      <AuthorizationRouteHandler>
        <main className={styles.wrapper}>
          <GNB />
          {JSON.stringify(data)}
          <div className={styles.top}>
            <ScheduleCard />
            <Suspense fallback={<LoadingCategoryList />}>
              <CategoryList />
            </Suspense>
          </div>
          <BottomNavigation />
        </main>
      </AuthorizationRouteHandler>
    </Suspense>
  );
}
