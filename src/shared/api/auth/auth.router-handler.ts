import { getRouteHandler, postRouteHandler } from "@/shared/api/apiRouteHandler";

import type { OAuthStateResponse } from "app/api/auth/state/route";
import type { OAuthStateValidateParams, OAuthStateValidateResponse } from "app/api/auth/state/validate/route";

export const setOAuthStateRouteHandler = async () =>
  postRouteHandler("/auth/state").then((res) => res.json<OAuthStateResponse>());

export const validateOAuthStateRouteHandler = async (params: OAuthStateValidateParams) =>
  getRouteHandler("/auth/state/validate", { params: { ...params }, cache: "no-store" }).then((res) =>
    res.json<OAuthStateValidateResponse>(),
  );
