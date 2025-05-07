"use server";

import { postAuthServer } from "@/shared/api/auth/authApiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { RestoreAccountDTO } from "./user.interface";

export const restoreUserApi = async (body: RestoreAccountDTO) =>
  postAuthServer("/api/users/restore", { body, revalidateTags: ["user"] }).then((res) =>
    res.json<ApiResponseDTO<null>>(),
  );
