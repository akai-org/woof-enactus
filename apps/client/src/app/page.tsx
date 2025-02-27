import { Map } from "@/components";
import { ClientOnly, Skeleton } from "@chakra-ui/react";

export default function Home() {
  return (
    <ClientOnly fallback={<Skeleton />}>
      <Map />
    </ClientOnly>
  );
}
