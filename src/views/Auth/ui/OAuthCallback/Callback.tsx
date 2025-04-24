"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import { authQueries } from "@/shared/api/auth/auth.queries";

const Callback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
  const { data } = useSuspenseQuery(authQueries.authCallback({ accessToken, refreshToken }));

  useEffect(() => {
    if (!data.accessToken || !data.refreshToken) router.replace("/auth");
    else router.replace("/");
  }, [data.accessToken, data.refreshToken, router]);

  return null;
};

export default Callback;
