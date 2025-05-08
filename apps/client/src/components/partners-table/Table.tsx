"use client";

import type { PartnerData } from "@/types";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Pagination,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { IoReturnUpForward } from "react-icons/io5";

type MapProps = {
  data: PartnerData[];
};

export default function PartnersTable({ data }: MapProps) {
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = 7;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  return (
    <Stack fontSize="100px" fontFamily="body" fontWeight="400" width="full">

      <Table.Root
        width="auto"
        size="sm"
        variant="outline"
        margin="20px"
        borderRadius="5px"
        marginTop="50px"
        marginBottom="0px"
      >
        <Table.Header>
          <Table.Row backgroundColor="white">
            <Table.ColumnHeader color="brand.700">NAZWA</Table.ColumnHeader>
            <Table.ColumnHeader color="brand.700">MIEJSCOWOŚĆ</Table.ColumnHeader>
            <Table.ColumnHeader color="brand.700">ADRES</Table.ColumnHeader>
            <Table.ColumnHeader color="brand.700">TELEFON</Table.ColumnHeader>
            <Table.ColumnHeader color="brand.700">STRONA INTERNETOWA</Table.ColumnHeader>
            <Table.ColumnHeader color="brand.700">KATEGORIA</Table.ColumnHeader>
            <Table.ColumnHeader ></Table.ColumnHeader>
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
              <Table.Cell>{item.profile.street}</Table.Cell>
              <Table.Cell>{item.profile.phone}</Table.Cell>
              <Table.Cell>{item.profile.website}</Table.Cell>
              <Table.Cell>
                <Stack direction="row" align="center">
                  <Box
                    boxSize="15px"
                    borderRadius="sm"
                    bg={
                      item.type === "VET"
                        ? "#FFD600"
                        : item.type === "ORG"
                          ? "brand.400"
                          : item.type === "SHOP"
                            ? "brand.500"
                            : "brand.700"
                    }
                  />
                  {item.type === "VET"
                    ? "Weterynarz"
                    : item.type === "ORG"
                      ? "Orgzanizacja prozwierzęca"
                      : item.type === "SHOP"
                        ? "Sklep Zoologiczny"
                        : "Schronisko"}
                </Stack>
              </Table.Cell>

              <Table.Cell>
                <Button backgroundColor="accent.green">
                  SZCZEGÓŁY <IoReturnUpForward />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root
        margin="auto"
        marginBottom="20px"
        marginTop="0px"
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
