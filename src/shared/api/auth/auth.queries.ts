import { createQueryKeys } from "@lukemorales/query-key-factory";

import { Nullable } from "@/shared/lib/utils.interface";

import { apiRouteHandler } from "../apiRouteHandler";
import { RecentLoginedSocialTypeResponse, TokenDTO } from "./auth.interface";
import { setTokensApi } from "./auth.mutations";

export const authQueries = createQueryKeys("auth", {
  authCallback: (params: Nullable<TokenDTO>) => ({
    queryKey: ["authCallback", params],
    queryFn: () => setTokensApi(params),
  }),
  getRecentLoginedSocialType: {
    queryKey: ["getRecentLoginedSocialType"],
    queryFn: () => apiRouteHandler.get("auth/recent-logined-social-types").json<RecentLoginedSocialTypeResponse>(),
  },
});
