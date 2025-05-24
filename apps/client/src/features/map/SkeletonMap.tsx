import { Box, Container, Flex, Skeleton } from "@chakra-ui/react";

function SekletonMap() {
  return (
    <Box>
      <Flex direction="column">
        <Container padding={4} h="4.5rem">
          <Skeleton w="full" h="full" />
        </Container>
        <Skeleton h="65dvh" />
      </Flex>
    </Box>
  );
}
export { SekletonMap };
