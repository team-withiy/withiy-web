"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { userQueries } from "@/entities/user/api/user.queries";

import {
  FORBIDDEN_MESSAGE,
  REGISTER_PAGE_ENDPOINT,
  RESTORE_PAGE_ENDPOINT,
  UNAUTHORIZED_MESSAGE,
} from "@/shared/constants/auth";

import { AuthorizationConfig } from "./authorizationRoute.interface";

interface Props extends AuthorizationConfig {}

const AuthorizationRouteHandler: React.FC<Props> = ({
  requiredAuth,
  requiredCouple,
  isRegisterPage,
  isRestorePage,
}) => {
  const { data, isFetched } = useQuery({ ...userQueries.getMe, throwOnError: false });
  const { replace } = useRouter();

  useEffect(() => {
    if (!isFetched) return;
    if (requiredAuth === true && !data) throw new Error(UNAUTHORIZED_MESSAGE);
    if (requiredAuth === false && !!data) throw new Error(FORBIDDEN_MESSAGE);

    if (!!data) {
      if (requiredCouple === true && !data.data.hasCouple) throw new Error(FORBIDDEN_MESSAGE);
      if (requiredCouple === false && data.data.hasCouple) throw new Error(FORBIDDEN_MESSAGE);
      if (data.data.restoreEnabled && !isRestorePage) void replace(RESTORE_PAGE_ENDPOINT);
      if (!data.data.restoreEnabled && isRestorePage) throw new Error(FORBIDDEN_MESSAGE);
      if (data.data.isRegistered && isRegisterPage) throw new Error(FORBIDDEN_MESSAGE);
      if (!data.data.isRegistered && !isRegisterPage) void replace(REGISTER_PAGE_ENDPOINT);
    }
  }, [data, isFetched, isRegisterPage, isRestorePage, replace, requiredAuth, requiredCouple]);

  return null;
};

export default AuthorizationRouteHandler;
