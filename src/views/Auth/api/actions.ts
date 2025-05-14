"use server";

import { redirect } from "next/navigation";

import type { RegisterUserInDTO } from "@/entities/user/api/user.interface";
import { registerUserApi } from "@/entities/user/api/user.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

// TODO: 커플 연결 페이지 연결
export const registerAction = async (data: RegisterUserInDTO) => {
  try {
    await registerUserApi(data);
    redirect("/");
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};
