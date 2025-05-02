"use client";

import { useState } from "react";

import Accordion from "@/shared/ui/Accordion";

// import styles from "./Test.module.scss";

const Test: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  return <Accordion isShow={isShow} onClickButton={() => setIsShow(!isShow)} details="contents" summary="title" />;
};

export default Test;
