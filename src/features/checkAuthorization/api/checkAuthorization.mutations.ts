"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { setCallbackUrlApi } from "@/shared/api/auth/auth.mutations";

export const useSetCallbackUrlMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: setCallbackUrlApi,
    onSuccess: () => {
      router.push("/auth");
    },
  });
};
