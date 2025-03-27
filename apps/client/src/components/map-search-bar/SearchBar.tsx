import { Container, Input, Group, Flex, IconButton } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import Filters from "./Filters";
import Legend from "./Legend";

export default function SearchBar() {
  return (
    <Container padding={4}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", md: "row" }}
        gap="2"
      >
        <Group
          attached
          w="full"
          marginRight={{ base: "0", md: "10%" }}
          marginY="2"
        >
          <Input flex="1" placeholder="Enter your email" />
          <IconButton variant="outline">
            <IoSearch />
          </IconButton>
        </Group>

        <Flex
          gap="2"
          justifyContent="space-between"
          alignItems="center"
          width={{ base: "100%", md: "fit-content" }}
        >
          <Legend />
          <Filters />
        </Flex>
      </Flex>
    </Container>
  );
}
