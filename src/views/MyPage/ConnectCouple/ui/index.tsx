import { Suspense } from "react";

import Header from "@/widgets/Layout/ui/Header";

import CopyCoupleLinkButton, { LoadingCopyCoupleLinkButton } from "@/features/copyCoupleLink/ui/CopyCoupleLinkButton";
import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getMeApi } from "@/entities/user/api/user.server";

import BackButton from "@/shared/ui/BackButton";
import FetchBoundary from "@/shared/ui/Boundary/FetchBoundary";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconCharacterInvite, IconLetter } from "public/icons";

import styles from "./ConnectCouplePage.module.scss";

const ConnectCouplePage: React.FC = () => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <BackButton className={styles.backButton}>
            <IconLetter />
          </BackButton>
          <h2 className={styles.title}>커플 연결</h2>
        </Header>
        <section className={styles.content}>
          <IconCharacterInvite />
          <p className={styles.description}>
            연인이 링크를 클릭하면
            <br />
            자동으로 연결돼요!
          </p>
        </section>
      </main>
      <Suspense fallback={<LoadingCopyCoupleLinkButton />}>
        <FetchBoundary fetchFunctions={[getMeApi]}>
          {([{ data: me }]) => <CopyCoupleLinkButton code={me.code} />}
        </FetchBoundary>
      </Suspense>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(ConnectCouplePage, { requiredAuth: true, requiredCouple: false });
