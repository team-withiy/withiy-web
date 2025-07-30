import Link from "next/link";
import { redirect } from "next/navigation";

import { josa } from "es-hangul";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getUserProfileByCodeApi } from "@/entities/user/api/user.server";

import { DEFAULT_PROFILE_IMAGE_SRC } from "@/shared/constants/image";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import BlurImage from "@/shared/ui/Image/BlurImage";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import styles from "./CoupleInvitationPage.module.scss";

interface Props {
  params: Promise<{ partnerCode: string }>;
}

const CoupleInvitationPage: React.FC<Props> = async ({ params }) => {
  const partnerCode = (await params)?.partnerCode;

  const { data } = await getUserProfileByCodeApi(partnerCode);
  if (!data || data.hasCouple) redirect("/");

  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <h2 className={styles.title}>커플 초대장</h2>
        </Header>
        <section className={styles.content}>
          <p className={styles.description}>
            {josa(data.nickname, "이/가")} 초대했어요!
            <br />
            <small className={styles.small}>함께 커플 공간을 만들고 추억을 공유할까요?</small>
          </p>
          <BlurImage
            src={data.profileImageUrl}
            alt={`${data.nickname}의 프로필 이미지`}
            className={styles.image}
            fallbackProps={{
              src: DEFAULT_PROFILE_IMAGE_SRC,
              alt: "기본 프로필 이미지",
              width: 180,
              height: 180,
            }}
          />
        </section>
        <BottomFloatingButtonWrapper hasTwoButtons>
          <Link href={`/couples/our-start/${partnerCode}`} className={styles.link}>
            <Button size={52} full variant="default" type="button">
              함께할게요
            </Button>
          </Link>
          <Link href="/" replace className={styles.link}>
            <Button size={52} full variant="text" type="button">
              나중에 할게요
            </Button>
          </Link>
        </BottomFloatingButtonWrapper>
      </main>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(CoupleInvitationPage, { requiredAuth: true, requiredCouple: false });
