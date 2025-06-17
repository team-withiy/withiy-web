import Header from "@/widgets/Layout/ui/Header";

import ConnectCoupleForm from "@/features/connectCouple/ui/ConnectCoupleForm";
import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import BackButton from "@/shared/ui/BackButton";

import { IconArrowLeft24 } from "public/icons";

import styles from "./OurStartPage.module.scss";

interface Props {
  params: Promise<{ partnerCode: string }>;
}

const OurStartPage: React.FC<Props> = async ({ params }) => {
  const partnerCode = (await params).partnerCode;

  return (
    <main className={styles.wrapper}>
      <Header className={styles.header}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 />
        </BackButton>
        <h2 className={styles.title}>우리의 시작</h2>
      </Header>
      <ConnectCoupleForm partnerCode={partnerCode} />
    </main>
  );
};

export default withAuthorizationRoute(OurStartPage, { requiredAuth: true, requiredCouple: false });
