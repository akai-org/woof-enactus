import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="full"
      height="100%"
    >
      <Text
        textAlign="center"
        color="brand.700"
        fontWeight="semibold"
        marginY="16"
        fontSize={{ base: "lg", md: "2xl" }}
      >
        {message} Spróbuj ponownie.
      </Text>
    </Flex>
  );
}

export default ErrorMessage;
