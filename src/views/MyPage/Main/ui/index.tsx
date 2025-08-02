import { Suspense } from "react";

import Link from "next/link";

import BottomNavigation from "@/widgets/Layout/ui/BottomNavigation";
import Header from "@/widgets/Layout/ui/Header";

import RequireCoupleAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireCoupleAuthorizationWrapper";
import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/Boundary/FetchBoundary";
import ChevronLink from "@/shared/ui/ChevronLink";

import Info, { LoadingInfo } from "./Info";
import { IconSettings24 } from "public/icons";

import styles from "./MyPage.module.scss";

const MyPage: React.FC = () => {
  return (
    <main className={styles.wrapper} data-testid="my-page">
      <Header className={styles.header}>
        <h2 className={styles.title}>마이페이지</h2>
        <Link href="/my-page/settings" data-testid="settings-button-link">
          <IconSettings24 className={styles.settingButton} />
        </Link>
      </Header>
      <Suspense fallback={<LoadingInfo />}>
        <FetchBoundary fetchFunctions={[getMeApi]}>{([{ data: me }]) => <Info me={me} />}</FetchBoundary>
      </Suspense>
      <nav className={styles.nav}>
        <ChevronLink href="/my-page/profile">프로필 설정</ChevronLink>
        <RequireCoupleAuthorizationWrapper
          fallback={<ChevronLink href="/my-page/couples/unconnected">커플 설정</ChevronLink>}
          hasBottomSheet={false}
        >
          <ChevronLink href="/my-page/couples/connected">커플 설정</ChevronLink>
        </RequireCoupleAuthorizationWrapper>
        <ChevronLink href="/my-page/bookmarks">저장한 장소/코스</ChevronLink>
      </nav>
      <BottomNavigation currentHref="/my-page" />
    </main>
  );
};

export default withAuthorizationRoute(MyPage, { requiredAuth: true });
