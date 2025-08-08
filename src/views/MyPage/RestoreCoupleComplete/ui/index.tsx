import Link from "next/link";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import Content from "./Content";

import styles from "./RestoreCoupleCompletePage.module.scss";

const RestoreCoupleCompletePage: React.FC = () => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <h2 className={styles.title}>계정 복구</h2>
        </Header>
        <Content />
        <BottomFloatingButtonWrapper>
          <Link href="/" className={styles.link}>
            <Button type="button" size={52} variant="default" full>
              위디 홈으로 바로가기
            </Button>
          </Link>
        </BottomFloatingButtonWrapper>
      </main>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(RestoreCoupleCompletePage, { requiredAuth: true, requiredCouple: true });
