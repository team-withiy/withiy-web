import Link from "next/link";

import Header from "@/widgets/Layout/ui/Header";

import AuthorizationRouteHandler from "@/features/handleAuthorizationRoute/ui/AuthorizationRouteHandler";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconCharacterHeart } from "public/icons";

import styles from "./RestoreCompletePage.module.scss";

const RestorePage: React.FC = () => {
  return (
    <AuthorizationRouteHandler requiredAuth>
      <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
        <main className={styles.main}>
          <Header className={styles.header}>
            <h2 className={styles.title}>계정 복구</h2>
          </Header>
          <section className={styles.content}>
            <IconCharacterHeart />
            <p className={styles.description}>
              닉네임과 다시 연결되었어요 🎉
              <br />
              <span className={styles.small}>다시 데이트 여정을 쌓아봐요</span>
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
    </AuthorizationRouteHandler>
  );
};

export default RestorePage;
