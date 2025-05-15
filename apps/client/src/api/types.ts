import type {
  PartnerData,
  PartnerEvent,
  PartnerNeeds,
  PartnersParams,
} from "@/types";

type ApiClientOptions = Readonly<{
  baseUrl: string;
  globalFetchOptions?: RequestInit;
}>;

interface IApiClient {
  readonly baseUrl: string;
  get<T>(endpoint: string, params?: string): Promise<T | null>;
}

interface IPartnerService {
  getAll(params?: Partial<PartnersParams>): Promise<PartnerData[] | null>;
  getProfile(slug: string): Promise<PartnerData | null>;
  getNeeds(slug: string): Promise<PartnerNeeds | null>;
  getEvents(slug: string): Promise<PartnerEvent[] | null>;
}

export type { ApiClientOptions, IApiClient, IPartnerService };
