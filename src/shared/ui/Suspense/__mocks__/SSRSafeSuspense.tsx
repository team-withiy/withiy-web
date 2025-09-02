import { type ComponentProps, Suspense } from "react";

export const SSRSafeSuspense = Suspense;

export default Object.assign(SSRSafeSuspense, {
  with: <P extends object>(Component: React.ComponentType<P>, suspenseProps: ComponentProps<typeof Suspense>) => {
    return (props: P) => (
      <SSRSafeSuspense {...suspenseProps}>
        <Component {...props} />
      </SSRSafeSuspense>
    );
  },
});
