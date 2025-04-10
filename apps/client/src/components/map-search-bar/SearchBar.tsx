"use client";

import { Container, Flex } from "@chakra-ui/react";
import Filters from "./Filters";
import Legend from "./Legend";
import Search from "./Search";

type SearchBarProps = {
  onLocate: () => void;
};

export default function SearchBar({ onLocate }: SearchBarProps) {
  return (
    <Container padding={4}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", md: "row" }}
        gap="2"
      >
        <Search onLocate={onLocate} />
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
