import { Suspense } from "react";

export default Object.assign(Suspense, {
  with: <P extends object>(Component: React.ComponentType<P>, suspenseProps: React.ComponentProps<typeof Suspense>) => {
    return (props: P) => (
      <Suspense {...suspenseProps}>
        <Component {...props} />
      </Suspense>
    );
  },
});
