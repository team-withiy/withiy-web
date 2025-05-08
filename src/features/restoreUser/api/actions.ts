"use server";

import { redirect } from "next/navigation";

import { restoreUserApi } from "@/entities/user/api/user.server-mutations";

import { isStatusError } from "@/shared/lib/http";

export const cancelRestoreAction = async () => {
  const { message, status } = await restoreUserApi({ restore: false });
  if (isStatusError(status)) return message;
  redirect("/auth/register");
};

export const restoreAction = async () => {
  const { message, status } = await restoreUserApi({ restore: true });
  if (isStatusError(status)) return message;
  redirect("/users/restore/complete");
};
