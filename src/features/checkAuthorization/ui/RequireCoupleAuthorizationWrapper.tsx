"use client";

import React, { ReactNode } from "react";

import { userQueries } from "@/entities/user/api/user.queries";
import { hasUserCouple } from "@/entities/user/models/hasCouple";

import QueryBoundary from "@/shared/ui/Boundary/QueryBoundary";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import RequireCoupleAuthorizationButton from "./RequireCoupleAuthorizationButton";

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

const RequireCoupleAuthorizationWrapper: React.FC<Props> = ({
  fallback,
  children,
  fallbackWrapperClassName,
  ...props
}) => {
  return (
    <SSRSafeSuspense fallback={fallback ?? children}>
      <QueryBoundary queries={[userQueries.getMe]}>
        {([{ data: me }]) => (
          <>
            {me?.data && hasUserCouple(me.data) && children}
            {(!me?.data || !hasUserCouple(me.data)) && props.hasBottomSheet && (
              <RequireCoupleAuthorizationButton className={fallbackWrapperClassName} callbackUrl={props.callbackUrl}>
                {fallback ?? children}
              </RequireCoupleAuthorizationButton>
            )}
            {(!me?.data || !hasUserCouple(me.data)) && !props.hasBottomSheet && (fallback ?? children)}
          </>
        )}
      </QueryBoundary>
    </SSRSafeSuspense>
  );
};

export default RequireCoupleAuthorizationWrapper;
