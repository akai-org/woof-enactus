import { getContainer } from "@/features/di";

import { Box, Flex, Heading, Table, Text } from "@chakra-ui/react";
import type { IPartnerService } from "@/services";
import type { GoodsState } from "@/types";
import Note from "./Note";
import NeedsMobile from "./NeedsMobile";
import { EmptyArrayGuard, ErrorMessage } from "@/components";
import EmptyNeedsList from "./EmptyNeedsList";
import type { NeededGoods } from "woof";
import { randomUUID } from "node:crypto";

const PRIORITY_COLORS: Readonly<Record<GoodsState, string>> = {
  OK: "brand.600",
  MEDIUM: "brand.500",
  LOW: "accent.yellow",
};

const TABLE_HEADINGS = ["Nazwa", "Stan obecny", "Kategoria"] as const;

type PartnerNeedsProps = {
  slug: string;
};

export default async function PartnerNeeds({ slug }: PartnerNeedsProps) {
  const needs = await getContainer()
    .resolve<IPartnerService>("PartnerService")
    .getNeeds(slug);

  if (!needs.success) return <ErrorMessage message={needs.error.userMessage} />;

  const needsData = needs.data;

  // Potrzebne dla funkcji .reduce(). Jeżeli typem placówki nie jest schornisko
  // to lista potrzebnych rzeczy nie jest inicjalizowana i reduce wywala TypeError.
  // Ten fallback zapawnia, że coś jednak w liście będzie, jednak nie będzie ona wyświetlana na froncie.
  const initialValueFallback: NeededGoods = {
    id: -1,
    amountMax: 0,
    createdAt: new Date(),
    name: "Fallback",
    state: "OK",
    stateInfo: "",
    updatedAt: new Date(),
    uuid: randomUUID(),
  };

  const newest = new Date(
    needsData.goods.reduce((latest, current) => {
      return current.updatedAt > latest.updatedAt ? current : latest;
    }, initialValueFallback).updatedAt,
  );
  const newestDate = newest.toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  });

  return (
    <Flex direction="column" gap="2">
      <Heading as="h2" size={{ base: "3xl", md: "4xl" }} color="brand.700">
        Czego obecnie potrzebujemy
      </Heading>
      <Text color="brand.600" fontWeight="semibold">
        Ostatnia aktualizacja: {newestDate}
      </Text>
      <EmptyArrayGuard check={needsData.goods} fallback={<EmptyNeedsList />}>
        <Table.Root
          size="lg"
          my={10}
          minW="md"
          hideBelow="md"
          borderColor="brand.300"
          borderWidth={1}
        >
          <Table.Header>
            <Table.Row>
              {TABLE_HEADINGS.map((header, i) => (
                <Table.ColumnHeader
                  key={i}
                  color="brand.700"
                  textAlign="center"
                  textWrap="nowrap"
                  fontWeight="semibold"
                  p="6"
                >
                  {header.toUpperCase()}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {needsData.goods.map((need, i) => (
              <Table.Row
                key={need.uuid}
                bgColor={i % 2 === 0 ? "brand.300" : "brand.100"}
              >
                <Table.Cell p="6" textAlign="center">
                  {need.name}
                </Table.Cell>
                <Table.Cell
                  p="6"
                  textAlign="center"
                >{`${need.amountCurrent ?? 0} / ${need.amountMax} ${need.amountUnit ?? ""}`}</Table.Cell>
                <Table.Cell p="6">
                  <Flex justify="center" alignItems="center" gap={2}>
                    <Box
                      bg={PRIORITY_COLORS[need.state]}
                      minW={4}
                      boxSize={4}
                      rounded={"md"}
                    />
                    {need.stateInfo}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <NeedsMobile needs={needsData} priorityColors={PRIORITY_COLORS} />
      </EmptyArrayGuard>

      <Note note={needsData.note} />
    </Flex>
  );
}
