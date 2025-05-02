import Header from "@/widgets/Layout/ui/Header";

import AuthorizationRouteHandler from "@/features/handleAuthorizationRoute/ui/AuthorizationRouteHandler";

import Test from "./Test";

import styles from "./RestorePage.module.scss";

const RestorePage: React.FC = () => {
  return (
    <AuthorizationRouteHandler isRestorePage requiredAuth>
      <main className={styles.wrapper}>
        <Header className={styles.header}>
          <h2 className={styles.title}>이용약관 동의</h2>
        </Header>
        <Test />
      </main>
    </AuthorizationRouteHandler>
  );
};

export default RestorePage;
