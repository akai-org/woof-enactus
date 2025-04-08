import { Map } from "@/components";
import { api } from "@/constants/partnersApi";
import { ClientOnly, Container, Skeleton, Heading } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

export default async function Home() {
  const result = await api.partnersControllerGetAllPartners();
  const partners = result.data.data;

  return (
    <>
      <Container marginTop="8">
        <Heading as="h1" size="4xl" color="brand.700" my="2">
          Znajdź placówki prozwierzęce
        </Heading>
      </Container>
      <ClientOnly fallback={<Skeleton minH="80vh" m={5} />}>
        <Map data={partners} />
        <Toaster />
      </ClientOnly>
    </>
  );
}
