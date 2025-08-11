import Link from "next/link";

import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import GNB from "@/widgets/Layout/ui/GNB";

import RequireAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireAuthorizationWrapper";
import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import ScheduleCard from "@/entities/schedule/ui/ScheduleCard";

import Button from "@/shared/ui/Button/Button";

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
      <Link href="/places/10">
        <Button variant="default" type="button" size={52}>
          장소 상세 페이지
        </Button>
      </Link>
      <BottomNavigation currentHref="/" />
    </main>
  );
}

export default withAuthorizationRoute(Home, {});
