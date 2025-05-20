import { Suspense } from "react";

import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";
import LoginButton, { LoadingLoginButton } from "@/features/login/ui/LoginButton";

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
          <Suspense fallback={<LoadingLoginButton socialType="google" />}>
            <LoginButton socialType="google" />
          </Suspense>
          <Suspense fallback={<LoadingLoginButton socialType="kakao" />}>
            <LoginButton socialType="kakao" />
          </Suspense>
          <Suspense fallback={<LoadingLoginButton socialType="naver" />}>
            <LoginButton socialType="naver" />
          </Suspense>
        </section>
        <BackButton />
      </main>
      <AuthorizationRouteHandler requiredAuth={false} />
    </DvhHeightLayout>
  );
};

export default LoginPage;
