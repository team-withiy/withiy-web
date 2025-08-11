import { getServer } from "@/shared/api/apiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { PlaceDetailDTO } from "./place.interface";

export const getPlaceDetailApi = (placeId: number) =>
  getServer(`/api/places/detail/${placeId}`, {
    cache: "force-cache",
    tags: ["place", `places/${placeId}`],
  }).then((res) => res.json<ApiResponseDTO<PlaceDetailDTO>>());
