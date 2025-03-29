import { Box, Flex, Heading, Table, Text } from "@chakra-ui/react";

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

export default function PartnerNeeds() {
  return (
    <Flex direction="column" gap="2">
      <Heading as="h2" size={{ base: "3xl", md: "4xl" }} color="brand.700">
        Czego obecnie potrzebujemy
      </Heading>
      <Text color="brand.600" fontWeight="semibold">
        Ostatnia aktualizacja: 12.12.2000 8:00
      </Text>
      <Box overflowX="auto">
        <Table.Root size="lg" my={10} striped minW="md">
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
      </Box>

      <Box p={5}>
        <Heading w="full" color="brand.500">
          Notatka od nas!
        </Heading>
        <Text>Bardzo dziękujemy za szybką pomoc</Text>
      </Box>
    </Flex>
  );
}
