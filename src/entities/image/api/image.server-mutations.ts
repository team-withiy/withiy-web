"use server";

import { postAuthServer } from "@/shared/api/auth/authApiServer";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import type { ImageResponseDTO, UploadImageDTO } from "./image.interface";

export const uploadImageApi = async ({ file, ...params }: UploadImageDTO) => {
  const body = new FormData();
  body.append("file", file);

  const response = await postAuthServer("/api/images", {
    body,
    params,
    isFormData: true,
  });

  return await response.json<ApiResponseDTO<ImageResponseDTO>>();
};
