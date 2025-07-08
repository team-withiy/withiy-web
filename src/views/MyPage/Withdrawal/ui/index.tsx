import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import BackButton from "@/shared/ui/BackButton";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import WithdrawButton from "./WithdrawButton";
import { IconCharacterLeave, IconX24 } from "public/icons";

import styles from "./WithdrawalPage.module.scss";

const WithdrawalPage: React.FC = () => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main} data-testid="withdrawal-page">
        <Header className={styles.header}>
          <BackButton className={styles.xButton}>
            <IconX24 />
          </BackButton>
          <h2 className={styles.title} data-testid="title">
            회원탈퇴
          </h2>
        </Header>
        <section className={styles.content}>
          <IconCharacterLeave />
          <p className={styles.description} data-testid="description">
            정말 헤어지실 건가요..?
            <small className={styles.small}>
              함게 기록한 추억들이 모두 지워져요.
              <br />
              다시 보고 싶다면, 30일 안에는 복구할 수 있어요.
            </small>
          </p>
        </section>
      </main>
      <WithdrawButton />
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(WithdrawalPage, { requiredAuth: true });
