import { ReactNode, Suspense } from "react";

import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/FetchBoundary";

import RequireAuthorizationButton from "./RequireAuthorizationButton";

interface Props {
  fallback: ReactNode;
  callbackUrl: string;
  children?: ReactNode;
  fallbackWrapperClassName?: string;
}

export default async function RequireAuthorizationWrapper({
  fallback,
  callbackUrl,
  children,
  fallbackWrapperClassName,
}: Props) {
  return (
    <Suspense fallback={fallback}>
      <FetchBoundary fetchFunctions={[getMeApi]}>
        {([{ data: me }]) => (
          <>
            {me && children}
            {!me && (
              <RequireAuthorizationButton className={fallbackWrapperClassName} callbackUrl={callbackUrl}>
                {fallback}
              </RequireAuthorizationButton>
            )}
          </>
        )}
      </FetchBoundary>
    </Suspense>
  );
}
