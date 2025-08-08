"use client";

import { josa } from "es-hangul";
import Skeleton from "react-loading-skeleton";

import { userQueries } from "@/entities/user/api/user.queries";
import { hasUserCouple } from "@/entities/user/models/hasCouple";

import SuspenseQueryBoundary from "@/shared/ui/Boundary/SuspenseQueryBoundary";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import { IconHeart } from "public/icons";

import styles from "./Content.module.scss";

const Content: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <IconHeart />
      <SSRSafeSuspense fallback={<Skeleton count={2} width={200} height={24} className={styles.descriptionSkeleton} />}>
        <SuspenseQueryBoundary queries={[userQueries.getMe]}>
          {([{ data: me }]) => (
            <p className={styles.description}>
              {hasUserCouple(me.data) && josa(me.data.couple.partnerNickname, "와/과")} 다시 연결되었어요 🎉
              <br />
              <span className={styles.small}>다시 데이트 여정을 쌓아봐요</span>
            </p>
          )}
        </SuspenseQueryBoundary>
      </SSRSafeSuspense>
    </section>
  );
};

export default Content;
