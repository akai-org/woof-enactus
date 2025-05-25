import {
  Box,
  CloseButton,
  Group,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Tooltip } from "@/components";
import { PARTNER_ADDRESS_SEARCH_PARAM } from "../map.config";

type SearchProps = {
  onLocate: () => void;
};

//TODO: better (more intuitive) searching by address
export default function Search({ onLocate }: SearchProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get(PARTNER_ADDRESS_SEARCH_PARAM) ?? "";
  const [value, setValue] = useState(queryParam);

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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
    },
    [searchParams, value, replace, pathname],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
        inputRef.current?.focus();
        replace(pathname);
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <Box width="100%">
      <form onSubmit={handleSearchSubmit}>
        <Group
          w="full"
          marginRight={{ base: "0", md: "10%" }}
          marginY="2"
          attached
        >
          <InputGroup endElement={endElement}>
            <Input
              placeholder="Miasto, ulica"
              value={value}
              onChange={e => {
                setValue(e.currentTarget.value);
              }}
              borderColor="brand.300"
              color="brand.700"
              _placeholder={{ color: "brand.700" }}
            />
          </InputGroup>
          <IconButton
            variant="outline"
            type="submit"
            borderLeft={0}
            borderRight={0}
          >
            <IoSearch />
          </IconButton>

          <Tooltip
            content="Zlokalizuj mnie"
            positioning={{ placement: "right-end" }}
          >
            <IconButton
              onClick={onLocate}
              variant="outline"
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            >
              <FaLocationCrosshairs />
            </IconButton>
          </Tooltip>
        </Group>
      </form>
    </Box>
  );
}
