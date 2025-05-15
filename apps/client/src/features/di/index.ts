import type { IApiClient } from "@/api";
import { ApiClient, apiClientOptions, PartnerService } from "@/api";
import { Container } from "./Container";

const container = new Container();

function initContainer() {
  container.registerSingleton("ApiClient", new ApiClient(apiClientOptions));

  container.registerSingleton("PartnerService", () => {
    const apiClient = container.resolve<IApiClient>("ApiClient");
    return new PartnerService(apiClient);
  });
}

export { container, initContainer };
