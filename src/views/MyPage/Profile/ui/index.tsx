import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import BackButton from "@/shared/ui/BackButton";

import UpdateProfileForm from "./UpdateProfileForm";
import { IconArrowLeft24 } from "public/icons";

import styles from "./ProfilePage.module.scss";

const ProfilePage: React.FC = () => {
  return (
    <main className={styles.wrapper} data-testid="profile-page">
      <Header className={styles.header}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 data-testid="arrow-left-icon" />
        </BackButton>
        <h1 className={styles.title} data-testid="title">
          프로필 설정
        </h1>
      </Header>
      <UpdateProfileForm />
    </main>
  );
};

export default withAuthorizationRoute(ProfilePage, { requiredAuth: true });
