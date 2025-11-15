"use client";

import { useParams } from "next/navigation";

const ThumbnailList: React.FC = () => {
  const {} = useParams<{ placeId: string }>();

  return null;
};

export default ThumbnailList;
