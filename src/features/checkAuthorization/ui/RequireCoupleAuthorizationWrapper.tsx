import React, { ReactNode, Suspense } from "react";

import { getMeApi } from "@/entities/user/api/user.server";
import { hasUserCouple } from "@/entities/user/models/hasCouple";

import FetchBoundary from "@/shared/ui/Boundary/FetchBoundary";

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
    <Suspense fallback={fallback ?? children}>
      <FetchBoundary fetchFunctions={[getMeApi]}>
        {([{ data: me }]) => (
          <>
            {hasUserCouple(me) && children}
            {!hasUserCouple(me) && props.hasBottomSheet && (
              <RequireCoupleAuthorizationButton className={fallbackWrapperClassName} callbackUrl={props.callbackUrl}>
                {fallback ?? children}
              </RequireCoupleAuthorizationButton>
            )}
            {!hasUserCouple(me) && !props.hasBottomSheet && (fallback ?? children)}
          </>
        )}
      </FetchBoundary>
    </Suspense>
  );
};

export default RequireCoupleAuthorizationWrapper;
