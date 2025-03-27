import { Map } from "@/components";
import { api } from "@/constants/partnersApi";
import { ClientOnly, Container, Skeleton, Heading } from "@chakra-ui/react";

export default async function Home() {
  const result = await api.partnersControllerGetAllPartners();
  const partners = result.data.data;

  
  return (
    <ClientOnly fallback={<Skeleton />}>
      <Container marginTop="8" maxWidth={"1400px"}>
        <Heading as="h1" size="4xl" color="brand.700" my="2">
          Znajdź placówki prozwierzęce
        </Heading>
      </Container>
      <Map data={partners} />
    </ClientOnly>
  );
}
