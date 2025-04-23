import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getSearchParams } from "@/shared/lib/searchParams";
import { Nullable } from "@/shared/lib/utils.interface";

import { apiRouteHandler } from "../apiRouteHandler";
import { RecentLoginedSocialTypeResponse, TokenDTO } from "./auth.interface";

export const authQueries = createQueryKeys("auth", {
  authCallback: (params: Nullable<TokenDTO>) => ({
    queryKey: ["authCallback", params],
    queryFn: () => apiRouteHandler.post("auth/callback", { searchParams: getSearchParams(params) }).json<TokenDTO>(),
  }),
  getRecentLoginedSocialType: {
    queryKey: ["getRecentLoginedSocialType"],
    queryFn: () => apiRouteHandler.get("auth/recent-logined-social-types").json<RecentLoginedSocialTypeResponse>(),
  },
});
