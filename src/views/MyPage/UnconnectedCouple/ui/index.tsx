import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getMeApi } from "@/entities/user/api/user.server";

import BackButton from "@/shared/ui/BackButton";
import FetchBoundary from "@/shared/ui/Boundary/FetchBoundary";
import ChevronLink from "@/shared/ui/ChevronLink";

import RestoreCoupleLink from "./RestoreCoupleLink";
import { IconArrowLeft24 } from "public/icons";

import styles from "./UnconnectedCouplePage.module.scss";

const UnconnectedCouplePage: React.FC = () => {
  return (
    <main className={styles.wrapper} data-testid="unconnected-couple-page">
      <Header className={styles.header}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 />
        </BackButton>
        <h2 className={styles.title}>커플 정보</h2>
      </Header>
      <ChevronLink href="/my-page/couples/unconnected/connect">커플 연결하기</ChevronLink>
      <FetchBoundary fetchFunctions={[getMeApi]}>{([{ data: me }]) => <RestoreCoupleLink me={me} />}</FetchBoundary>
    </main>
  );
};

export default withAuthorizationRoute(UnconnectedCouplePage, { requiredAuth: true, requiredCouple: false });
