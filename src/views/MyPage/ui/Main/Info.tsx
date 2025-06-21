import RequireCoupleAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireCoupleAuthorizationWrapper";

import type { UserDTO } from "@/entities/user/api/user.interface";

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
            <>
              커플 연결하기
              <IconChevronRight20 className={styles.chevronRight} />
            </>
          }
        >
          <button type="button" className={styles.badge}>
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
          처음 만난 날은 {me.hasCouple && formatDate(me.couple.firstMetDate, "yyyy년 MM월 dd일")} 입니다.
        </div>
      </RequireCoupleAuthorizationWrapper>
    </section>
  );
};

export default Info;
