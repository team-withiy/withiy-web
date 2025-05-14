import type { ErrorDTO } from "@/shared/api/common.interface";

export class FetchHTTPException extends Error {
  readonly status: number;
  readonly timestamp: Date;
  readonly message: string;

  constructor(errorDTO: ErrorDTO) {
    super(errorDTO.message);
    this.status = errorDTO.status;
    this.timestamp = errorDTO.timestamp;
    this.message = errorDTO.message;
  }
}

export const isFetchHTTPError = (error: unknown): error is FetchHTTPException => {
  return error instanceof FetchHTTPException;
};

export const getFetchHTTPError = async (response: Response) => {
  return await response.json<ErrorDTO>();
};
