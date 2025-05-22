import { createQueryKeys } from "@lukemorales/query-key-factory";

import { Nullable } from "@/shared/lib/utils.interface";

import { apiRouteHandler } from "../apiRouteHandler";
import { setTokensApi } from "./auth.mutations";

import type { AuthCallbackUrlResponse, RecentLoginedSocialTypeResponse, TokenDTO } from "./auth.interface";

export const authQueries = createQueryKeys("auth", {
  authCallback: (params: Nullable<TokenDTO>) => ({
    queryKey: ["authCallback", params],
    queryFn: () => setTokensApi(params),
  }),
  getRecentLoginedSocialType: {
    queryKey: ["getRecentLoginedSocialType"],
    queryFn: () => apiRouteHandler.get("auth/recent-logined-social-types").json<RecentLoginedSocialTypeResponse>(),
  },
  getCallbackUrl: {
    queryKey: ["getCallbackUrl"],
    queryFn: () => apiRouteHandler.get("auth/callback-url").json<AuthCallbackUrlResponse>(),
  },
});
