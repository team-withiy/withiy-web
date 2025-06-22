import { deleteAuthServer, patchAuthServer, postAuthServer } from "@/shared/api/auth/authApiServer";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import { CoupleConnectionRequestDTO, CoupleDTO, FirstMetDateUpdateDTO } from "./couple.interface";

export const connectCoupleApi = async (body: CoupleConnectionRequestDTO) =>
  postAuthServer("/api/couples", { body, revalidateTags: ["user", "couple"] }).then((res) =>
    res.json<ApiResponseDTO<CoupleDTO>>(),
  );

export const setFirstMetDateApi = async (body: FirstMetDateUpdateDTO) =>
  patchAuthServer("/api/couples/first-met-date", { body, revalidateTags: ["user", "couple"] }).then((res) =>
    res.json<ApiResponseDTO<CoupleDTO>>(),
  );

export const breakupCoupleApi = async () =>
  deleteAuthServer("/api/couples", { revalidateTags: ["user", "couple"] }).then((res) =>
    res.json<ApiResponseDTO<null>>(),
  );
