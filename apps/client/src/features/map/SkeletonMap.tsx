import { Box, Container, Flex, Skeleton } from "@chakra-ui/react";

function SekletonMap() {
  return (
    <Box>
      <Flex direction="column">
        <Container padding={4} h="70px">
          <Skeleton w="full" h="full" />
        </Container>
        <Skeleton h="70dvh" />
      </Flex>
    </Box>
  );
}
export { SekletonMap };
