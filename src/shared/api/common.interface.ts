export interface ApiResponseDTO<T> {
  status: number;
  message: string;
  data: T;
  timestamp: Date;
}

export interface ErrorDTO {
  timestamp: Date;
  status: number;
  error: string;
  path: string;
}
