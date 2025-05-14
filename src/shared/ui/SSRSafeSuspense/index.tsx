"use client";

import { type ComponentProps, Suspense, useEffect, useState } from "react";

export const SSRSafeSuspense: React.FC<ComponentProps<typeof Suspense>> = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) return <Suspense {...props} />;

  return <>{props.fallback}</>;
};
