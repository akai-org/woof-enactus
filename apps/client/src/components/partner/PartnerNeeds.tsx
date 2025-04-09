import getPartnerNeeds from "@/api/getPartnerNeeds";
import NotFound from "@/app/not-found";
import {
  Accordion,
  Box,
  Flex,
  Heading,
  Span,
  Table,
  Text,
} from "@chakra-ui/react";

const categories = {
  always: {
    label: "Zawsze mile widziane",
    color: "brand.600",
  },
  longTerm: {
    label: "Długoterminowe, zawsze mile widziane",
    color: "brand.500",
  },
  urgent: {
    label: "Potrzebne w najbiższym czasie",
    color: "accent.yellow",
  },
};

const items = [
  {
    name: "Karma sucha",
    availability: "2 / 10kg",
    category: categories.urgent,
  },
  {
    name: "Karma sucha",
    availability: "2 / 10kg",
    category: categories.urgent,
  },
  {
    name: "Karma sucha",
    availability: "2 / 10kg",
    category: categories.always,
  },
  {
    name: "Karma sucha",
    availability: "2 / 10kg",
    category: categories.urgent,
  },
  {
    name: "Karma sucha",
    availability: "2 / 10kg",
    category: categories.longTerm,
  },
];

type Props = {
  slug: string;
};

export default async function PartnerNeeds({ slug }: Props) {
  const needs = await getPartnerNeeds(slug);
  if (!needs) return NotFound();

  return (
    <Flex direction="column" gap="2">
      <Heading as="h2" size={{ base: "3xl", md: "4xl" }} color="brand.700">
        Czego obecnie potrzebujemy
      </Heading>
      <Text color="brand.600" fontWeight="semibold">
        Ostatnia aktualizacja: 12.12.2000 8:00
      </Text>
      <Table.Root size="lg" my={10} striped minW="md" hideBelow="md">
        <Table.Header>
          <Table.Row>
            {["NAZWA", "STAN OBECNY", "KATEGORIA"].map((header, i) => (
              <Table.ColumnHeader
                key={i}
                color="brand.700"
                textAlign="center"
                textWrap="nowrap"
              >
                {header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, i) => (
            <Table.Row key={i}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.availability}</Table.Cell>
              <Table.Cell>
                <Flex alignItems="center" gap={2}>
                  <Box
                    bg={item.category.color}
                    minW={4}
                    boxSize={4}
                    rounded={5}
                  />
                  {item.category.label}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Accordion.Root collapsible defaultValue={["0"]} hideFrom="md">
        {items.map((item, index) => (
          <Accordion.Item key={index} value={index.toString()}>
            <Accordion.ItemTrigger>
              <Span>{item.name}</Span>
              <Box bg={item.category.color} minW={4} boxSize={4} rounded={5} />
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                Stan obecny: {item.availability}
                <Flex alignItems="center" gap={2}>
                  <Box
                    bg={item.category.color}
                    minW={4}
                    boxSize={4}
                    rounded={5}
                  />
                  {item.category.label}
                </Flex>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <Box p={5}>
        <Heading w="full" color="brand.500">
          Notatka od nas!
        </Heading>
        <Text>Bardzo dziękujemy za szybką pomoc</Text>
      </Box>
    </Flex>
  );
}
