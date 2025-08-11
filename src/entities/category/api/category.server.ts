"use server";

import { getServer } from "@/shared/api/apiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { CategoryDTO } from "./category.interface";

export const getCategoriesApi = async () =>
  getServer("/api/categories", {
    tags: ["category"],
    cache: "force-cache",
  }).then((res) => res.json<ApiResponseDTO<CategoryDTO[]>>());
