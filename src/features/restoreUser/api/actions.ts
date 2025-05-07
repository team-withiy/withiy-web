"use server";

import { redirect } from "next/navigation";

import { restoreUserApi } from "@/entities/user/api/user.server-mutations";

export const cancelRestoreAction = async () => {
  await restoreUserApi({ restore: false });
  redirect("/auth/register");
};

export const restoreAction = async () => {
  await restoreUserApi({ restore: true });
  redirect("/users/restore/complete");
};
