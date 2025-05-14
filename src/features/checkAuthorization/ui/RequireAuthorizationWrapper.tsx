import { ReactNode, Suspense } from "react";

import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/FetchBoundary";

import RequireAuthorizationButton from "./RequireAuthorizationButton";

interface Props {
  fallback: ReactNode;
  children?: ReactNode;
  fallbackWrapperClassName?: string;
}

export default async function RequireAuthorizationWrapper({ fallback, children, fallbackWrapperClassName }: Props) {
  return (
    <Suspense fallback={fallback}>
      <FetchBoundary fetchFunctions={[getMeApi]}>
        {([{ data: me }]) => (
          <>
            {me && children}
            {!me && (
              <RequireAuthorizationButton className={fallbackWrapperClassName}>{fallback}</RequireAuthorizationButton>
            )}
          </>
        )}
      </FetchBoundary>
    </Suspense>
  );
}
