"use client";

import { useSearchParams } from "next/navigation";

import FolderList from "./FolderList";
import { isCourseActive, isPlaceActive } from "../lib/tab";

const Content: React.FC = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <>
      {isPlaceActive(tab) && <FolderList />}
      {isCourseActive(tab) && <>Course</>}
    </>
  );
};

export default Content;
