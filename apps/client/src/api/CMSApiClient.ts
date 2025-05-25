import type { ApiClientOptions, ApiResult, IApiClient } from "./types";

export class CMSApiClient implements IApiClient {
  private readonly _baseUrl: string;
  private readonly _globalFetchOptions: RequestInit | undefined;

  constructor({ baseUrl, globalFetchOptions }: ApiClientOptions) {
    this._baseUrl = baseUrl;
    this._globalFetchOptions = globalFetchOptions;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  async get<T>(
    endpoint: string,
    params?: string,
    fetchOptions?: RequestInit,
  ): Promise<ApiResult<T>> {
    try {
      const searchParams = params ? `?${params}` : "";

      const res = await fetch(`${this._baseUrl}${endpoint + searchParams}`, {
        ...this._globalFetchOptions,
        ...fetchOptions,
      });

      if (!res.ok) {
        return {
          success: false,
          error: {
            statusCode: res.status,
            message: res.statusText,
            endpoint,
            error: "Response status code is not in the range of 200-299",
          },
        };
      }

      const data = await res.json();

      return {
        success: true,
        data: data.data,
      };
    } catch (err) {
      return {
        success: false,
        error: {
          statusCode: 500,
          message: err instanceof Error ? err.message : "Unknown error",
          endpoint,
          error: "Network or parsing error",
        },
      };
    }
  }
}
