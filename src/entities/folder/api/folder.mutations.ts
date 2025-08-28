import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import type { CreateFolderDTO, FolderSummaryDTO } from "./folder.interface";

export const createFolderApi = (json: CreateFolderDTO) =>
  authApiClient.post("api/folders", { json }).json<ApiResponseDTO<FolderSummaryDTO>>();
