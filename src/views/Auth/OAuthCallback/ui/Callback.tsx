"use client";

import { useCallback, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { userQueries } from "@/entities/user/api/user.queries";

import { authQueries } from "@/shared/api/auth/auth.queries";
import { DEFAULT_AUTH_CALLBACK_URL } from "@/shared/constants/auth";
import Loading from "@/shared/ui/Loading";

import { useDeleteCallbackUrlMutation, useSetTokensMutation } from "../api/oauthCallback.mutations";

const Callback: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
  const { mutateAsync: setTokens } = useSetTokensMutation();
  const { data: callbackUrl } = useSuspenseQuery(authQueries.getCallbackUrl);

  const { mutateAsync: deleteCallbackUrl } = useDeleteCallbackUrlMutation();

  const handleCallback = useCallback(async () => {
    if (!accessToken || !refreshToken) {
      router.replace("/auth");
      return;
    }

    await setTokens({ accessToken, refreshToken });
    await deleteCallbackUrl();
    await queryClient.invalidateQueries(userQueries.getMe);
    router.replace(callbackUrl.callbackUrl || DEFAULT_AUTH_CALLBACK_URL);
  }, [accessToken, callbackUrl.callbackUrl, deleteCallbackUrl, queryClient, refreshToken, router, setTokens]);

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  return <Loading isShow />;
};

export default Callback;
