"use client";

import { ReactNode } from "react";

import { userQueries } from "@/entities/user/api/user.queries";

import QueryBoundary from "@/shared/ui/Boundary/QueryBoundary";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import RequireAuthorizationButton from "./RequireAuthorizationButton";

type HasBottomSheetProps = {
  hasBottomSheet: true;
  callbackUrl: string;
};

type NoBottomSheetProps = {
  hasBottomSheet: false;
};

type BottomSheetProps = HasBottomSheetProps | NoBottomSheetProps;

type Props = BottomSheetProps & {
  fallback?: ReactNode;
  children?: ReactNode;
  fallbackWrapperClassName?: string;
};

export default function RequireAuthorizationWrapper({ fallback, children, fallbackWrapperClassName, ...props }: Props) {
  return (
    <SSRSafeSuspense fallback={fallback ?? children}>
      <QueryBoundary queries={[userQueries.getMe]}>
        {([{ data: me }]) => (
          <>
            {me?.data && children}
            {!me?.data && props.hasBottomSheet && (
              <RequireAuthorizationButton className={fallbackWrapperClassName} callbackUrl={props.callbackUrl}>
                {fallback ?? children}
              </RequireAuthorizationButton>
            )}
            {!me?.data && !props.hasBottomSheet && (fallback ?? children)}
          </>
        )}
      </QueryBoundary>
    </SSRSafeSuspense>
  );
}
