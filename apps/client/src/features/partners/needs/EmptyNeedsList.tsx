import { Text } from "@chakra-ui/react";
import React from "react";

function EmptyNeedsList() {
  return (
    <Text
      textAlign="center"
      fontWeight="semibold"
      color="brand.700"
      fontSize={{ base: "lg", md: "xl" }}
      marginTop="20"
      marginBottom="10"
    >
      Obecnie nasza lista potrzeb jest pusta. Wkrótce ją zaktualizujemy.
    </Text>
  );
}

export default EmptyNeedsList;
