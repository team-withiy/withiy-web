import { Suspense } from "react";

import CategoryList, { LoadingCategoryList } from "@/widgets/CategoryList/ui";
import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import GNB from "@/widgets/Layout/ui/GNB";

import RequireAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireAuthorizationWrapper";
import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getCategoriesApi } from "@/entities/category/api/category.server";
import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";

import FetchBoundary from "@/shared/ui/Boundary/FetchBoundary";

import styles from "./index.module.scss";

async function Home() {
  return (
    <main className={styles.wrapper}>
      <GNB />
      <div className={styles.top}>
        <RequireAuthorizationWrapper
          fallbackWrapperClassName={styles.requireAuthorizationWrapper}
          fallback={<ScheduleCard />}
          callbackUrl="/test"
          hasBottomSheet
        >
          <ScheduleCard />
        </RequireAuthorizationWrapper>
        <Suspense fallback={<LoadingCategoryList />}>
          <FetchBoundary fetchFunctions={[getCategoriesApi]}>
            {([categories]) => <CategoryList categories={categories.data} />}
          </FetchBoundary>
        </Suspense>
      </div>
      <BottomNavigation currentHref="/" />
    </main>
  );
}

export default withAuthorizationRoute(Home, {});
