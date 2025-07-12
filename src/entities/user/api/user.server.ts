"use server";

import { getAuthServer } from "@/shared/api/auth/authApiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { UserDTO, UserNotificationSettingResponseDTO, UserProfileResponseDTO } from "./user.interface";

export const getMeApi = async () =>
  getAuthServer("/api/users/me", { tags: ["user", "/api/users/me"], cache: "no-store" }).then((res) =>
    res.json<ApiResponseDTO<UserDTO>>(),
  );

export const getUserProfileByCodeApi = async (userCode: string) =>
  getAuthServer(`/api/users/profile/${userCode}`, {
    tags: ["user", `/api/users/profile/${userCode}`],
    cache: "no-store",
  }).then((res) => res.json<ApiResponseDTO<UserProfileResponseDTO>>());

export const getNotificationSettingsApi = async () =>
  getAuthServer("/api/users/notifications/settings", {
    cache: "no-store",
    tags: ["user", "/api/users/notifications/settings"],
  }).then((res) => res.json<ApiResponseDTO<UserNotificationSettingResponseDTO>>());
