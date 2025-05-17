import type { ApiClientOptions } from "./types";

const endpoints = {
  partners: `/partners`,
  partnerProfile: (partnerSlug: string) => `/partners/profile/${partnerSlug}`,
  partnerNeeds: (partnerSlug: string) => `/goods/${partnerSlug}/goods`,
  partnerEvents: (partnerSlug: string) => `/events/partner/${partnerSlug}`,
} as const;

const apiClientOptions: ApiClientOptions = {
  baseUrl: process.env.API_URL!,
} as const;

export { endpoints, apiClientOptions };
