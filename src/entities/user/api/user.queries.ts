import { createQueryKeys } from "@lukemorales/query-key-factory";

import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import { UserDTO, UserNotificationSettingResponseDTO } from "./user.interface";

export const userQueries = createQueryKeys("user", {
  getMe: {
    queryKey: ["getMe"],
    queryFn: () => authApiClient.get("api/users/me").json<ApiResponseDTO<UserDTO>>(),
  },
  getNotificationSettings: {
    queryKey: ["getNotificationSettings"],
    queryFn: () =>
      authApiClient.get("api/users/notifications/settings").json<ApiResponseDTO<UserNotificationSettingResponseDTO>>(),
  },
});
