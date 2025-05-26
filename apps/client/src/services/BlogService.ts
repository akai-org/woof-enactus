import type { IBlogService } from "@/services";
import { endpoints } from "@/api/api.config";
import type { IApiClient, Result } from "@/api";
import type { IBlogPost } from "@/types";
import type { ServiceError } from "./types";

export class BlogService implements IBlogService {
  private readonly _apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this._apiClient = apiClient;
  }

  async getPosts(): Promise<Result<IBlogPost[], ServiceError>> {
    const result = await this._apiClient.get<IBlogPost[]>(endpoints.blogPosts);

    if (!result.success) {
      const errMsg = this.getUserMessage(
        result.error.statusCode,
        "Nie udało się pobrać artykułów.",
      );

      console.error(result.error);

      return {
        success: false,
        error: {
          userMessage: errMsg,
        },
      };
    }
    return result;
  }

  async getPost(slug: string): Promise<Result<IBlogPost, ServiceError>> {
    const result = await this._apiClient.get<IBlogPost>(
      endpoints.blogPost(slug),
    );

    if (!result.success) {
      const errMsg = this.getUserMessage(
        result.error.statusCode,
        "Nie udało się pobrać zawartości artykułu.",
      );

      console.error(result.error);

      return {
        success: false,
        error: {
          userMessage: errMsg,
        },
      };
    }
    return result;
  }

  private getUserMessage(statusCode: number, defaultMessage: string): string {
    switch (statusCode) {
      case 404:
        return "Nie znaleziono artykułu.";
      case 500:
        return "Wystąpił błąd serwera.";
      default:
        return defaultMessage;
    }
  }
}
