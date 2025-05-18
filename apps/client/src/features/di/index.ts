import type { IApiClient } from "@/api";
import { ApiClient, config } from "@/api";
import { Container } from "./Container";
import { PartnerService } from "@/services";

const container = new Container();

(() => {
  container.registerSingleton(
    "ApiClient",
    new ApiClient(config.apiClientOptions),
  );
  container.registerSingleton(
    "PartnerService",
    new PartnerService(container.resolve<IApiClient>("ApiClient")),
  );
})();

export { container };
