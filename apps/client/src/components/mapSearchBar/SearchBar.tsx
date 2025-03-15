import {
  Container,
  Input,
  Group,
  InputAddon,
  useSlider,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Filters from "./Filters";
import Legend from "./Legend";

export default function SearchBar() {
  return (
    <Container padding={4}>
      <Group attached width={"100%"}>
        <Input
          placeholder="Miasto, ulica"
          _placeholder={{ color: "palette.darker" }}
          size="sm"
        />
        <InputAddon bg="none" padding={0}>
          <Button variant="ghost" size="xs" color="palette.darker">
            Wyszukaj
            <Icon size="xs">
              <FaSearch />
            </Icon>
          </Button>
        </InputAddon>
      </Group>
      <Flex justify="space-between" py={2}>
        <Legend />
        <Filters />
      </Flex>
    </Container>
  );
}
