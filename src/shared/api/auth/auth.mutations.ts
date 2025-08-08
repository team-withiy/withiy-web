import { apiRouteHandler } from "../apiRouteHandler";

import type { AuthCallbackUrlResponse, RecentLoginedSocialTypeResponse, SocialType, TokenDTO } from "./auth.interface";

export const setTokensApi = (json: TokenDTO) => apiRouteHandler.post("auth/tokens", { json });

export const setRecentLoginedSocialTypeApi = (socialType: SocialType) =>
  apiRouteHandler
    .post("auth/recent-logined-social-types", { json: { socialType } })
    .json<RecentLoginedSocialTypeResponse>();

export const logoutApi = () => apiRouteHandler.delete("auth/logout");

export const setCallbackUrlApi = (callbackUrl: string) =>
  apiRouteHandler.post("auth/callback-url", { json: { callbackUrl } }).json<AuthCallbackUrlResponse>();

export const deleteCallbackUrlApi = () => apiRouteHandler.delete("auth/callback-url").json();
