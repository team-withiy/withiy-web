"use server";

import { deleteAuthServer, patchAuthServer, postAuthServer } from "@/shared/api/auth/authApiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type {
  NotificationSettingRequestDTO,
  ProfileResponseDTO,
  ProfileUpdateDTO,
  RegisterUserInDTO,
  RestoreAccountDTO,
} from "./user.interface";

export const logoutApi = async () =>
  postAuthServer("/api/users/logout", {}).then((res) => res.json<ApiResponseDTO<null>>());

export const restoreUserApi = async (body: RestoreAccountDTO) =>
  postAuthServer("/api/users/restore", { body }).then((res) => res.json<ApiResponseDTO<null>>());

export const registerUserApi = async (body: RegisterUserInDTO) =>
  postAuthServer("/api/users/me", { body }).then((res) => res.json<ApiResponseDTO<null>>());

export const updateProfileApi = async (body: ProfileUpdateDTO) =>
  patchAuthServer("/api/users/profile", { body }).then((res) => res.json<ApiResponseDTO<ProfileResponseDTO>>());

export const deleteUserApi = async () =>
  deleteAuthServer("/api/users/me", {}).then((res) => res.json<ApiResponseDTO<null>>());

export const updateNotificationSettingsApi = async (body: NotificationSettingRequestDTO) =>
  patchAuthServer("/api/users/notifications/settings", {
    body,
  }).then((res) => res.json<ApiResponseDTO<null>>());
