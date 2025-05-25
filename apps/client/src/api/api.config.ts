import type { ApiClientOptions } from "./types";

const endpoints = {
  partners: `/partners`,
  partnerProfile: (partnerSlug: string) => `/partners/profile/${partnerSlug}`,
  partnerNeeds: (partnerSlug: string) => `/goods/${partnerSlug}/goods`,
  partnerEvents: (partnerSlug: string) => `/events/partner/${partnerSlug}`,
  blogPosts: `/posts`,
  blogPost: (slug: string) => `/posts/${slug}`,
} as const;

const apiClientOptions: ApiClientOptions = {
  baseUrl: process.env.API_URL!,
} as const;

const blogApiClientOptions: ApiClientOptions = {
  baseUrl: process.env.NEXT_PUBLIC_CMS_API_URL! + "/api",
  authToken: process.env.CMS_ACCESS_TOKEN,
} as const;

export { endpoints, apiClientOptions, blogApiClientOptions };
