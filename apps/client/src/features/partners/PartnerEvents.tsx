import NotFound from "@/app/not-found";
import { container } from "@/features/di";

import { Box, Button, Card, Flex, Image, Stack } from "@chakra-ui/react";
import type { IPartnerService } from "@/api";

type Props = {
  slug: string;
};

export default async function PartnerEvents({ slug }: Props) {
  const events = await container
    .resolve<IPartnerService>("PartnerService")
    .getEvents(slug);

  if (!events) return NotFound();

  return (
    <Stack gap={10}>
      {events.map(({ title, description, thumbnail, eventDate, uuid }) => (
        <Card.Root
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "2fr 1fr"]}
          gap={4}
          p={{ base: 2, md: 4 }}
          paddingBottom={{ base: "4", sm: 0 }}
          key={uuid}
          borderColor="brand.300"
          borderWidth={2}
          placeItems="center"
        >
          <Box>
            <Card.Header p={2} textAlign={["center", "left"]}>
              <Card.Title
                color="brand.600"
                fontSize={{ base: "lg", md: "2xl" }}
                fontWeight="bold"
                mb={{ base: "2", md: "4" }}
              >
                {new Date(eventDate).toLocaleString().split(",")[0]} {title}
              </Card.Title>
            </Card.Header>
            <Card.Body p={2}>
              <Card.Description lineHeight={2}>{description}</Card.Description>
            </Card.Body>
          </Box>

          <Flex direction="column" alignItems="center" gap={4}>
            <Image src={thumbnail} alt={title} maxWidth={400} maxHeight={200} />
            <Button variant="gray" size="lg">
              Przypomnij mi o wydarzeniu!
            </Button>
          </Flex>
        </Card.Root>
      ))}
    </Stack>
  );
}
