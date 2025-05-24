"use client";

import type { PartnerData } from "@/types";
import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Table,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import NextLink from "next/link";
import { legendItems } from "@/constants";
import { getPartnerTypeName, truncate } from "@/utils";

import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import MobileTable from "./MobileTable";

type TableProps = {
  data: PartnerData[];
};

const ITEMS_PER_PAGE = 7;

export default function PartnersTable({ data }: TableProps) {
  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = page * ITEMS_PER_PAGE;

  return (
    <Container>
      <Stack fontFamily="body" fontWeight="400">
        <Flex direction="column" gap="2">
          <Table.Root
            width="full"
            variant="outline"
            borderRadius="md"
            marginTop="20"
            hideBelow="md"
            tableLayout="fixed"
          >
            <TableHeader />

            <Table.Body>
              {data.slice(start, end).map((item, index) => (
                <Table.Row
                  border="none"
                  key={item.uuid}
                  backgroundColor={index % 2 === 0 ? "brand.200" : "white"}
                  height="20"
                >
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    {item.profile.postal && item.profile.city
                      ? `${item.profile.postal + " " + item.profile.city}`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>{item.profile.street ?? "-"}</Table.Cell>
                  <Table.Cell>
                    {item.profile.phone ? (
                      <Link
                        href={`tel:${item.profile.phone}`}
                        color="brand.900"
                      >
                        {item.profile.phone}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {item.profile.website ? (
                      <Link href={item.profile.website} color="brand.900">
                        {truncate(item.profile.website)}
                      </Link>
                    ) : (
                      "-"
                    )}
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

          <MobileTable data={data} firstItem={start} lastItem={end} />
        </Flex>

        <TablePagination
          tableRowsCount={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={page}
          onNextPage={() => setPage(currPage => currPage + 1)}
          onPrevPage={() => setPage(currPage => currPage - 1)}
          onChangePage={(selectedPage: number) => setPage(selectedPage)}
        />
      </Stack>
    </Container>
  );
}
