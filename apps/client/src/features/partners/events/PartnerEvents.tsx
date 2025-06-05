import { getContainer } from "@/features/di";

import { Box, Card, Flex, Stack } from "@chakra-ui/react";
import type { IPartnerService } from "@/services";
import { EmptyArrayGuard, ErrorMessage, NullishGuard } from "@/components";
import EmptyEventsList from "./EmptyEventsList";
import { RemindButton } from "./RemindButton";
import Image from "next/image";

type PartnerEventsProps = {
  slug: string;
};

export default async function PartnerEvents({ slug }: PartnerEventsProps) {
  const events = await getContainer()
    .resolve<IPartnerService>("PartnerService")
    .getEvents(slug);

  if (!events.success)
    return <ErrorMessage message={events.error.userMessage} />;

  const eventsData = events.data;

  return (
    <Stack gap={10}>
      <EmptyArrayGuard check={eventsData} fallback={<EmptyEventsList />}>
        {eventsData.map(
          ({ title, description, thumbnail, eventDate, uuid }) => (
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
                    {new Date(eventDate).toLocaleString("pl-PL").split(",")[0]}{" "}
                    {title}
                  </Card.Title>
                </Card.Header>
                <Card.Body p={2}>
                  <Card.Description lineHeight={2}>
                    {description}
                  </Card.Description>
                </Card.Body>
              </Box>

              <Flex direction="column" alignItems="center" gap={4}>
                <NullishGuard check={thumbnail} fallback={<></>}>
                  <Image
                    src={thumbnail ?? ""}
                    alt={title}
                    width={300}
                    height={200}
                  />
                </NullishGuard>
                <RemindButton
                  title={title}
                  description={description}
                  start={new Date(eventDate).toISOString()}
                />
              </Flex>
            </Card.Root>
          ),
        )}
      </EmptyArrayGuard>
    </Stack>
  );
}
