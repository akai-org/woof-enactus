import { PartnersApi } from "woof-api-client";

export const api = new PartnersApi({
  basePath: process.env.API_URL,
});
