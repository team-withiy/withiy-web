import { type ComponentType } from "react";

import AuthorizationRouteHandler from "./AuthorizationRouteHandler";

import type { AuthorizationConfig } from "./authorizationRoute.interface";

const withAuthorizationRoute = <P extends object>(WrappedComponent: ComponentType<P>, config: AuthorizationConfig) => {
  const WithAuthorizationRoute = (props: P) => {
    return (
      <>
        <WrappedComponent {...props} />
        <AuthorizationRouteHandler {...config} />
      </>
    );
  };

  return WithAuthorizationRoute;
};

export default withAuthorizationRoute;
