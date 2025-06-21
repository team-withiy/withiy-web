import { Fragment } from "react";

import Skeleton from "react-loading-skeleton";

import RequireCoupleAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireCoupleAuthorizationWrapper";

import type { UserDTO } from "@/entities/user/api/user.interface";
import { hasUserCoupleWithFirstMetDate } from "@/entities/user/models/hasCouple";

import { DEFAULT_PROFILE_IMAGE_SRC } from "@/shared/constants/image";
import { formatDate } from "@/shared/lib/date";
import BlurImage from "@/shared/ui/Image/BlurImage";

import { IconChevronRight20 } from "public/icons";

import styles from "./Info.module.scss";

interface Props {
  me: UserDTO;
}

const Info: React.FC<Props> = ({ me }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <BlurImage
          src={me.thumbnail}
          className={styles.thumbnail}
          alt={`${me.nickname}의 썸네일 이미지`}
          fallbackProps={{ width: 80, height: 80, src: DEFAULT_PROFILE_IMAGE_SRC, alt: "기본 프로필 이미지" }}
        />
        <span className={styles.name} aria-label="내 닉네임">
          {me.nickname}
        </span>
        <RequireCoupleAuthorizationWrapper
          hasBottomSheet
          callbackUrl="/my-page"
          fallbackWrapperClassName={styles.badge}
          fallback={
            <Fragment data-testid="connect-couple-badge">
              커플 연결하기
              <IconChevronRight20 className={styles.chevronRight} />
            </Fragment>
          }
        >
          <button type="button" className={styles.badge} data-testid="couple-badge">
            위디 커플
            <IconChevronRight20 className={styles.chevronRight} />
          </button>
        </RequireCoupleAuthorizationWrapper>
      </div>
      <RequireCoupleAuthorizationWrapper
        fallback={<div className={styles.catchPhrase}>커플 연동 후 둘만의 이야기를 기록해보세요!1</div>}
        hasBottomSheet={false}
      >
        <div className={styles.catchPhrase}>
          {!hasUserCoupleWithFirstMetDate(me) && "처음 만난 날을 작성해 주세요."}
          {hasUserCoupleWithFirstMetDate(me) && (
            <>
              처음 만난 날은
              <time dateTime={me.couple.firstMetDate}>{formatDate(me.couple.firstMetDate, "yyyy년 MM월 dd일")}</time>
              입니다.
            </>
          )}
        </div>
      </RequireCoupleAuthorizationWrapper>
    </section>
  );
};

export default Info;

export const LoadingInfo: React.FC = () => {
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
