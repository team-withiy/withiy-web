"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { setCallbackUrlApi } from "@/shared/api/auth/auth.mutations";

// TODO: 커플의 경우 처리 방식을 다르게 해야할 것
export const useSetCallbackUrlMutation = (redirectUrl: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: setCallbackUrlApi,
    onSuccess: () => {
      router.push(redirectUrl);
    },
  });
};
