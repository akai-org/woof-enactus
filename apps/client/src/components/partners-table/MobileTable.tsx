import { getPartnerTypeName } from "@/utils";
import {
  Accordion,
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { TiArrowRight } from "react-icons/ti";
import React from "react";
import NextLink from "next/link";
import type { PartnerData } from "@/types";
import { mapLegendItems } from "@/constants";

type MobileTableProps = {
  data: PartnerData[];
  firstItem: number;
  lastItem: number;
};

function MobileTable({ data, firstItem, lastItem }: MobileTableProps) {
  return (
    <Accordion.Root
      collapsible
      defaultValue={["0"]}
      hideFrom="md"
      borderWidth={1}
      borderColor="brand.300"
      borderRadius="sm"
      mt="6"
    >
      {data.slice(firstItem, lastItem).map((item, index) => (
        <Accordion.Item
          key={item.uuid}
          value={index.toString()}
          bgColor={index % 2 === 0 ? "brand.200" : "white"}
          py="2"
        >
          <Accordion.ItemTrigger justifyContent="space-between" px="4">
            <HStack>
              <Text fontWeight="bold">{item.name}</Text>
            </HStack>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent px="4" pb="4">
            <Accordion.ItemBody>
              <Text>
                <strong>Miejscowość:</strong> {item.profile.postal}{" "}
                {item.profile.city}
              </Text>
              <Text>
                <strong>Adres:</strong> {item.profile.street}
              </Text>
              <Text>
                <strong>Telefon:</strong>{" "}
                <Link href={`tel:${item.profile.phone}`} color="brand.900">
                  {item.profile.phone}
                </Link>
              </Text>
              <Text>
                <strong>Strona WWW:</strong>{" "}
                <Link href={item.profile.website ?? ""} color="brand.900">
                  {item.profile.website}
                </Link>
              </Text>
              <Flex align="center" gap={2} mt="2">
                <Box
                  boxSize="15px"
                  borderRadius="sm"
                  bg={
                    mapLegendItems.find(
                      legendItem => legendItem.type == item.type,
                    )?.color
                  }
                />
                <Text fontSize="md">{getPartnerTypeName(item.type)}</Text>
              </Flex>

              <Button mt="4" size="md" variant="cta" asChild>
                <NextLink color="brand.500" href={`/placowki/${item.slug}`}>
                  Szczegóły <TiArrowRight color="white" />
                </NextLink>
              </Button>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export default MobileTable;
