import type { ComponentProps } from "react";

export const SSRSafeSuspense = ({ children }: { children: React.ReactNode }) => {
  return children;
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
