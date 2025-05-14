"use server";

import { getAuthServer } from "@/shared/api/auth/authApiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { UserDTO } from "./user.interface";

export const getMeApi = async () =>
  getAuthServer("/api/users/me", { tags: ["user", "/api/users/me"], cache: "no-store" }).then((res) =>
    res.json<ApiResponseDTO<UserDTO>>(),
  );
