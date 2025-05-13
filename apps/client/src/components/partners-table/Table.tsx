"use client";

import type { PartnerData, PartnerType } from "@/types";
import {
  Accordion,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Pagination,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { IoReturnUpForward } from "react-icons/io5";

import { Link } from "@/components";

type MapProps = {
  data: PartnerData[];
};

export default function PartnersTable({ data }: MapProps) {
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = 7;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  const checkType = (type: string) => {
    switch (type) {
      case "VET":
        return "#FFD600";
      case "ORG":
        return "brand.400";
      case "SHOP":
        return "brand.500";
      case "SHELTER":
        return "brand.700";
    }
  };

  const checkName = (type: string) => {
    switch (type) {
      case "VET":
        return "Weterynarz";
      case "ORG":
        return "Orgzanizacja prozwierzęca";
      case "SHOP":
        return "Sklep Zoologiczny";
      case "SHELTER":
        return "Schronisko";
    }
  };

  return (
    <Stack fontFamily="body" fontWeight="400" width="full">
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
            <Table.Row backgroundColor="white">
              <Table.ColumnHeader color="brand.700">NAZWA</Table.ColumnHeader>
              <Table.ColumnHeader color="brand.700">
                MIEJSCOWOŚĆ
              </Table.ColumnHeader>
              <Table.ColumnHeader color="brand.700">ADRES</Table.ColumnHeader>
              <Table.ColumnHeader color="brand.700">TELEFON</Table.ColumnHeader>
              <Table.ColumnHeader color="brand.700">
                STRONA INTERNETOWA
              </Table.ColumnHeader>
              <Table.ColumnHeader color="brand.700">
                KATEGORIA
              </Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
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
                <Table.Cell minWidth="120px"> {item.profile.street}</Table.Cell>
                <Table.Cell minWidth="120px">
                  <Link
                    linkProps={{ href: `tel:${item.profile.phone}` }}
                    chakraLinkProps={{
                      color: "black",
                      textDecoration: "none",
                      _focus: { boxShadow: "none", outline: "none" },
                    }}
                  >
                    {item.profile.phone}
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <Link
                    linkProps={{ href: item.profile.website ?? "" }}
                    chakraLinkProps={{
                      color: "black",
                      textDecoration: "none",
                      _focus: { boxShadow: "none", outline: "none" },
                    }}
                  >
                    {item.profile.website}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Stack direction="row" align="center">
                    <Box
                      boxSize="15px"
                      borderRadius="sm"
                      bg={checkType(item.type)}
                    />
                    {checkName(item.type)}
                  </Stack>
                </Table.Cell>

                <Table.Cell>
                  <Link
                    linkProps={{ href: `/placowki/${item.slug}` }}
                    chakraLinkProps={{
                      color: "brand.500",
                      textDecoration: "none",
                      _focus: { boxShadow: "none", outline: "none" },
                    }}
                  >
                    <Button
                      padding="20px"
                      backgroundColor="accent.green"
                      size="sm"
                    >
                      SZCZEGÓŁY <IoReturnUpForward />
                    </Button>
                  </Link>
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
                    <strong>Telefon:</strong> {item.profile.phone}
                  </Text>
                  <Text>
                    <strong>Strona WWW:</strong> {item.profile.website}
                  </Text>
                  <Flex align="center" gap={2} mt="2">
                    <Box
                      boxSize="15px"
                      borderRadius="sm"
                      bg={checkType(item.type)}
                    />
                    <Text fontSize="md">{checkName(item.type)}</Text>
                  </Flex>

                  <Link
                    linkProps={{ href: `/placowki/${item.slug}` }}
                    chakraLinkProps={{
                      color: "brand.500",
                      textDecoration: "none",
                      _focus: { boxShadow: "none", outline: "none" },
                    }}
                  >
                    <Button mt="4" backgroundColor="accent.green" size="sm">
                      SZCZEGÓŁY <IoReturnUpForward />
                    </Button>
                  </Link>
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
  );
}
