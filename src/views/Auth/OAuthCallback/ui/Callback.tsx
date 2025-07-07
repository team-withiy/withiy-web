"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import { authQueries } from "@/shared/api/auth/auth.queries";
import { DEFAULT_AUTH_CALLBACK_URL } from "@/shared/constants/auth";
import Loading from "@/shared/ui/Loading";

import { useDeleteCallbackUrlMutation } from "../api/oauthCallback.mutations";

const Callback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
  const { data: tokens } = useSuspenseQuery(authQueries.authCallback({ accessToken, refreshToken }));
  const { data: callbackUrl } = useSuspenseQuery(authQueries.getCallbackUrl);

  const { mutateAsync: deleteCallbackUrl } = useDeleteCallbackUrlMutation();

  useEffect(() => {
    if (!tokens.accessToken || !tokens.refreshToken) router.replace("/auth");
    else {
      deleteCallbackUrl().then(() => {
        router.replace(callbackUrl.callbackUrl || DEFAULT_AUTH_CALLBACK_URL);
      });
    }
  }, [tokens, router, callbackUrl, deleteCallbackUrl]);

  return <Loading isShow />;
};

export default Callback;
