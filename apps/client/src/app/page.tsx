import { Map } from "@/features/map";
import { Table } from "@/components";
import { JoinUsContainer } from "@/components";
import { container } from "@/features/di";

import { ClientOnly, Container, Skeleton, Heading } from "@chakra-ui/react";

import type { HomeSearchParams } from "@/types";
import type { IPartnerService } from "@/services";
import { ErrorMessage } from "@/components";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<HomeSearchParams>;
}) {
  const { type, query } = await searchParams;

  const city = query?.split(",")[0];
  const street = query?.split(",")[1];
  const params = {
    ...(city && { city }),
    ...(street && { street }),
  };

  const partners = await container
    .resolve<IPartnerService>("PartnerService")
    .getAll({ types: type, ...params });

  if (!partners.success)
    return <ErrorMessage message={partners.error.userMessage} />;

  return (
    <>
      <Container marginTop="8">
        <Heading as="h1" size="4xl" color="brand.700" my="2">
          Znajdź placówki prozwierzęce
        </Heading>
      </Container>
      <ClientOnly fallback={<Skeleton minH="70vh" />}>
        <Map data={partners.data} />
        <Table data={partners.data} />
        <JoinUsContainer />
      </ClientOnly>
    </>
  );
}
