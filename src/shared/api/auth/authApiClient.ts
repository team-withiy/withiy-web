import { UNAUTHORIZED_MESSAGE } from "@/shared/constants/auth";
import { PromiseHolder } from "@/shared/lib/promiseHolder";
import { Nullable } from "@/shared/lib/utils.interface";
import { getTokenExpirationDate } from "@/shared/models/auth/validateToken";

import { apiClient } from "../apiClient";
import { apiRouteHandler } from "../apiRouteHandler";
import { TokenDTO } from "./auth.interface";

const promiseHolder = new PromiseHolder();
let cachedToken: string | null = null;
let tokenExpiry = new Date(0);

// TODO: test codes
/**
 * If you use this authApiClient with `Suspense`, you need to wrap your components with `SSRSafeSuspense`
 * Because of using Route Handler, it will cause unexpected behavior in SSR.
 */
export const authApiClient = apiClient.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        if (promiseHolder.isLocked) await promiseHolder.promise;

        if (cachedToken && new Date() < tokenExpiry) {
          request.headers.set("Authorization", `Bearer ${cachedToken}`);
          return request;
        }

        promiseHolder.hold();

        try {
          const { accessToken } = await apiRouteHandler.get("auth/tokens").json<Nullable<TokenDTO>>();
          if (!accessToken) throw new Error(UNAUTHORIZED_MESSAGE);

          cachedToken = accessToken;
          tokenExpiry = getTokenExpirationDate(accessToken);

          promiseHolder.successRelease();

          request.headers.set("Authorization", `Bearer ${accessToken}`);
          return request;
        } catch (error) {
          promiseHolder.failRelease();
          cachedToken = null;
          tokenExpiry = new Date(0);
          throw error;
        }
      },
    ],
  },
});

export { getKyHTTPError, isKyHTTPError } from "../apiClient";
