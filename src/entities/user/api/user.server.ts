"use server";

import { getAuthServer } from "@/shared/api/auth/authApiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { UserProfileResponseDTO } from "./user.interface";

export const getUserProfileByCodeApi = async (userCode: string) =>
  getAuthServer(`/api/users/profile/${userCode}`, {
    tags: ["user", `users/profile/${userCode}`],
    cache: "no-store",
  }).then((res) => res.json<ApiResponseDTO<UserProfileResponseDTO>>());
