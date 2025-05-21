import { Table } from "@chakra-ui/react";
import React from "react";

const TABLE_HEADINGS = [
  "Nazwa",
  "Miejscowość",
  "Adres",
  "Telefon",
  "Strona internetowa",
  "Kategoria",
] as const;

function TableHeader() {
  return (
    <Table.Header>
      <Table.Row backgroundColor="white" padding="4">
        {TABLE_HEADINGS.map(name => (
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
  );
}

export default TableHeader;
