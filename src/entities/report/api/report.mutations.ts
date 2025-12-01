import { authApiClient } from "@/shared/api/auth/authApiClient";
import { ApiResponseDTO } from "@/shared/api/common.interface";

import { CreateReportRequestDTO } from "./report.interface";

export const createReportApi = (json: CreateReportRequestDTO) => {
  return authApiClient
    .post("api/reports", {
      json,
    })
    .then((res) => res.json<ApiResponseDTO<string>>());
};
