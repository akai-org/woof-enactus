import { Box, Flex, Heading, Table, Text } from "@chakra-ui/react";

const categories = {
  always: {
    label: "Zawsze mile widziane",
    color: "palette.darker",
  },
  longTerm: {
    label: "Długoterminowe, zawsze mile widziane",
    color: "palette.main",
  },
  urgent: {
    label: "Potrzebne w najbiższym czasie",
    color: "palette.accent",
  },
};

const items = [
  {
    name: "Karma sucha",
    availability: "2/10kg",
    category: categories.urgent,
  },
  {
    name: "Karma sucha",
    availability: "2/10kg",
    category: categories.urgent,
  },
  {
    name: "Karma sucha",
    availability: "2/10kg",
    category: categories.always,
  },
  {
    name: "Karma sucha",
    availability: "2/10kg",
    category: categories.urgent,
  },
  {
    name: "Karma sucha",
    availability: "2/10kg",
    category: categories.longTerm,
  },
];

export default function PartnerNeeds() {
  return (
    <Flex direction="column">
      <Heading color="palette.darker">Czego obecnie potrzebujemy?</Heading>
      <Text color="palette.main">Ostatnia aktualizacja: 12.12.2000 8:00</Text>
      <Table.Root size="lg" my={10} striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader color="palette.main">NAZWA</Table.ColumnHeader>
            <Table.ColumnHeader color="palette.main">
              STAN OBECNY
            </Table.ColumnHeader>
            <Table.ColumnHeader color="palette.main">
              KATEGORIA
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, i) => (
            <Table.Row key={i}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.availability}</Table.Cell>
              <Table.Cell display="flex" gap={5}>
                <Box bg={item.category.color} boxSize={4} rounded={5} />
                {item.category.label}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box p={5}>
        <Heading w="full" color="palette.lighter">
          Notatka od nas!
        </Heading>
        <Text>Bardzo dziękujemy za szybką pomoc</Text>
      </Box>
    </Flex>
  );
}
