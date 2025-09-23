import Link from "next/link";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import type { FallbackRenderType } from "@/shared/ui/Boundary/ErrorBoundary";
import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import { IconCharacterBear } from "public/icons";

import styles from "./Error.module.scss";

const NotFoundError: FallbackRenderType = (props) => {
  return (
    <DvhHeightLayout heightType="height" dvh={100} className={styles.wrapper}>
      <main className={styles.main}>
        <section className={styles.content}>
          <section className={styles.content}>
            <IconCharacterBear />
            <p className={styles.description}>
              존재하지 않는 페이지예요
              <br />
              <small className={styles.small}>
                주소가 잘못되었거나 사라진 페이지예요
                <br />
                불편을 드려 죄송해요
              </small>
            </p>
          </section>
        </section>
        <BottomFloatingButtonWrapper hasTwoButtons>
          <Link href="/" className={styles.link} onNavigate={props?.resetErrorBoundary}>
            <Button size={52} full variant="default" type="button">
              위디 홈으로 바로가기
            </Button>
          </Link>
        </BottomFloatingButtonWrapper>
      </main>
    </DvhHeightLayout>
  );
};

export default NotFoundError;
