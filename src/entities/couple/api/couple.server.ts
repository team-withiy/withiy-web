import { getAuthServer } from "@/shared/api/auth/authApiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { ActiveCoupleDTO } from "./couple.interface";

export const getCoupleApi = async () =>
  getAuthServer("/api/couples", { tags: ["couple", "/api/couples"], cache: "no-store" }).then((res) =>
    res.json<ApiResponseDTO<ActiveCoupleDTO>>(),
  );
