export interface ApiResponseDTO<T> {
  status: number;
  message: string;
  data: T;
  timestamp: Date;
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
