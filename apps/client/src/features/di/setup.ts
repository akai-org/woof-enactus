import { ApiClient, CMSApiClient, config } from "@/api";
import { Container } from "./Container";
import { BlogService, PartnerService } from "@/services";

let containerInstance: Container | null = null;

function setupContainer(container: Container) {
  // API Clients
  const backendApiClientDep = container.registerSingleton(
    "ApiClient",
    new ApiClient(config.apiClientOptions),
  );
  const blogApiClientDep = container.registerSingleton(
    "BlogApiClient",
    new CMSApiClient(config.blogApiClientOptions),
  );

  // Services
  container.registerSingleton(
    "PartnerService",
    new PartnerService(backendApiClientDep),
  );
  container.registerSingleton("BlogService", new BlogService(blogApiClientDep));
}

function getContainer() {
  if (!containerInstance) {
    containerInstance = new Container();
    setupContainer(containerInstance);
  }
  return containerInstance;
}

function resetContainer() {
  containerInstance = null;
}

const createDiContainer = getContainer;

export { getContainer, resetContainer, createDiContainer };
