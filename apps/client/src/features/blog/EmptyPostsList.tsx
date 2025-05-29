import { Text } from "@chakra-ui/react";
import React from "react";

function EmptyPostsList() {
  return (
    <Text
      textAlign="center"
      fontWeight="semibold"
      color="brand.700"
      fontSize={{ base: "lg", md: "xl" }}
      marginY="10"
    >
      Obecnie nie mamy żadnych artykułów. Dodamy je wkrótce.
    </Text>
  );
}

export default EmptyPostsList;
