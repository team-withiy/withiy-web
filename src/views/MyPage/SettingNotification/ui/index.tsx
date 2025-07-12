import Header from "@/widgets/Layout/ui/Header";

import BackButton from "@/shared/ui/BackButton";

import { IconArrowLeft24 } from "public/icons";

import styles from "./SettingNotificationPage.module.scss";

const SettingNotificationPage: React.FC = () => {
  return (
    <main className={styles.wrapper} data-testid="setting-notification-page">
      <Header className={styles.header}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 data-testid="arrow-left-icon" />
        </BackButton>
        <h1 className={styles.title} data-testid="title">
          알림 설정
        </h1>
      </Header>
    </main>
  );
};

export default SettingNotificationPage;
