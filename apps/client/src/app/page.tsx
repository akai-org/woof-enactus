import { Map } from "@/components";
import { getPartners } from "@/api";

import { ClientOnly, Container, Skeleton, Heading } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import type { HomeSearchParams } from "@/types";

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

  const partners = await getPartners({ type, ...params });

  if (!partners) notFound();

  return (
    <>
      <Container marginTop="8">
        <Heading as="h1" size="4xl" color="brand.700" my="2">
          Znajdź placówki prozwierzęce
        </Heading>
      </Container>
      <ClientOnly fallback={<Skeleton minH="70vh" />}>
        <Map data={partners} />
      </ClientOnly>
    </>
  );
}
