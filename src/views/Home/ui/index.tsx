import { Suspense } from "react";

import CategoryList, { LoadingCategoryList } from "@/widgets/CategoryList/ui";
import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import GNB from "@/widgets/Layout/ui/GNB";

import RequireAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireAuthorizationWrapper";

import { getCategoriesApi } from "@/entities/category/api/category.server";
import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";
import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/FetchBoundary";

import Test from "./Test";

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
        >
          <ScheduleCard />
        </RequireAuthorizationWrapper>
        <Suspense fallback={<LoadingCategoryList />}>
          <FetchBoundary fetchFunctions={[getCategoriesApi]}>
            {([categories]) => <CategoryList categories={categories.data} />}
          </FetchBoundary>
        </Suspense>
        <Suspense>
          <FetchBoundary fetchFunctions={[getMeApi]}>
            {([{ data: me }]) => (
              <>
                {me && (
                  <>
                    {me.nickname}님 환영합니당 <Test />
                  </>
                )}
              </>
            )}
          </FetchBoundary>
        </Suspense>
      </div>
      <BottomNavigation />
    </main>
  );
}

export default Home;
