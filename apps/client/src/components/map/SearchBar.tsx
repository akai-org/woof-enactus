import {
  Container,
  Input,
  Group,
  InputAddon,
  Icon,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <Container padding={4}>
      <Group attached width={"100%"}>
        <Input placeholder="Miasto, ulica" size="sm" />
        <InputAddon bg="none">+0 km</InputAddon>
        <InputAddon bg="none">
          <Icon fontSize="md">
            <FaSearch />
          </Icon>
        </InputAddon>
      </Group>
      <Flex justify="space-between" padding={2}>
        <Button size="sm">LEGNEDA</Button>
        <Button size="sm">FILTRY</Button>
      </Flex>
    </Container>
  );
}
