"use client";

import { useState } from "react";

import Skeleton from "react-loading-skeleton";

import type { TermDTO } from "@/entities/term/api/term.interface";

import Accordion from "@/shared/ui/Accordion";

import styles from "./TermList.module.scss";

interface Props {
  terms: TermDTO[];
}

const TermList: React.FC<Props> = ({ terms }) => {
  const [openedTermId, setOpenedTermId] = useState<number | null>(null);

  return (
    <section className={styles.wrapper} data-testid="term-list">
      {terms.map((term) => (
        <Accordion
          key={term.id}
          isShow={openedTermId === term.id}
          onClickButton={() => setOpenedTermId((prev) => (prev === term.id ? null : term.id))}
          summary={<p className={styles.summary}>{term.title}</p>}
          details={
            <ul className={styles.details}>
              {term.content.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          }
        />
      ))}
    </section>
  );
};

export default TermList;

export const LoadingTermList: React.FC = () => {
  return (
    <section className={styles.wrapper} data-testid="term-list-loading">
      {Array.from({ length: 5 }, (_, index) => (
        <Accordion
          key={index}
          isShow={false}
          summary={<Skeleton width={200} />}
          details={<></>}
          onClickButton={() => {}}
        />
      ))}
    </section>
  );
};
