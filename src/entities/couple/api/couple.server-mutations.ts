import { postAuthServer } from "@/shared/api/auth/authApiServer";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import { CoupleConnectionRequestDTO, CoupleDTO } from "./couple.interface";

export const connectCoupleApi = async (body: CoupleConnectionRequestDTO) =>
  postAuthServer("/api/couples", { body, revalidateTags: ["user"] }).then((res) =>
    res.json<ApiResponseDTO<CoupleDTO>>(),
  );
