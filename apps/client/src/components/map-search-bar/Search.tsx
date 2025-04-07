import { Group, IconButton, Input } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { IoSearch } from "react-icons/io5";

const PARTNER_ADDRESS_SEARCH_PARAM = "query";

export default function Search() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get(PARTNER_ADDRESS_SEARCH_PARAM) ?? "";
  const [value, setValue] = useState(queryParam);

  const handleSearchSubmit = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      params.delete(PARTNER_ADDRESS_SEARCH_PARAM);
    } else {
      const parts = trimmedValue.includes(",")
        ? trimmedValue.split(",")
        : trimmedValue.split(" ");

      const cleanedParts = parts
        .map(part => part.trim())
        .filter(Boolean)
        .slice(0, 2);

      const queryValue = cleanedParts.join(",");

      params.set(PARTNER_ADDRESS_SEARCH_PARAM, queryValue);
    }

    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, value, replace, pathname]);

  return (
    <Group w="full" marginRight={{ base: "0", md: "10%" }} marginY="2" attached>
      <Input
        placeholder="Miasto, ulica"
        value={value}
        onChange={e => {
          setValue(e.currentTarget.value);
        }}
      />
      <IconButton variant="outline" onClick={handleSearchSubmit}>
        <IoSearch />
      </IconButton>
    </Group>
  );
}
