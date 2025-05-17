import type {
  PartnerData,
  PartnerEvent,
  PartnerNeeds,
  PartnersParams,
} from "@/types";
import type { IApiClient, IPartnerService } from "./types";
import { endpoints } from "./api.config";

export class PartnerService implements IPartnerService {
  private readonly _apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this._apiClient = apiClient;
  }

  async getAll(
    params?: Partial<PartnersParams>,
  ): Promise<PartnerData[] | null> {
    const searchParams = new URLSearchParams(params);

    return this._apiClient.get<PartnerData[]>(
      endpoints.partners,
      searchParams.toString(),
    );
  }

  async getProfile(slug: string): Promise<PartnerData | null> {
    return this._apiClient.get(endpoints.partnerProfile(slug));
  }

  async getNeeds(slug: string): Promise<PartnerNeeds | null> {
    return this._apiClient.get(endpoints.partnerNeeds(slug));
  }

  async getEvents(slug: string): Promise<PartnerEvent[] | null> {
    return this._apiClient.get(endpoints.partnerEvents(slug));
  }
}
