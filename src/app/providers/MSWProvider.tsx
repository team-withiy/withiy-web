"use client";

import { type PropsWithChildren, useEffect, useRef } from "react";

const MSWProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);

  useEffect(() => {
    const init = async () => {
      const initMSW = await import("@/app/mocks").then((res) => res.initMSW);
      await initMSW();
      loaded.current = true;
    };

    if (!loaded.current) init();
  }, []);

  return <>{children}</>;
};

export default MSWProvider;
