import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import GNB from "@/widgets/Layout/ui/GNB";

import RequireAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireAuthorizationWrapper";
import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";

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
      </div>
      <BottomNavigation currentHref="/" />
    </main>
  );
}

export default withAuthorizationRoute(Home, {});
