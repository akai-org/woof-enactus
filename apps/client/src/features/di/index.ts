import type { IApiClient } from "@/api";
import { ApiClient, CMSApiClient, config } from "@/api";
import { Container } from "./Container";
import { BlogService, PartnerService } from "@/services";

const container = new Container();

(() => {
  container.registerSingleton(
    "ApiClient",
    new ApiClient(config.apiClientOptions),
  );
  container.registerSingleton(
    "BlogApiClient",
    new CMSApiClient(config.blogApiClientOptions),
  );
  container.registerSingleton(
    "PartnerService",
    new PartnerService(container.resolve<IApiClient>("ApiClient")),
  );
  container.registerSingleton(
    "BlogService",
    new BlogService(container.resolve<IApiClient>("BlogApiClient")),
  );
})();

export { container };
