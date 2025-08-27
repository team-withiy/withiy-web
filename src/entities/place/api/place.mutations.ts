import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import type { UpdatePlaceBookmarkDTO } from "./place.interface";

export const updatePlaceBookmarkApi = ({ placeId, ...json }: UpdatePlaceBookmarkDTO) =>
  authApiClient.put(`api/places/${placeId}/bookmarks`, { json }).then((res) => res.json<ApiResponseDTO<null>>());
