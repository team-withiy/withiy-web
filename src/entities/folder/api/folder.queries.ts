import { createQueryKeys } from "@lukemorales/query-key-factory";

import { PlaceSummaryDTO } from "@/entities/place/api/place.interface";

import { authApiClient } from "@/shared/api/auth/authApiClient";
import type { ApiResponseDTO, CursorPageParam, CursorPaginationResponseDTO } from "@/shared/api/common.interface";
import { getSearchParams } from "@/shared/lib/searchParams";

import type { FolderOptionDTO } from "./folder.interface";

export const folderQueries = createQueryKeys("folder", {
  getPlaceFolders: (placeId: number) => ({
    queryKey: ["getPlaceFolders", placeId],
    queryFn: () =>
      authApiClient.get("api/folders/select", { searchParams: { placeId } }).json<ApiResponseDTO<FolderOptionDTO[]>>(),
  }),
  paginateFolders: {
    queryKey: ["paginateFolders"],
    queryFn: ({ pageParam }) =>
      authApiClient
        .get("api/folders/all", { searchParams: getSearchParams({ ...(pageParam as CursorPageParam), limit: 10 }) })
        .json<CursorPaginationResponseDTO<PlaceSummaryDTO>>(),
  },
});
