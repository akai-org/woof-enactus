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
    <Flex direction="column" p={[2, 10, 20]}>
      <Heading color="palette.darker">Czego obecnie potrzebujemy?</Heading>
      <Text color="palette.main">Ostatnia aktualizacja: 12.12.2000 8:00</Text>
      <Box overflowX="auto">
        <Table.Root size="lg" my={10} striped minW="md">
          <Table.Header>
            <Table.Row>
              {["NAZWA", "STAN OBECNY", "KATEGORIA"].map((header, i) => (
                <Table.ColumnHeader
                  key={i}
                  color="palette.main"
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
      </Box>

      <Box p={5}>
        <Heading w="full" color="palette.lighter">
          Notatka od nas!
        </Heading>
        <Text>Bardzo dziękujemy za szybką pomoc</Text>
      </Box>
    </Flex>
  );
}
