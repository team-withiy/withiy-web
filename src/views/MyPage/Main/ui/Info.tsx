"use client";

import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

import RequireCoupleAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireCoupleAuthorizationWrapper";

import { userQueries } from "@/entities/user/api/user.queries";
import { hasUserCoupleWithFirstMetDate } from "@/entities/user/models/hasCouple";

import { DEFAULT_PROFILE_IMAGE_SRC } from "@/shared/constants/image";
import { formatDate } from "@/shared/lib/date";
import FallbackHandlerImage from "@/shared/ui/Image/FallbackHandlerImage";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import { IconChevronRight20 } from "public/icons";

import styles from "./Info.module.scss";

const Info: React.FC = () => {
  const { data: me } = useSuspenseQuery(userQueries.getMe).data;

  return (
    <section className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <FallbackHandlerImage
          src={me.thumbnail}
          className={styles.thumbnail}
          alt={`${me.nickname}의 썸네일 이미지`}
          fallbackSrc={DEFAULT_PROFILE_IMAGE_SRC}
          width={Number(styles.thumbnailSize)}
          height={Number(styles.thumbnailSize)}
        />
        <span className={styles.name} aria-label="내 닉네임">
          {me.nickname}
        </span>
        <RequireCoupleAuthorizationWrapper
          hasBottomSheet={false}
          fallback={
            <Link
              key="connect-couple-badge"
              href="/my-page/couples/unconnected/connect"
              data-testid="connect-couple-badge"
              className={styles.badge}
            >
              커플 연결하기
              <IconChevronRight20 className={styles.chevronRight} />
            </Link>
          }
        >
          <button type="button" className={styles.badge} data-testid="couple-badge">
            위디 커플
            <IconChevronRight20 className={styles.chevronRight} />
          </button>
        </RequireCoupleAuthorizationWrapper>
      </div>
      <RequireCoupleAuthorizationWrapper
        fallback={
          <div key="catch-phrase" className={styles.catchPhrase}>
            커플 연동 후 둘만의 이야기를 기록해보세요!
          </div>
        }
        hasBottomSheet={false}
      >
        <div className={styles.catchPhrase}>
          {!hasUserCoupleWithFirstMetDate(me) && "처음 만난 날을 작성해 주세요."}
          {hasUserCoupleWithFirstMetDate(me) && (
            <>
              처음 만난 날은
              <time className={styles.firstMetDate} dateTime={me.couple.firstMetDate}>
                {formatDate(me.couple.firstMetDate, "YYYY년 MM월 DD일")}
              </time>
              입니다.
            </>
          )}
        </div>
      </RequireCoupleAuthorizationWrapper>
    </section>
  );
};

const LoadingInfo: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <Skeleton circle width={80} height={80} containerClassName={styles.thumbnail} />
        <Skeleton width={120} containerClassName={styles.name} />
        <div className={styles.badge}>
          <Skeleton width={40} />
          <IconChevronRight20 className={styles.chevronRight} />
        </div>
      </div>
      <Skeleton width="100%" />
    </section>
  );
};

export default SSRSafeSuspense.with(Info, { fallback: <LoadingInfo /> });
