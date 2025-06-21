import { ReactNode, Suspense } from "react";

import { getMeApi } from "@/entities/user/api/user.server";

import FetchBoundary from "@/shared/ui/FetchBoundary";

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
    <Suspense fallback={fallback || children}>
      <FetchBoundary fetchFunctions={[getMeApi]}>
        {([{ data: me }]) => (
          <>
            {me && children}
            {!me && props.hasBottomSheet && (
              <RequireAuthorizationButton className={fallbackWrapperClassName} callbackUrl={props.callbackUrl}>
                {fallback || children}
              </RequireAuthorizationButton>
            )}
            {!me && !props.hasBottomSheet && (fallback || children)}
          </>
        )}
      </FetchBoundary>
    </Suspense>
  );
}
