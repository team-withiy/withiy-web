export interface ApiResponseDTO<T> {
  status: number;
  message: string;
  data: T;
  timestamp: Date;
}

export interface CursorPaginationRequestDTO {
  cursor?: number;
  limit: number;
  prev?: boolean;
}

export interface MockCursorPaginationRequestParams {
  cursor: string | undefined;
  limit: string;
  prev: string | undefined;
}

export interface CursorPageParam {
  cursor: number | null | undefined;
  prev: boolean;
}

export interface CursorPaginationResponseDTO<T> {
  status: number;
  message: string;
  data: T[];
  hasPrev: boolean;
  hasNext: boolean;
  total: number;
  prevCursor: number | null;
  nextCursor: number | null;
}

export interface InfiniteDataMeta extends Pick<CursorPaginationResponseDTO<unknown>, "status" | "message" | "total"> {}

export interface InfiniteDataWithMeta<T> {
  data: T[];
  meta: InfiniteDataMeta;
}

export interface ErrorDTO {
  timestamp: Date;
  status: number;
  message: string;
}

export const enum FormActionStatus {
  Default = "default",
  Success = "success",
  Error = "error",
}

type FormActionStateDefault = {
  status: FormActionStatus.Default;
};

type FormActionStateSuccess<T> = {
  status: FormActionStatus.Success;
  data?: T;
};

type FormActionStateError = {
  status: FormActionStatus.Error;
  message: string;
};

export type FormActionState<T = undefined> = FormActionStateSuccess<T> | FormActionStateError | FormActionStateDefault;
