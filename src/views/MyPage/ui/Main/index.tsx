import { Suspense } from "react";

import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/FetchBoundary";

import Info from "./Info";
import { IconSettings24 } from "public/icons";

import styles from "./MyPage.module.scss";

const MyPage: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header className={styles.header}>
        <h2 className={styles.title}>마이페이지</h2>
        <IconSettings24 className={styles.settingButton} />
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <FetchBoundary fetchFunctions={[getMeApi]}>{([{ data: me }]) => <Info me={me} />}</FetchBoundary>
      </Suspense>
      <BottomNavigation currentHref="/my-page" />
    </main>
  );
};

export default withAuthorizationRoute(MyPage, { requiredAuth: true });
