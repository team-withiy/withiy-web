"use client";

import { PropsWithChildren } from "react";

import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import styles from "./MobileLayout.module.scss";

const MobileLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DvhHeightLayout dvh={100} heightType="minHeight" className={styles.wrapper}>
      {children}
    </DvhHeightLayout>
  );
};

export default MobileLayout;
