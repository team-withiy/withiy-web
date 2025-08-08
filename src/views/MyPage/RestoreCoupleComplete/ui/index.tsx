"use client";

import Link from "next/link";

import { josa } from "es-hangul";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { userQueries } from "@/entities/user/api/user.queries";
import { hasUserCouple } from "@/entities/user/models/hasCouple";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import SuspenseQueryBoundary from "@/shared/ui/Boundary/SuspenseQueryBoundary";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconHeart } from "public/icons";

import styles from "./RestoreCoupleCompletePage.module.scss";

const RestoreCoupleCompletePage: React.FC = () => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <h2 className={styles.title}>계정 복구</h2>
        </Header>
        <section className={styles.content}>
          <IconHeart />
          <SuspenseQueryBoundary queries={[userQueries.getMe]}>
            {([{ data: me }]) => (
              <p className={styles.description}>
                {hasUserCouple(me.data) && josa(me.data.couple.partnerNickname, "와/과")} 다시 연결되었어요 🎉
                <br />
                <span className={styles.small}>다시 데이트 여정을 쌓아봐요</span>
              </p>
            )}
          </SuspenseQueryBoundary>
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

export default withAuthorizationRoute(RestoreCoupleCompletePage, { requiredAuth: true, requiredCouple: true });
