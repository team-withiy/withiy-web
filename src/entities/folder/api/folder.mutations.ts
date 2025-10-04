import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import type { CreateFolderDTO, FolderSummaryDTO, UpdateFolderDTO } from "./folder.interface";

export const createFolderApi = (json: CreateFolderDTO) =>
  authApiClient.post("api/folders", { json }).json<ApiResponseDTO<FolderSummaryDTO>>();

export const updateFolderApi = ({ folderId, ...json }: UpdateFolderDTO) =>
  authApiClient.patch(`api/folders/${folderId}`, { json }).json<ApiResponseDTO<null>>();

export const deleteFolderApi = (folderId: number) =>
  authApiClient.delete(`api/folders/${folderId}`).json<ApiResponseDTO<null>>();
