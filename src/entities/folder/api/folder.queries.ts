import { createQueryKeys } from "@lukemorales/query-key-factory";

import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import type { FolderOptionDTO } from "./folder.interface";

export const folderQueries = createQueryKeys("folder", {
  getPlaceFolders: (placeId: number) => ({
    queryKey: ["getPlaceFolders", placeId],
    queryFn: () =>
      authApiClient.get("api/folders/select", { searchParams: { placeId } }).json<ApiResponseDTO<FolderOptionDTO[]>>(),
  }),
});
