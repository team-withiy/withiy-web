import { createQueryKeys } from "@lukemorales/query-key-factory";

import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import { UserDTO } from "./user.interface";

export const userQueries = createQueryKeys("user", {
  getMe: (num: number) => ({
    queryKey: ["getMe", num],
    queryFn: () => authApiClient.get("api/users/me").json<ApiResponseDTO<UserDTO>>(),
  }),
});
