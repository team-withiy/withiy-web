"use client";

import { type PropsWithChildren, useEffect, useState } from "react";

const MSWProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const initMSW = await import("@/app/mocks").then((res) => res.initMSW);
      await initMSW();
      setLoaded(true);
    };

    if (!loaded) init();
  }, [loaded]);

  if (process.env.NEXT_PUBLIC_MSW !== "enabled") return <>{children}</>;
  if (!loaded) return null;

  return <>{children}</>;
};

export default MSWProvider;
