import { getPartnerNeeds } from "@/api";
import NotFound from "@/app/not-found";
import {
  Accordion,
  Box,
  Flex,
  Heading,
  Span,
  Table,
  HStack,
  Text,
} from "@chakra-ui/react";

const colors = {
  OK: "brand.600",
  MEDIUM: "brand.500",
  LOW: "accent.yellow",
};

type Props = {
  slug: string;
};

export default async function PartnerNeeds({ slug }: Props) {
  const needs = await getPartnerNeeds(slug);
  if (!needs) return NotFound();

  const newest = new Date(
    needs.goods.reduce((latest, current) => {
      return new Date(current.updatedAt) > new Date(latest.updatedAt)
        ? current
        : latest;
    }).updatedAt,
  );
  const newestDate = newest.toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
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
            {["Nazwa", "Stan obecny", "Kategoria"].map((header, i) => (
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
          {needs.goods.map((need, i) => (
            <Table.Row
              key={i}
              bgColor={i % 2 === 0 ? "brand.300" : "brand.100"}
            >
              <Table.Cell p="6" textAlign="center">
                {need.name}
              </Table.Cell>
              <Table.Cell
                p="6"
                textAlign="center"
              >{`${need.amountCurrent} / ${need.amountMax} ${need.amountUnit}`}</Table.Cell>
              <Table.Cell p="6">
                <Flex justify="center" alignItems="center" gap={2}>
                  <Box
                    bg={colors[need.state]}
                    minW={4}
                    boxSize={4}
                    rounded={5}
                  />
                  {need.stateInfo}
                </Flex>
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
        {needs.goods.map((need, i) => (
          <Accordion.Item
            key={i}
            value={i.toString()}
            bgColor={i % 2 === 0 ? "brand.300" : "brand.100"}
            py="2"
          >
            <Accordion.ItemTrigger justifyContent="space-between" px="2">
              <HStack>
                <Span>{need.name}</Span>
                <Box bg={colors[need.state]} minW={4} boxSize={4} rounded={5} />
              </HStack>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent px="2">
              <Accordion.ItemBody>
                Stan obecny:{" "}
                {`${need.amountCurrent} / ${need.amountMax} ${need.amountUnit}`}
                <Flex alignItems="center" gap={2} mt="2">
                  <Box
                    bg={colors[need.state]}
                    minW={4}
                    boxSize={4}
                    rounded={5}
                  />
                  {need.stateInfo}
                </Flex>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <Box
        p={{ md: "8", base: "4" }}
        borderRadius="sm"
        borderColor="brand.300"
        borderWidth={2}
        width="100%"
        mt="8"
      >
        <Heading
          as="h3"
          size={{ md: "2xl", base: "xl" }}
          color="brand.500"
          mb="2"
        >
          Notatka od nas!
        </Heading>
        <Text>{needs.note ?? `Bardzo dziękujemy za szybką pomoc`}</Text>
      </Box>
    </Flex>
  );
}
