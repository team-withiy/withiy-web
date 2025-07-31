"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import { authQueries } from "@/shared/api/auth/auth.queries";
import { DEFAULT_AUTH_CALLBACK_URL } from "@/shared/constants/auth";
import Loading from "@/shared/ui/Loading";

import { useDeleteCallbackUrlMutation, useSetTokensMutation } from "../api/oauthCallback.mutations";

const Callback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
  const { mutateAsync: setTokens } = useSetTokensMutation();
  const { data: callbackUrl } = useSuspenseQuery(authQueries.getCallbackUrl);

  const { mutateAsync: deleteCallbackUrl } = useDeleteCallbackUrlMutation();

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      router.replace("/auth");
      return;
    }
    setTokens({ accessToken, refreshToken }).then(() => {
      deleteCallbackUrl().then(() => {
        router.replace(callbackUrl.callbackUrl || DEFAULT_AUTH_CALLBACK_URL);
      });
    });
  }, [accessToken, callbackUrl.callbackUrl, deleteCallbackUrl, refreshToken, router, setTokens]);

  return <Loading isShow />;
};

export default Callback;
