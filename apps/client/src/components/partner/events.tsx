import { Button, Card, Flex, Image, Stack } from "@chakra-ui/react";

export default function PartnerEvents() {
  return (
    <Stack gap={10}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card.Root
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "2fr 1fr"]}
          gap={4}
          p={[0, 4]}
          key={i}
        >
          <div>
            <Card.Header p={2} textAlign={["center", "left"]}>
              <Card.Title color="brand.700" fontWeight="bold">
                12.12.2000 - Lorem ipsum
              </Card.Title>
            </Card.Header>
            <Card.Body p={2}>
              <Card.Description>asdaskfjsdljgblsdhfgbl</Card.Description>
            </Card.Body>
          </div>

          <Flex direction="column" gap={4}>
            <Image src="https://placehold.co/600x400/png" />
            <Button variant="outline">Przypomnij mi o Wydarzeniu</Button>
          </Flex>
        </Card.Root>
      ))}
    </Stack>
  );
}
