"use server";

import { getServer } from "@/shared/api/apiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { CategoryDTO } from "./category.interface";

export const getCategoriesApi = async () =>
  await getServer<ApiResponseDTO<CategoryDTO[]>>("/api/categories", {
    tags: ["category", "/api/categories"],
    cache: "force-cache",
  });
