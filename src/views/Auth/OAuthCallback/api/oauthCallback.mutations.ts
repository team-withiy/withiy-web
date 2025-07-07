"use client";

import { useMutation } from "@tanstack/react-query";

import { deleteCallbackUrlApi } from "@/shared/api/auth/auth.mutations";

export const useDeleteCallbackUrlMutation = () =>
  useMutation({
    mutationFn: deleteCallbackUrlApi,
  });
