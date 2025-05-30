import { Map } from "@/features/map";
import { Table } from "@/components";
import { JoinUsContainer } from "@/components";
import { getContainer } from "@/features/di";

import { Container, Heading } from "@chakra-ui/react";

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

  const partners = await getContainer()
    .resolve<IPartnerService>("PartnerService")
    .getAll({ types: type, ...params });

  if (!partners.success)
    return <ErrorMessage message={partners.error.userMessage} />;

  return (
    <>
      <Container marginTop="8">
        <Heading as="h1" size="4xl" color="brand.700" my="2">
          Znajdź placówki przyjazne zwierzętom
        </Heading>
      </Container>
      <Map data={partners.data} />
      <Table data={partners.data} />
      <JoinUsContainer />
    </>
  );
}
