import { apiRouteHandler } from "../apiRouteHandler";

import type { RecentLoginedSocialTypeResponse, SocialType } from "./auth.interface";

export const setRecentLoginedSocialTypeApi = (socialType: SocialType) =>
  apiRouteHandler
    .post("auth/recent-logined-social-types", { json: { socialType } })
    .json<RecentLoginedSocialTypeResponse>();
