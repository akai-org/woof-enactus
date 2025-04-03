import { Map, SearchBar } from "@/components";
import { getPartners } from "@/api";
import { ClientOnly, Container, Skeleton, Heading } from "@chakra-ui/react";
import { notFound } from "next/navigation";

export default async function Home() {
  const partners = await getPartners();
  if (!partners) notFound();

  return (
    <>
      <Container marginTop="8">
        <Heading as="h1" size="4xl" color="brand.700" my="2">
          Znajdź placówki prozwierzęce
        </Heading>
        <ClientOnly
          fallback={
            <Container padding={4}>
              <Skeleton h={10} />
            </Container>
          }
        >
          <SearchBar />
        </ClientOnly>
      </Container>
      <ClientOnly fallback={<Skeleton minH="80vh" m={5} />}>
        <Map data={partners} />
      </ClientOnly>
    </>
  );
}
