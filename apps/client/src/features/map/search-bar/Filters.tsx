import { legendItems } from "@/constants";
import {
  Button,
  Fieldset,
  For,
  Popover,
  Portal,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { IoClose, IoFilterSharp } from "react-icons/io5";
import { Checkbox } from "@/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PartnerType } from "@/types";

const PARTNER_TYPE_SEARCH_PARAM = "type";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const prevTypes = useMemo(() => {
    const types = searchParams.get(PARTNER_TYPE_SEARCH_PARAM);
    return types ? types.split(",") : [];
  }, [searchParams]);

  const updateSearchParam = useCallback(
    (updatedType: string[], paramName: string) => {
      const params = new URLSearchParams(searchParams);
      if (updatedType.length > 0) {
        params.set(paramName, updatedType.join(","));
      } else {
        params.delete(paramName);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const handleFilterChange = useCallback(
    (isChecked: boolean, partnerType: PartnerType) => {
      let typeParam = [...prevTypes];

      if (isChecked && !typeParam.includes(partnerType)) {
        typeParam.push(partnerType);
      } else if (!isChecked) {
        typeParam = typeParam.filter(type => type !== partnerType);
      }

      updateSearchParam(typeParam, PARTNER_TYPE_SEARCH_PARAM);
    },
    [prevTypes, updateSearchParam],
  );

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Button
          variant="surface"
          size="md"
          textTransform="uppercase"
          fontWeight="bold"
        >
          <IoFilterSharp />
          Filtry
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body
              borderWidth="thin"
              borderColor="brand.300"
              borderRadius="sm"
            >
              <Popover.Title
                fontWeight="semibold"
                fontSize="2xl"
                textTransform="uppercase"
                fontFamily="heading"
              >
                Filtry
              </Popover.Title>
              <Popover.CloseTrigger
                fontWeight="medium"
                fontSize="2xl"
                position="absolute"
                right={4}
                top={4}
                cursor="pointer"
              >
                <IoClose />
              </Popover.CloseTrigger>
              <Fieldset.Root paddingTop={6}>
                <VStack>
                  <Fieldset.Content>
                    <For each={legendItems}>
                      {({ name, type }) => (
                        <Checkbox
                          key={name}
                          value={name}
                          onCheckedChange={details =>
                            handleFilterChange(!!details.checked, type)
                          }
                          defaultChecked={prevTypes.includes(type)}
                        >
                          {name}
                        </Checkbox>
                      )}
                    </For>
                  </Fieldset.Content>
                </VStack>
              </Fieldset.Root>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
