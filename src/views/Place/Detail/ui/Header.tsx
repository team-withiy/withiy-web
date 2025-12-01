"use client";

import { type CSSProperties, useRef } from "react";

import Link from "next/link";

import { PLACE_CAROUSEL_ID } from "@/widgets/PlaceCarousel/ui";

import useScrollLevelByAnchor from "@/shared/hooks/useScrollLevelByAnchor";
import BackButton from "@/shared/ui/BackButton";

import { IconArrowLeft24 } from "public/icons";

import styles from "./Header.module.scss";

interface Props {
  title: string;
  placeId: number;
}

const Header: React.FC<Props> = ({ title, placeId }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollLevel = useScrollLevelByAnchor({ anchor: PLACE_CAROUSEL_ID, element: headerRef });
  const style = { "--scroll-level": `${scrollLevel}%` } as CSSProperties;

  return (
    <header className={styles.wrapper} data-testid="header" ref={headerRef} style={style}>
      <BackButton className={styles.backButton}>
        <IconArrowLeft24 />
      </BackButton>
      <h2 className={styles.title} data-testid="header-title">
        {title}
      </h2>
      <Link href={`/places/${placeId}/report`}>
        <button type="button" className={styles.reportButton} data-testid="header-report-button">
          신고
        </button>
      </Link>
    </header>
  );
};

export default Header;
