import type {
  PartnerData,
  PartnerEvent,
  PartnerNeeds,
  PartnersParams,
} from "@/types";
import type { IPartnerService } from "@/services";
import { endpoints } from "@/api/api.config";
import type { ApiErrorDetails, IApiClient, Result } from "@/api";
import type { PartnerError } from "./types";

export class PartnerService implements IPartnerService {
  private readonly _apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this._apiClient = apiClient;
  }

  async getAll(
    params?: Partial<PartnersParams>,
  ): Promise<Result<PartnerData[], PartnerError>> {
    const searchParams = new URLSearchParams(params);

    const result = await this._apiClient.get<PartnerData[]>(
      endpoints.partners,
      searchParams.toString(),
    );

    if (!result.success) {
      const err = this.mapToPartnerError(
        result.error,
        "Nie udało się pobrać listy placówek.",
      );
      console.error(err);

      return {
        success: false,
        error: err,
      };
    }

    return result;
  }

  async getProfile(slug: string): Promise<Result<PartnerData, PartnerError>> {
    const result = await this._apiClient.get<PartnerData>(
      endpoints.partnerProfile(slug),
    );

    if (!result.success) {
      const err = this.mapToPartnerError(
        result.error,
        "Nie udało się pobrać profilu placówki",
      );
      console.error(err);

      return {
        success: false,
        error: err,
      };
    }

    return result;
  }

  async getNeeds(slug: string): Promise<Result<PartnerNeeds, PartnerError>> {
    const result = await this._apiClient.get<PartnerNeeds>(
      endpoints.partnerNeeds(slug),
    );

    if (!result.success) {
      const err = this.mapToPartnerError(
        result.error,
        "Nie udało się pobrać potrzeb placówki.",
      );
      console.error(err);

      return {
        success: false,
        error: err,
      };
    }

    return result;
  }

  async getEvents(slug: string): Promise<Result<PartnerEvent[], PartnerError>> {
    const result = await this._apiClient.get<PartnerEvent[]>(
      endpoints.partnerEvents(slug),
    );

    if (!result.success) {
      const err = this.mapToPartnerError(
        result.error,
        "Nie udało się pobrać wydarzeń placówki.",
      );
      console.error(err);

      return {
        success: false,
        error: err,
      };
    }

    return result;
  }

  private mapToPartnerError(
    apiError: ApiErrorDetails,
    userMessage: string,
  ): PartnerError {
    return {
      ...apiError,
      userMessage: this.getUserMessage(apiError.statusCode, userMessage),
    };
  }

  private getUserMessage(statusCode: number, defaultMessage: string): string {
    switch (statusCode) {
      case 404:
        return "Nie znaleziono placówki.";
      case 401:
        return "Brak dostępu do danych placówki.";
      case 500:
        return "Wystąpił błąd serwera.";
      default:
        return defaultMessage;
    }
  }
}
