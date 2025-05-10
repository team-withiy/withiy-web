import React from "react";

import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";

import { SSRSafeSuspense } from "@/shared/ui/SSRSafeSuspense";

import Callback from "./Callback";

const OAuthCallbackPage: React.FC = () => {
  return (
    <>
      <SSRSafeSuspense fallback={null}>
        <Callback />
      </SSRSafeSuspense>
      <AuthorizationRouteHandler requiredAuth={false} />
    </>
  );
};

export default OAuthCallbackPage;
