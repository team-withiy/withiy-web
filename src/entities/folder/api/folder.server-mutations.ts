"use server";

import { postAuthServer } from "@/shared/api/auth/authApiServer";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import type { CreateFolderDTO, FolderSummaryDTO } from "./folder.interface";

export const createFolderApi = async (body: CreateFolderDTO) =>
  postAuthServer("/api/folders", { body }).then((res) => res.json<ApiResponseDTO<FolderSummaryDTO>>());
