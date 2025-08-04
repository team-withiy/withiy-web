"use client";

import Link from "next/link";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import type { FallbackRenderType } from "@/shared/ui/Boundary/ErrorBoundary";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconCharacterLeave } from "public/icons";

import styles from "./Error.module.scss";

const UnauthorizedError: FallbackRenderType = ({ resetErrorBoundary }) => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main} data-testid="unauthorized-error">
        <section className={styles.content}>
          <section className={styles.content}>
            <IconCharacterLeave />
            <p className={styles.description}>
              로그인이 필요해요
              <br />
              <small className={styles.small}>로그인하고 우리의 추억을 저장해보세요!</small>
            </p>
          </section>
        </section>
        <BottomFloatingButtonWrapper hasTwoButtons>
          <Link href="/auth" className={styles.link} onNavigate={resetErrorBoundary}>
            <Button size={52} full variant="default" type="button">
              지금 로그인하러 가기
            </Button>
          </Link>
          <Link href="/" className={styles.link} onNavigate={resetErrorBoundary}>
            <Button size={52} full variant="text" type="button">
              위디 홈으로 바로가기
            </Button>
          </Link>
        </BottomFloatingButtonWrapper>
      </main>
    </DvhHeightLayout>
  );
};

export default UnauthorizedError;
