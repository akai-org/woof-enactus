import type { ApiClientOptions } from "./types";

const endpoints = {
  partners: `/partners`,
  partnerProfile: (partnerSlug: string) => `/partners/profile/${partnerSlug}`,
  partnerNeeds: (partnerSlug: string) => `/goods/${partnerSlug}/goods`,
  partnerEvents: (partnerSlug: string) => `/events/partner/${partnerSlug}`,
  blogPosts: `/posts`,
  blogPost: `/posts`, //TODO: Change it. Currenty it uses search params (from cms) to return single posts.
} as const;

const apiClientOptions: ApiClientOptions = {
  baseUrl: process.env.API_URL!,
} as const;

const blogApiClientOptions: ApiClientOptions = {
  baseUrl: process.env.NEXT_PUBLIC_BLOG_API_URL! + "/api",
  globalFetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.BLOG_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  },
} as const;

export { endpoints, apiClientOptions, blogApiClientOptions };
