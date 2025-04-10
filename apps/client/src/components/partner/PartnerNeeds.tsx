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
          {needs.map((need, i) => (
            <Table.Row key={i}>
              <Table.Cell textAlign="center">{need.name}</Table.Cell>
              <Table.Cell textAlign="center">{`${need.amountCurrent} / ${need.amountMax} ${need.amountUnit}`}</Table.Cell>
              <Table.Cell>
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
      <Accordion.Root collapsible defaultValue={["0"]} hideFrom="md">
        {needs.map((need, i) => (
          <Accordion.Item key={i} value={i.toString()}>
            <Accordion.ItemTrigger>
              <Span>{need.name}</Span>
              <Box bg={colors[need.state]} minW={4} boxSize={4} rounded={5} />
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                Stan obecny:{" "}
                {`${need.amountCurrent} / ${need.amountMax} ${need.amountUnit}`}
                <Flex alignItems="center" gap={2}>
                  <Box
                    bg={colors[need.state]}
                    minW={4}
                    boxSize={4}
                    rounded={5}
                  />
                  {need.note}
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
