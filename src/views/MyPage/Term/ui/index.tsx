import { Suspense } from "react";

import Header from "@/widgets/Layout/ui/Header";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getTermsApi } from "@/entities/term/api/term.server";

import BackButton from "@/shared/ui/BackButton";
import FetchBoundary from "@/shared/ui/FetchBoundary";

import TermList, { LoadingTermList } from "./TermList";
import { IconArrowLeft24 } from "public/icons";

import styles from "./TermPage.module.scss";

const TermPage: React.FC = () => {
  return (
    <main className={styles.wrapper} data-testid="term-page">
      <Header className={styles.header}>
        <BackButton className={styles.backButton}>
          <IconArrowLeft24 data-testid="arrow-left-icon" />
        </BackButton>
        <h1 className={styles.title} data-testid="title">
          이용약관
        </h1>
      </Header>
      <Suspense fallback={<LoadingTermList />}>
        <FetchBoundary fetchFunctions={[getTermsApi]}>
          {([{ data: terms }]) => <TermList terms={terms} />}
        </FetchBoundary>
      </Suspense>
    </main>
  );
};

export default withAuthorizationRoute(TermPage, { requiredAuth: true });
