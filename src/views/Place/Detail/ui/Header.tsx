import BackButton from "@/shared/ui/BackButton";

import { IconArrowLeft24 } from "public/icons";

import styles from "./Header.module.scss";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className={styles.wrapper} data-testid="header">
      <BackButton className={styles.backButton}>
        <IconArrowLeft24 />
      </BackButton>
      <h2 className={styles.title} data-testid="header-title">
        {title}
      </h2>
      <button type="button" className={styles.reportButton} data-testid="header-report-button">
        신고
      </button>
    </header>
  );
};

export default Header;
