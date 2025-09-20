import { createQueryKeys } from "@lukemorales/query-key-factory";

import type { PlaceSummaryDTO } from "@/entities/place/api/@x/folder";

import { authApiClient } from "@/shared/api/auth/authApiClient";
import type { ApiResponseDTO, CursorPageParam, CursorPaginationResponseDTO } from "@/shared/api/common.interface";
import { getSearchParams } from "@/shared/lib/searchParams";

import type { FolderOptionDTO, FolderSummaryDTO } from "./folder.interface";

export const folderQueries = createQueryKeys("folder", {
  getFolders: {
    queryKey: ["getFolders"],
    queryFn: () => authApiClient.get("api/folders").json<ApiResponseDTO<FolderSummaryDTO[]>>(),
  },
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
