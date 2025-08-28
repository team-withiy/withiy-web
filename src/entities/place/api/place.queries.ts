import { createQueryKeys } from "@lukemorales/query-key-factory";

import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

export const placeQueries = createQueryKeys("place", {
  getPlaceBookmark: (placeId: number) => ({
    queryKey: ["getPlaceBookmark", placeId],
    queryFn: () => authApiClient.get(`api/places/${placeId}/bookmarks`).json<ApiResponseDTO<boolean>>(),
  }),
});
