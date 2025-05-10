import dynamic from "next/dynamic";

export const AuthorizationRouteHandler = dynamic(() => import("./AuthorizationRouteHandler"), { loading: () => null });
