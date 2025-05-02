import React from "react";

import AuthorizationRouteHandler from "@/features/handleAuthorizationRoute/ui/AuthorizationRouteHandler";

import { SSRSafeSuspense } from "@/shared/ui/SSRSafeSuspense";

import Callback from "./Callback";

const OAuthCallbackPage: React.FC = () => {
  return (
    <AuthorizationRouteHandler requiredAuth={false}>
      <SSRSafeSuspense fallback={null}>
        <Callback />
      </SSRSafeSuspense>
    </AuthorizationRouteHandler>
  );
};

export default OAuthCallbackPage;
