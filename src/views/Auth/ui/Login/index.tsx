import LoginButton from "@/features/LoginButton/ui";

import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import BackButton from "./BackButton";
import { IconCharacterDefault } from "public/icons";

import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  return (
    <DvhHeightLayout dvh={100} heightType="height" className={styles.wrapper}>
      <main className={styles.main}>
        <section className={styles.top}>
          <IconCharacterDefault />
          <h1 className={styles.title}>WITHIY</h1>
          <p className={styles.description}>데이트 여정을 한 번에</p>
        </section>
        <section className={styles.bottom}>
          <LoginButton socialType="google" />
          <LoginButton socialType="kakao" />
          <LoginButton socialType="naver" />
        </section>
        <BackButton />
      </main>
    </DvhHeightLayout>
  );
};

export default LoginPage;
