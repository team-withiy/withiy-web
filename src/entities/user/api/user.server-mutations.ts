"use server";

import { deleteAuthServer, patchAuthServer, postAuthServer } from "@/shared/api/auth/authApiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { ProfileResponseDTO, ProfileUpdateDTO, RegisterUserInDTO, RestoreAccountDTO } from "./user.interface";

export const logoutApi = async () =>
  postAuthServer("/api/users/logout", { revalidateTags: ["user"] }).then((res) => res.json<ApiResponseDTO<null>>());

export const restoreUserApi = async (body: RestoreAccountDTO) =>
  postAuthServer("/api/users/restore", { body, revalidateTags: ["user"] }).then((res) =>
    res.json<ApiResponseDTO<null>>(),
  );

export const registerUserApi = async (body: RegisterUserInDTO) =>
  postAuthServer("/api/users/me", { body, revalidateTags: ["user"] }).then((res) => res.json<ApiResponseDTO<null>>());

export const updateProfileApi = async (body: ProfileUpdateDTO) =>
  patchAuthServer("/api/users/profile", { body, revalidateTags: ["user"] }).then((res) =>
    res.json<ApiResponseDTO<ProfileResponseDTO>>(),
  );

export const deleteUserApi = async () =>
  deleteAuthServer("/api/users/me", { revalidateTags: ["user"] }).then((res) => res.json<ApiResponseDTO<null>>());
