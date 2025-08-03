"use client";

import Link from "next/link";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import type { FallbackRenderType } from "@/shared/ui/Boundary/ErrorBoundary";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconCharacterLeave } from "public/icons";

import styles from "./Error.module.scss";

const ForbiddenError: FallbackRenderType = ({ resetErrorBoundary }) => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main} data-testid="forbidden-error">
        <section className={styles.content}>
          <section className={styles.content}>
            <IconCharacterLeave />
            <p className={styles.description}>
              접근할 수 없는 페이지예요
              <br />
              <small className={styles.small}>불편을 드려 죄송해요</small>
            </p>
          </section>
        </section>
        <BottomFloatingButtonWrapper>
          <Link href="/" className={styles.link}>
            <Button size={52} full variant="default" type="button" onClick={resetErrorBoundary}>
              위디 홈으로 바로가기
            </Button>
          </Link>
        </BottomFloatingButtonWrapper>
      </main>
    </DvhHeightLayout>
  );
};

export default ForbiddenError;
