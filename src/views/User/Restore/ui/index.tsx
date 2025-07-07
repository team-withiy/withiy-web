import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import RestoreUserButton from "./RestoreUserButton";
import { IconCharacterQuestion } from "public/icons";

import styles from "./RestorePage.module.scss";

const RestorePage: React.FC = () => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <h2 className={styles.title}>계정 복구</h2>
        </Header>
        <section className={styles.content}>
          <IconCharacterQuestion />
          <p className={styles.description}>
            또 오셨네요!
            <br />
            계정 복구가 필요하신가요?
          </p>
        </section>
        <RestoreUserButton />
      </main>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(RestorePage, { isRestorePage: true, requiredAuth: true });
