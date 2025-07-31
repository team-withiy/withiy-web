import { createQueryKeys } from "@lukemorales/query-key-factory";

import { apiRouteHandler } from "../apiRouteHandler";

import type { AuthCallbackUrlResponse, RecentLoginedSocialTypeResponse } from "./auth.interface";

export const authQueries = createQueryKeys("auth", {
  getRecentLoginedSocialType: {
    queryKey: ["getRecentLoginedSocialType"],
    queryFn: () => apiRouteHandler.get("auth/recent-logined-social-types").json<RecentLoginedSocialTypeResponse>(),
  },
  getCallbackUrl: {
    queryKey: ["getCallbackUrl"],
    queryFn: () => apiRouteHandler.get("auth/callback-url").json<AuthCallbackUrlResponse>(),
  },
});
