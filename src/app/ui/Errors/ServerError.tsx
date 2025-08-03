"use client";

import Link from "next/link";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import type { FallbackRenderType } from "@/shared/ui/Boundary/ErrorBoundary";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconCharacterLeave } from "public/icons";

import styles from "./Error.module.scss";

const ServerError: FallbackRenderType = ({ resetErrorBoundary }) => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main} data-testid="server-error">
        <section className={styles.content}>
          <section className={styles.content}>
            <IconCharacterLeave />
            <p className={styles.description}>
              문제가 발생했어요
              <br />
              <small className={styles.small}>잠시 후 다시 시도해주세요</small>
            </p>
          </section>
        </section>
        <BottomFloatingButtonWrapper hasTwoButtons>
          <Link href="/" className={styles.link}>
            <Button size={52} full variant="default" type="button" onClick={resetErrorBoundary}>
              위디 홈으로 바로가기
            </Button>
          </Link>
          <Button size={52} full variant="text" type="button" onClick={resetErrorBoundary}>
            다시 시도하기
          </Button>
        </BottomFloatingButtonWrapper>
      </main>
    </DvhHeightLayout>
  );
};

export default ServerError;
