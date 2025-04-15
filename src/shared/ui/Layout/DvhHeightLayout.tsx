"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";

import assert from "assert";
import cx from "clsx";
import { useWindowSize } from "react-use";

import styles from "./DvhHeightLayout.module.scss";

type HeightType = Extract<keyof CSSStyleDeclaration, "height" | "minHeight" | "maxHeight">;

interface Props {
  children?: ReactNode;
  dvh: number;
  heightType: HeightType;
  className?: string;
}

const DvhHeightLayout: React.FC<Props> = ({ dvh, children, heightType, className }) => {
  assert(dvh >= 0 && dvh <= 100, "dvh must be between 0 and 100");

  const { height } = useWindowSize();
  const style = { "--dvh": dvh } as React.CSSProperties;

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const $ref = ref.current;
    if (!CSS.supports("min-height", "100dvh")) {
      $ref.style[heightType] = `${(height * dvh) / 100}px`;
    }
  }, [dvh, height, heightType]);

  return (
    <div className={cx(styles.wrapper, styles[heightType], className)} ref={ref} style={style} data-testid="dvh-layout">
      {children}
    </div>
  );
};

export default DvhHeightLayout;
