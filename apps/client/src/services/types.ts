import type { Result } from "@/api";
import type {
  IBlogPost,
  PartnerData,
  PartnerEvent,
  PartnerNeeds,
  PartnersParams,
} from "@/types";

interface ServiceError {
  userMessage: string;
}

interface IPartnerService {
  getAll(
    params?: Partial<PartnersParams>,
  ): Promise<Result<PartnerData[], ServiceError>>;
  getProfile(slug: string): Promise<Result<PartnerData, ServiceError>>;
  getNeeds(slug: string): Promise<Result<PartnerNeeds, ServiceError>>;
  getEvents(slug: string): Promise<Result<PartnerEvent[], ServiceError>>;
}

interface IBlogService {
  getPosts(): Promise<Result<IBlogPost[], ServiceError>>;
  getPost(slug: string): Promise<Result<IBlogPost, ServiceError>>;
}

export type { ServiceError, IPartnerService, IBlogService };
