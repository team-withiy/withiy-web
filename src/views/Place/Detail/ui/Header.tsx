import LayoutHeader from "@/widgets/Layout/ui/Header";

import BackButton from "@/shared/ui/BackButton";

import { IconArrowLeft24 } from "public/icons";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <LayoutHeader className={styles.wrapper}>
      <BackButton className={styles.backButton}>
        <IconArrowLeft24 />
      </BackButton>
      <button type="button" className={styles.reportButton}>
        신고
      </button>
    </LayoutHeader>
  );
};

export default Header;
