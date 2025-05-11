"use server";

import { getServer } from "@/shared/api/apiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

import type { TermDTO } from "./term.interface";

export const getTermsApi = async () =>
  getServer("/api/term", { tags: ["term", "/api/term"], cache: "force-cache" }).then((res) =>
    res.json<ApiResponseDTO<TermDTO[]>>(),
  );
