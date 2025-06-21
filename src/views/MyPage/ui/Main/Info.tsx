import type { UserDTO } from "@/entities/user/api/user.interface";

import { DEFAULT_PROFILE_IMAGE_SRC } from "@/shared/constants/image";
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
        <button type="button" className={styles.badge} aria-label="내 닉네임">
          {me.nickname}
          <IconChevronRight20 className={styles.chevronRight} />
        </button>
      </div>
      <div className={styles.catchPhrase}>커플 연동 후 둘만의 이야기를 기록해보세요!</div>
    </section>
  );
};

export default Info;
