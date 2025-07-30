import { deleteAuthServer, patchAuthServer, postAuthServer } from "@/shared/api/auth/authApiServer";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import {
  ActiveCoupleDTO,
  CoupleConnectionRequestDTO,
  FirstMetDateUpdateDTO,
  RestoreCoupleDTO,
} from "./couple.interface";

export const connectCoupleApi = async (body: CoupleConnectionRequestDTO) =>
  postAuthServer("/api/couples", { body, revalidateTags: ["user", "couple"] }).then((res) =>
    res.json<ApiResponseDTO<ActiveCoupleDTO>>(),
  );

export const setFirstMetDateApi = async (body: FirstMetDateUpdateDTO) =>
  patchAuthServer("/api/couples/first-met-date", { body, revalidateTags: ["user", "couple"] }).then((res) =>
    res.json<ApiResponseDTO<ActiveCoupleDTO>>(),
  );

export const breakupCoupleApi = async () =>
  deleteAuthServer("/api/couples", { revalidateTags: ["user", "couple"] }).then((res) =>
    res.json<ApiResponseDTO<null>>(),
  );

export const restoreCoupleApi = async (body: RestoreCoupleDTO) =>
  postAuthServer("/api/couples/restore", { body, revalidateTags: ["couple"] }).then((res) =>
    res.json<ApiResponseDTO<null>>(),
  );
