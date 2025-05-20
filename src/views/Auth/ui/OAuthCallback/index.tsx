import React, { Suspense } from "react";

import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";

import Loading from "@/shared/ui/Loading";

import Callback from "./Callback";

const OAuthCallbackPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading isShow />}>
        <Callback />
      </Suspense>
      <AuthorizationRouteHandler requiredAuth={false} />
    </>
  );
};

export default OAuthCallbackPage;
