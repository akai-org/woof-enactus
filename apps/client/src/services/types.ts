import type { Result } from "@/api";
import type {
  PartnerData,
  PartnerEvent,
  PartnerNeeds,
  PartnersParams,
} from "@/types";

interface PartnerError {
  userMessage: string;
}

interface IPartnerService {
  getAll(
    params?: Partial<PartnersParams>,
  ): Promise<Result<PartnerData[], PartnerError>>;
  getProfile(slug: string): Promise<Result<PartnerData, PartnerError>>;
  getNeeds(slug: string): Promise<Result<PartnerNeeds, PartnerError>>;
  getEvents(slug: string): Promise<Result<PartnerEvent[], PartnerError>>;
}

export type { PartnerError, IPartnerService };
