"use client";

import type { PartnerData } from "@/types";
import {
  Accordion,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Pagination,
  Stack,
  Table,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { TiArrowRight } from "react-icons/ti";
import NextLink from "next/link";
import { getPartnerTypeName, legendItems } from "@/constants";

type MapProps = {
  data: PartnerData[];
};

const tableHeadings = [
  "Nazwa",
  "Miejscowość",
  "Adres",
  "Telefon",
  "Strona internetowa",
  "Kategoria",
];

export default function PartnersTable({ data }: MapProps) {
  const [page, setPage] = useState(1);

  const itemsPerPage = 7;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  return (
    <Container>
      <Stack fontFamily="body" fontWeight="400">
        <Flex direction="column" gap="2">
          <Table.Root
            width="auto"
            size="sm"
            variant="outline"
            margin="20px"
            borderRadius="5px"
            marginTop="50px"
            marginBottom="0px"
            hideBelow="md"
          >
            <Table.Header>
              <Table.Row backgroundColor="white" padding="4">
                {tableHeadings.map(name => (
                  <Table.ColumnHeader
                    color="brand.700"
                    fontWeight="bold"
                    padding="8"
                    fontSize="md"
                    textTransform="uppercase"
                    border="none"
                    key={name}
                  >
                    {name}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.slice(start, end).map((item, index) => (
                <Table.Row
                  border="none"
                  height="80px"
                  key={item.id}
                  backgroundColor={index % 2 === 0 ? "brand.200" : "white"}
                >
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    {item.profile.postal} {item.profile.city}
                  </Table.Cell>
                  <Table.Cell minWidth="120px">
                    {item.profile.street}
                  </Table.Cell>
                  <Table.Cell minWidth="120px">
                    <Link href={`tel:${item.profile.phone}`} color="brand.900">
                      {item.profile.phone}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link href={item.profile.website ?? ""} color="brand.900">
                      {item.profile.website}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Stack direction="row" align="center">
                      <Box
                        boxSize="15px"
                        borderRadius="sm"
                        bg={
                          legendItems.find(
                            legendItem => legendItem.type == item.type,
                          )?.color
                        }
                      />
                      {getPartnerTypeName(item.type)}
                    </Stack>
                  </Table.Cell>

                  <Table.Cell>
                    <Button size="md" variant="cta" asChild>
                      <NextLink
                        href={`/placowki/${item.slug}`}
                        color="brand.500"
                      >
                        Szczegóły <TiArrowRight color="white" />
                      </NextLink>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <Accordion.Root
            collapsible
            defaultValue={["0"]}
            hideFrom="md"
            borderWidth={1}
            borderColor="brand.300"
            borderRadius="sm"
            mt="6"
          >
            {data.slice(start, end).map((item, index) => (
              <Accordion.Item
                key={item.id}
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
                      <Link
                        href={`tel:${item.profile.phone}`}
                        color="brand.900"
                      >
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
                          legendItems.find(
                            legendItem => legendItem.type == item.type,
                          )?.color
                        }
                      />
                      <Text fontSize="md">{getPartnerTypeName(item.type)}</Text>
                    </Flex>

                    <Button mt="4" size="md" variant="cta" asChild>
                      <NextLink
                        color="brand.500"
                        href={`/placowki/${item.slug}`}
                      >
                        Szczegóły <TiArrowRight color="white" />
                      </NextLink>
                    </Button>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Flex>

        <Pagination.Root
          margin="auto"
          marginBottom="20px"
          marginTop="20px"
          height="auto"
          count={data.length}
          pageSize={itemsPerPage}
          page={page}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton onClick={() => setPage(prevPage => prevPage - 1)}>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={page => (
                <IconButton
                  variant={{ base: "ghost", _selected: "outline" }}
                  onClick={() => {
                    setPage(page.value);
                  }}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton onClick={() => setPage(prevPage => prevPage + 1)}>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
    </Container>
  );
}
