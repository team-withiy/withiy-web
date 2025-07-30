"use server";

import { redirect } from "next/navigation";

import { restoreCoupleApi } from "@/entities/couple/api/couple.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

export const cancelRestoreCoupleAction = async () => {
  try {
    await restoreCoupleApi({ restore: false });
    redirect("/my-page/couples/unconnected");
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};

export const restoreCoupleAction = async () => {
  try {
    await restoreCoupleApi({ restore: true });
    redirect("/my-page/couples/unconnected/restore/complete");
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};
