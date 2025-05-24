import { Text } from "@chakra-ui/react";
import React from "react";

function EmptyEventsList() {
  return (
    <Text
      textAlign="center"
      fontWeight="semibold"
      color="brand.700"
      fontSize={{ base: "lg", md: "xl" }}
      marginY="10"
    >
      Obecnie nie planujemy żadnych wydarzeń. Dodamy nowe już wkrótce.
    </Text>
  );
}

export default EmptyEventsList;
