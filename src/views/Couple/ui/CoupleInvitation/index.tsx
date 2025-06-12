import { redirect } from "next/navigation";

import Header from "@/widgets/Layout/ui/Header";

import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";

import { getUserProfileByCodeApi } from "@/entities/user/api/user.server";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import BlurImage from "@/shared/ui/Image/BlurImage";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import styles from "./CoupleInvitationPage.module.scss";

interface Props {
  searchParams: Promise<{ code: string }>;
}

const CoupleInvitationPage: React.FC<Props> = async ({ searchParams }) => {
  const code = (await searchParams)?.code;
  if (!code) redirect("/");

  const { data } = await getUserProfileByCodeApi(code);
  if (!data || data.hasCouple) redirect("/");

  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <h2 className={styles.title}>커플 초대장</h2>
        </Header>
        <section className={styles.content}>
          <p className={styles.description}>
            {data.nickname}이 초대했어요!
            <br />
            <small className={styles.small}>함께 커플 공간을 만들고 추억을 공유할까요?</small>
          </p>
          <BlurImage
            src={data.profileImageUrl}
            alt={`${data.nickname}의 프로필 이미지`}
            className={styles.image}
            fallbackProps={{
              src: "/images/default-profile.png",
              alt: "기본 프로필 이미지",
              width: 180,
              height: 180,
            }}
          />
        </section>
        <BottomFloatingButtonWrapper hasTwoButtons>
          <Button size={52} full variant="default">
            함께할게요
          </Button>
          <Button size={52} full variant="default">
            함께할게요
          </Button>
        </BottomFloatingButtonWrapper>
      </main>
      <AuthorizationRouteHandler requiredAuth />
    </DvhHeightLayout>
  );
};

export default CoupleInvitationPage;
