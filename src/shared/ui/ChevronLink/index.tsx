import type { ComponentProps } from "react";

import Link from "next/link";

import cx from "clsx";

import { IconChevronRight24 } from "public/icons";

import styles from "./ChevronLink.module.scss";

interface Props extends ComponentProps<typeof Link> {}

const ChevronLink: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <Link className={cx(styles.wrapper, className)} data-testid="chevron-link" {...props}>
      {children}
      <IconChevronRight24 className={styles.chevronRight} />
    </Link>
  );
};

export default ChevronLink;
