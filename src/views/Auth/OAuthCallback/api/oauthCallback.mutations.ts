"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userQueries } from "@/entities/user/api/user.queries";

import { deleteCallbackUrlApi, setTokensApi } from "@/shared/api/auth/auth.mutations";

export const useSetTokensMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setTokensApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userQueries._def });
    },
  });
};

export const useDeleteCallbackUrlMutation = () =>
  useMutation({
    mutationFn: deleteCallbackUrlApi,
  });
