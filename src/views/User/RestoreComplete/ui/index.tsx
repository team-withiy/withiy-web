import Link from "next/link";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconCharacterHeart } from "public/icons";

import styles from "./RestoreCompletePage.module.scss";

const RestorePage: React.FC = () => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <h2 className={styles.title}>계정 복구</h2>
        </Header>
        <section className={styles.content}>
          <IconCharacterHeart />
          <p className={styles.description}>
            위디에 다시 돌아왔어요 🎉
            <br />
            <span className={styles.small}>잊고 있던 추억부터, 새로운 시간까지 함께해요</span>
          </p>
        </section>
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

export default withAuthorizationRoute(RestorePage, { requiredAuth: true });
