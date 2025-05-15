import type {
  IApiClient,
  PartnerData,
  PartnerEvent,
  PartnerNeeds,
  PartnersParams,
} from "@/types";

export class PartnerService {
  private readonly _apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this._apiClient = apiClient;
  }

  async getAll(
    params?: Partial<PartnersParams>,
  ): Promise<PartnerData[] | null> {
    const searchParams = new URLSearchParams(params);

    return this._apiClient.get<PartnerData[]>(
      "/partners",
      searchParams.toString(),
    );
  }

  async getProfile(slug: string): Promise<PartnerData | null> {
    return this._apiClient.get(`/partners/profile/${slug}`);
  }

  async getNeededGoods(slug: string): Promise<PartnerNeeds | null> {
    return this._apiClient.get(`/goods/${slug}/goods`);
  }

  async getEvents(slug: string): Promise<PartnerEvent[] | null> {
    return this._apiClient.get(`/events/partner/${slug}`);
  }
}
