import { getSearchParams } from "@/shared/lib/searchParams";
import { Nullable } from "@/shared/lib/utils.interface";

import { apiRouteHandler } from "../apiRouteHandler";

import type { RecentLoginedSocialTypeResponse, SocialType, TokenDTO } from "./auth.interface";

export const setTokensApi = (params: Nullable<TokenDTO>) =>
  apiRouteHandler.post("auth/callback", { searchParams: getSearchParams(params) }).json<TokenDTO>();

export const setRecentLoginedSocialTypeApi = (socialType: SocialType) =>
  apiRouteHandler
    .post("auth/recent-logined-social-types", { json: { socialType } })
    .json<RecentLoginedSocialTypeResponse>();

export const removeTokensApi = () => apiRouteHandler.delete("auth/tokens");
