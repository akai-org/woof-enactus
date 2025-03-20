import { Map } from "@/components";
import { api } from "@/constants/partnersApi";
import { ClientOnly, Skeleton } from "@chakra-ui/react";

export default async function Home() {
  const result = await api.partnersControllerGetAllPartners();
  const partners = result.data.data;

  return (
    <ClientOnly fallback={<Skeleton />}>
      <Map data={partners} />
    </ClientOnly>
  );
}
