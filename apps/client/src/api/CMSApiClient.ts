import { strapi, type StrapiClient } from "@strapi/client";
import type { ApiClientOptions, ApiResult, IApiClient } from "./types";

export class CMSApiClient implements IApiClient {
  private readonly _baseUrl: string;
  private readonly _authToken?: string;

  private _cmsClient: StrapiClient | null = null;

  constructor({ baseUrl, authToken }: ApiClientOptions) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  private get client(): StrapiClient {
    if (!this._cmsClient) {
      this._cmsClient = strapi({
        baseURL: this._baseUrl,
        auth: this._authToken,
      });
    }
    return this._cmsClient;
  }

  async get<T>(endpoint: string, params?: string): Promise<ApiResult<T>> {
    try {
      const parts = endpoint.split("/").filter(Boolean);
      const searchParams = params ? JSON.parse(params) : {};

      const collectionName = parts[0];
      const posts = this.client.collection(collectionName);

      if (parts.length > 2)
        throw new Error("provided endpoint contains more than 2 parts!");

      const getAllPosts = parts.length === 1;

      const res = getAllPosts
        ? await posts.find({ populate: "*", ...searchParams })
        : await posts.find({
            // uses find() with filters prop as findOne()
            populate: "*",
            filters: {
              slug: {
                $eq: parts[1],
              },
            },
            ...searchParams,
          });

      // special case - getting single post from find() return value
      if (!getAllPosts && Array.isArray(res.data)) {
        const [post] = res.data;
        if (!post) {
          return {
            success: false,
            error: {
              statusCode: 404,
              message: "Post not found",
              endpoint,
              error: "Not found",
            },
          };
        }
        return {
          success: true,
          data: post as T,
        };
      }

      return {
        success: true,
        data: res.data as T,
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
