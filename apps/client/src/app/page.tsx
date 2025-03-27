import { Map, SearchBar } from "@/components";
import { api } from "@/constants/partnersApi";
import { ClientOnly, Container, Skeleton, Heading } from "@chakra-ui/react";

export default async function Home() {
  const result = await api.partnersControllerGetAllPartners();
  const partners = result.data.data;

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
