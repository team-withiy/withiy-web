import Link from "next/link";

import Button from "@/shared/ui/Button/Button";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <DvhHeightLayout dvh={100} heightType="height" className={styles.wrapper}>
      <main>
        <h2 className={styles.title}>404 페이지</h2>
        <p className={styles.description}>디자이너님이 디자인 해주실거에요</p>
        <Link href="/">
          <Button type="button" size={52} variant="default">
            홈으로 돌아가기
          </Button>
        </Link>
      </main>
    </DvhHeightLayout>
  );
};

export default NotFoundPage;
