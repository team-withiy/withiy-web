import React, { Suspense } from "react";

import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import Loading from "@/shared/ui/Loading";

import Callback from "./Callback";

const OAuthCallbackPage: React.FC = () => {
  return (
    <Suspense fallback={<Loading isShow />}>
      <Callback />
    </Suspense>
  );
};

export default withAuthorizationRoute(OAuthCallbackPage, {});
