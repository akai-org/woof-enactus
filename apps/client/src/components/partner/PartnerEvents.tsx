import { Box, Button, Card, Flex, Image, Stack } from "@chakra-ui/react";

export default function PartnerEvents() {
  return (
    <Stack gap={10}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card.Root
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "2fr 1fr"]}
          gap={4}
          p={{ base: 2, md: 4 }}
          paddingBottom={{ base: "4", sm: 0 }}
          key={i}
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
                12.07.2024 Zapraszamy na spacer z pieskami!
              </Card.Title>
            </Card.Header>
            <Card.Body p={2}>
              <Card.Description lineHeight={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                condimentum in volutpat vel, dictum quis libero. Sed quis lorem
                rhoncus, lobortis massa et, pellentesque risus. Fusce tempus
                condimentum orci, vel suscipit nisi pellentesque sit amet.
                Quisque volutpat mauris non aliquam sagittis. Maecenas eget enim
                elementum, faucibus leo eu, volutpat lorem. Cras consequat
                ligula ut blandit accumsan. Quisque pulvinar. Sed quis lorem
                rhoncus, lobortis massa et, pellentesque risus.
              </Card.Description>
            </Card.Body>
          </Box>

          <Flex direction="column" alignItems="center" gap={4}>
            <Image src="https://placehold.co/600x400/png" />
            <Button
              paddingInline="4"
              variant="solid"
              backgroundColor="accent.gray"
              color="brand.900"
              fontWeight="semibold"
            >
              Przypomnij mi o wydarzeniu!
            </Button>
          </Flex>
        </Card.Root>
      ))}
    </Stack>
  );
}
