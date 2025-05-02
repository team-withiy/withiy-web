import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./Header.module.scss";

interface Props {
  children?: ReactNode;
  className?: string;
}

const Header = ({ className, children }: Props) => {
  return (
    <header className={cx(styles.wrapper, className)} data-testid="header">
      {children}
    </header>
  );
};

export default Header;
