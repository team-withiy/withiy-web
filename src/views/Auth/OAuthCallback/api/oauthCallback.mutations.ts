"use client";

import { useMutation } from "@tanstack/react-query";

import { deleteCallbackUrlApi, setTokensApi } from "@/shared/api/auth/auth.mutations";

export const useSetTokensMutation = () =>
  useMutation({
    mutationFn: setTokensApi,
  });

export const useDeleteCallbackUrlMutation = () =>
  useMutation({
    mutationFn: deleteCallbackUrlApi,
  });
