"use server";

import { redirect } from "next/navigation";

import { breakupCoupleApi } from "@/entities/couple/api/couple.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

export const breakupCoupleAction = async () => {
  try {
    await breakupCoupleApi();
    redirect("/");
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};
