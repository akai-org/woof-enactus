import { strapi } from "@strapi/client";

const cmsClient = strapi({
  baseURL: `${process.env.NEXT_PUBLIC_CMS_API_URL}/api`,
  auth: process.env.CMS_ACCESS_TOKEN,
});

export { cmsClient };
