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

export default Object.assign(SSRSafeSuspense, {
  with: <P extends object>(
    Component: React.ComponentType<P>,
    suspenseProps: ComponentProps<typeof SSRSafeSuspense>,
  ) => {
    return (props: P) => (
      <SSRSafeSuspense {...suspenseProps}>
        <Component {...props} />
      </SSRSafeSuspense>
    );
  },
});
