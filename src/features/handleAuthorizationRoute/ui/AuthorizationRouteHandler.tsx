import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { getMeApi } from "@/entities/user/api/user.server";

import {
  HOME_PAGE_ENDPOINT,
  LOGIN_PAGE_ENDPOINT,
  REGISTER_PAGE_ENDPOINT,
  RESTORE_PAGE_ENDPOINT,
  UNAUTHORIZED_STATUS,
} from "@/shared/constants/auth";

interface Props {
  requiredAuth?: boolean;
  isRestorePage?: boolean;
  isRegisterPage?: boolean;
}

const AuthorizationRouteHandler = async ({
  requiredAuth,
  children,
  isRegisterPage,
  isRestorePage,
}: PropsWithChildren<Props>) => {
  const { status, data } = await getMeApi();

  if (requiredAuth === true && status === UNAUTHORIZED_STATUS) return redirect(LOGIN_PAGE_ENDPOINT);
  if (requiredAuth === false && status !== UNAUTHORIZED_STATUS) return redirect(HOME_PAGE_ENDPOINT);

  if (status === 200) {
    if (data.restoreEnabled && !isRestorePage) return redirect(RESTORE_PAGE_ENDPOINT);
    if (!data.restoreEnabled && isRestorePage) return redirect(HOME_PAGE_ENDPOINT);
    if (data.isRegistered && isRegisterPage) return redirect(HOME_PAGE_ENDPOINT);
    if (!data.isRegistered && !isRegisterPage) return redirect(REGISTER_PAGE_ENDPOINT);
  }

  return <>{children}</>;
};

export default AuthorizationRouteHandler;
