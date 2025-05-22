import { getSearchParams } from "@/shared/lib/searchParams";
import { Nullable } from "@/shared/lib/utils.interface";

import { apiRouteHandler } from "../apiRouteHandler";
import { revalidatePathApi } from "../revalidate.mutations";

import type { AuthCallbackUrlResponse, RecentLoginedSocialTypeResponse, SocialType, TokenDTO } from "./auth.interface";

export const setTokensApi = (params: Nullable<TokenDTO>) =>
  apiRouteHandler.post("auth/callback", { searchParams: getSearchParams(params) }).json<TokenDTO>();

export const setRecentLoginedSocialTypeApi = (socialType: SocialType) =>
  apiRouteHandler
    .post("auth/recent-logined-social-types", { json: { socialType } })
    .json<RecentLoginedSocialTypeResponse>();

// TODO: revalidate 관련 로직 분리
export const logoutApi = () => apiRouteHandler.delete("auth/logout").then(() => revalidatePathApi("/", "layout"));

export const setCallbackUrlApi = (callbackUrl: string) =>
  apiRouteHandler.post("auth/callback-url", { json: { callbackUrl } }).json<AuthCallbackUrlResponse>();

export const deleteCallbackUrlApi = () => apiRouteHandler.delete("auth/callback-url").json();
