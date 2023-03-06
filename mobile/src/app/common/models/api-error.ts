export interface ApiError {
  error: string;
  errorDescription: string;
}

export interface ApiErrorResponse {
  errors: ApiError[];
}

export interface ApiStandardResponse {
  data: any;
  errorCode?: number | string;
  message: string;
  success: boolean;
}
