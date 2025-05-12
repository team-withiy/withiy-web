"use server";

import { redirect } from "next/navigation";

import { restoreUserApi } from "@/entities/user/api/user.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

export const cancelRestoreAction = async () => {
  try {
    await restoreUserApi({ restore: false });
    redirect("/auth/register");
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};

export const restoreAction = async () => {
  try {
    await restoreUserApi({ restore: true });
    redirect("/auth/register");
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};
