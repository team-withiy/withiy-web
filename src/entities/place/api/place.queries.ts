import { createQueryKeys } from "@lukemorales/query-key-factory";

import type { PhotoDTO } from "@/entities/photo/api/@x/place";
import type { ReviewDTO } from "@/entities/review/api/@x/place";

import { apiClient } from "@/shared/api/apiClient";
import { authApiClient } from "@/shared/api/auth/authApiClient";
import type { ApiResponseDTO, CursorPageParam, CursorPaginationResponseDTO } from "@/shared/api/common.interface";
import { DEFAULT_PAGINATE_LIMIT } from "@/shared/constants/api";
import { getSearchParams } from "@/shared/lib/searchParams";

import type { PaginateReviewsParams } from "./place.interface";

export const placeQueries = createQueryKeys("place", {
  getPlaceBookmark: (placeId: number) => ({
    queryKey: ["getPlaceBookmark", placeId],
    queryFn: () => authApiClient.get(`api/places/${placeId}/bookmarks`).json<ApiResponseDTO<boolean>>(),
  }),
  paginateReviews: ({ placeId, ...params }: PaginateReviewsParams) => ({
    queryKey: ["paginateReviews", placeId, params],
    queryFn: ({ pageParam }) =>
      apiClient
        .get(`api/places/${placeId}/reviews`, {
          searchParams: getSearchParams({
            ...params,
            ...(pageParam as CursorPageParam),
            limit: DEFAULT_PAGINATE_LIMIT,
          }),
        })
        .json<CursorPaginationResponseDTO<ReviewDTO>>(),
  }),
  paginatePhotos: (placeId: number) => ({
    queryKey: ["paginatePhotos", placeId],
    queryFn: ({ pageParam }) =>
      apiClient
        .get(`api/places/${placeId}/photos`, {
          searchParams: getSearchParams({ ...(pageParam as CursorPageParam), limit: DEFAULT_PAGINATE_LIMIT }),
        })
        .json<CursorPaginationResponseDTO<PhotoDTO>>(),
  }),
});
