import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import BackButton from "@/shared/ui/BackButton";
import UnderlineButton from "@/shared/ui/Button/UnderlineButton";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";
import { SSRSafeSuspense } from "@/shared/ui/SSRSafeSuspense";

import LoginButton, { LoadingLoginButton } from "./LoginButton";
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
          <SSRSafeSuspense fallback={<LoadingLoginButton socialType="google" />}>
            <LoginButton socialType="google" />
          </SSRSafeSuspense>
          <SSRSafeSuspense fallback={<LoadingLoginButton socialType="kakao" />}>
            <LoginButton socialType="kakao" />
          </SSRSafeSuspense>
          <SSRSafeSuspense fallback={<LoadingLoginButton socialType="naver" />}>
            <LoginButton socialType="naver" />
          </SSRSafeSuspense>
        </section>
        <BackButton>
          <UnderlineButton size={20} type="button">
            위디 둘러보기
          </UnderlineButton>
        </BackButton>
        <BackButton />
      </main>
    </DvhHeightLayout>
  );
};

export default withAuthorizationRoute(LoginPage, { requiredAuth: false });
