import { redirect } from "next/navigation";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getMeApi } from "@/entities/user/api/user.server";
import { hasUserRestorableCouple } from "@/entities/user/models/hasCouple";

import BackButton from "@/shared/ui/BackButton";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import RestoreCoupleButton from "./RestoreCoupleButton";
import { IconArrowLeft24, IconCharacterQuestion } from "public/icons";

import styles from "./RestoreCouplePage.module.scss";

const RestoreCouplePage: React.FC = async () => {
  const { data } = await getMeApi();
  if (!hasUserRestorableCouple(data)) redirect("/my-page/couples/unconnected");

  return (
    <DvhHeightLayout heightType="height" dvh={100}>
      <main className={styles.wrapper}>
        <Header className={styles.header}>
          <BackButton className={styles.backButton}>
            <IconArrowLeft24 />
          </BackButton>
          <h2 className={styles.title}>커플 복구</h2>
        </Header>
        <section className={styles.content}>
          <IconCharacterQuestion />
          <p className={styles.description}>
            또 오셨네요!
            <br />
            커플 복구가 필요하신가요?
          </p>
        </section>
        <RestoreCoupleButton partnerNickname={data.restorableCouple.partnerNickname} />
      </main>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(RestoreCouplePage, { requiredCouple: false, requiredAuth: true });
