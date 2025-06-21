import { ReactNode, Suspense } from "react";

import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/FetchBoundary";

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

export default async function RequireCoupleAuthorizationWrapper({
  fallback,
  children,
  fallbackWrapperClassName,
  ...props
}: Props) {
  return (
    <Suspense fallback={fallback || children}>
      <FetchBoundary fetchFunctions={[getMeApi]}>
        {([{ data: me }]) => (
          <>
            {me.hasCouple && children}
            {!me.hasCouple && props.hasBottomSheet && (
              <RequireCoupleAuthorizationButton className={fallbackWrapperClassName} callbackUrl={props.callbackUrl}>
                {fallback || children}
              </RequireCoupleAuthorizationButton>
            )}
            {!me.hasCouple && !props.hasBottomSheet && (fallback || children)}
          </>
        )}
      </FetchBoundary>
    </Suspense>
  );
}
