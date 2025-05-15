import type { ApiClientOptions, GenericResponse, IApiClient } from "@/types";

export class ApiClient implements IApiClient {
  private readonly _baseUrl: string;
  private readonly _globalFetchOptions: RequestInit | null;

  constructor({ baseUrl, globalFetchOptions }: ApiClientOptions) {
    this._baseUrl = baseUrl;
    this._globalFetchOptions = globalFetchOptions ?? null;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  async get<T>(
    endpoint: string,
    params?: string,
    fetchOptions?: RequestInit,
  ): Promise<T | null> {
    try {
      const res = await fetch(
        `${this._baseUrl}${endpoint}${params ? `?${params}` : ""}`,
        { ...this._globalFetchOptions, ...fetchOptions },
      );
      const { data, ok }: GenericResponse<T> = await res.json();

      if (!res.ok || !ok || !data) {
        throw new Error();
      }

      return data;
    } catch {
      console.error("error in getPartnerProfile");
      return null;
    }
  }
}
