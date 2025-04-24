import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { getMeApi } from "@/entities/user/api/user.server";

import {
  HOME_PAGE_ENDPOINT,
  LOGIN_PAGE_ENDPOINT,
  RESTORE_PAGE_ENDPOINT,
  UNAUTHORIZED_STATUS,
} from "@/shared/constants/auth";

interface Props {
  requiredAuth?: boolean;
}

// TODO: isRegistered check
const AuthorizationRouteHandler = async ({ requiredAuth, children }: PropsWithChildren<Props>) => {
  const { data, status } = await getMeApi();

  if (requiredAuth === true && status === UNAUTHORIZED_STATUS) return redirect(LOGIN_PAGE_ENDPOINT);
  if (status === 200 && data.restoreEnabled) return redirect(RESTORE_PAGE_ENDPOINT);
  // if (status === 200 && !data.isRegistered) return redirect(HOME_PAGE_ENDPOINT);
  if (requiredAuth === false && status !== UNAUTHORIZED_STATUS) return redirect(HOME_PAGE_ENDPOINT);

  return <>{children}</>;
};

export default AuthorizationRouteHandler;
