import ky, { HTTPError } from "ky";

import type { ErrorDTO } from "./common.interface";

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  retry: 0,
});

export const isKyHTTPError = (error: unknown): error is HTTPError<ErrorDTO> => {
  return error instanceof HTTPError;
};

export const getKyHTTPError = async (error: HTTPError<ErrorDTO>) => {
  return await error.response.json<ErrorDTO>();
};
