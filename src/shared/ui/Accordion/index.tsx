"use client";

import { type MouseEventHandler, type ReactNode, useId } from "react";

import cx from "clsx";

import { IconChevronDown20 } from "public/icons";

import styles from "./Accordion.module.scss";

interface Props {
  isShow: boolean;
  className?: string;
  onClickButton: MouseEventHandler<HTMLButtonElement>;
  summary?: ReactNode;
  details?: ReactNode;
}

// TODO: ACCORDION 완성 / storybook
const Accordion: React.FC<Props> = ({ isShow, className, details, summary, onClickButton }) => {
  const summaryId = useId();
  const detailsId = useId();

  return (
    <div className={cx(styles.wrapper, className)} data-testid="accordion">
      <div className={styles.summary} aria-expanded={isShow} id={summaryId} data-testid="accordion-summary">
        {summary}
        <button
          type="button"
          aria-controls={detailsId}
          className={styles.chevronButton}
          data-testid="accordion-button"
          onClick={onClickButton}
        >
          <IconChevronDown20 className={cx(styles.chevron, { [styles.isShow]: isShow })} />
        </button>
      </div>
      {isShow && (
        <div id={detailsId} aria-labelledby={summaryId} className={styles.details} data-testid="accordion-details">
          {details}
        </div>
      )}
    </div>
  );
};

export default Accordion;
