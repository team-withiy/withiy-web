"use server";

import { deleteUserApi } from "@/entities/user/api/user.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

export const withdrawAction = async () => {
  try {
    await deleteUserApi();
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};
