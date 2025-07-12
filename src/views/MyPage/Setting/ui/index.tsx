import Link from "next/link";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import BackButton from "@/shared/ui/BackButton";
import UnderlineButton from "@/shared/ui/Button/UnderlineButton";
import ChevronLink from "@/shared/ui/ChevronLink";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import LogoutButton from "./LogoutButton";
import { IconArrowLeft24 } from "public/icons";

import styles from "./SettingPage.module.scss";

const SettingPage: React.FC = () => {
  return (
    <DvhHeightLayout dvh={100} heightType="height">
      <main className={styles.wrapper} data-testid="profile-page">
        <Header className={styles.header}>
          <BackButton className={styles.backButton}>
            <IconArrowLeft24 data-testid="arrow-left-icon" />
          </BackButton>
          <h1 className={styles.title} data-testid="title">
            설정
          </h1>
        </Header>
        <nav className={styles.list}>
          <ChevronLink href="/my-page/settings/notifications" data-testid="notification-link">
            알림 설정
          </ChevronLink>
          <ChevronLink href="/my-page/settings/terms" data-testid="terms-link">
            이용약관
          </ChevronLink>
          <LogoutButton />
          <Link href="/my-page/settings/withdrawal" className={styles.withdrawalLink} data-testid="withdrawal-link">
            <UnderlineButton size={20} type="button">
              회원 탈퇴
            </UnderlineButton>
          </Link>
        </nav>
      </main>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(SettingPage, { requiredAuth: true });
