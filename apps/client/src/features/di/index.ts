import type { IApiClient } from "@/api";
import { ApiClient, apiClientOptions, PartnerService } from "@/api";
import { Container } from "./Container";

const container = new Container();

function initContainer() {
  container.registerSingleton("ApiClient", new ApiClient(apiClientOptions));
  container.registerSingleton(
    "PartnerService",
    new PartnerService(container.resolve<IApiClient>("ApiClient")),
  );
}

export { container, initContainer };
