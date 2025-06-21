import Link from "next/link";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";
import SetCoupleFirstMetDateForm from "@/features/setCoupleFirstMetDate/ui/SetCoupleFirstMetDateForm";

import { getMeApi } from "@/entities/user/api/user.server";
import { hasUserCouple } from "@/entities/user/models/hasCouple";

import BackButton from "@/shared/ui/BackButton";
import UnderlineButton from "@/shared/ui/Button/UnderlineButton";
import FetchBoundary from "@/shared/ui/FetchBoundary";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconArrowLeft24 } from "public/icons";

import styles from "./ConnectedCouplePage.module.scss";

// TODO: 테스트 코드
const ConnectedCouplePage: React.FC = () => {
  return (
    <DvhHeightLayout dvh={100} heightType="height">
      <main className={styles.wrapper} data-testid="connected-couple-page">
        <Header className={styles.header}>
          <BackButton className={styles.backButton}>
            <IconArrowLeft24 />
          </BackButton>
          <h2 className={styles.title}>커플 정보</h2>
        </Header>
        <FetchBoundary fetchFunctions={[getMeApi]}>
          {([{ data: me }]) => (
            <SetCoupleFirstMetDateForm firstMetDate={hasUserCouple(me) ? me.couple.firstMetDate : null} />
          )}
        </FetchBoundary>
        <Link href="/my-page/couples/connected/breakup" className={styles.breakupLink}>
          <UnderlineButton type="button" size={20}>
            커플 연결 끊기
          </UnderlineButton>
        </Link>
      </main>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(ConnectedCouplePage, { requiredAuth: true, requiredCouple: true });
