import { Map } from "@/components";
import SearchBar from "@/components/mapSearchBar/SearchBar";
import { ClientOnly, Skeleton } from "@chakra-ui/react";

export default function Home() {
  return (
    <ClientOnly fallback={<Skeleton />}>
      <SearchBar />
      <Map />
    </ClientOnly>
  );
}
