"use server";

import { redirect } from "next/navigation";

import type { RegisterUserInDTO } from "@/entities/user/api/user.interface";
import { registerUserApi } from "@/entities/user/api/user.server-mutations";

import { isStatusError } from "@/shared/lib/http";

// TODO: 커플 연결 페이지 연결
export const registerAction = async (data: RegisterUserInDTO) => {
  const { message, status } = await registerUserApi(data);
  if (isStatusError(status)) return message;
  redirect("/");
};
