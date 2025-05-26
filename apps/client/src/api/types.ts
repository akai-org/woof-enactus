type ApiClientOptions = Readonly<{
  baseUrl: string;
  globalFetchOptions?: RequestInit;
  authToken?: string;
}>;

interface IApiClient {
  readonly baseUrl: string;
  get<T>(endpoint: string, params?: string): Promise<ApiResult<T>>;
}

type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

interface ApiErrorDetails {
  statusCode: number;
  message: string;
  error: string;
  endpoint: string;
}

type ApiResult<T> = Result<T, ApiErrorDetails>;

export type { ApiClientOptions, IApiClient };
export type { Result, ApiResult, ApiErrorDetails };
