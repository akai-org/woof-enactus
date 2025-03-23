import { Container, Input, Group, Flex, IconButton } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import Filters from "./Filters";
import Legend from "./Legend";

export default function SearchBar() {
  return (
    <Container padding={4}>
      <Flex justify="space-between" py={2}>
        <Group attached w="full" marginRight="24">
          <Input flex="1" placeholder="Enter your email" />
          <IconButton variant="outline">
            <IoSearch />
          </IconButton>
        </Group>

        <Flex gap="2">
          <Legend />
          <Filters />
        </Flex>
      </Flex>
    </Container>
  );
}
