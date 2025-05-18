import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

type NoteProps = {
  note?: string;
};

function Note({ note }: NoteProps) {
  return (
    <Box
      p={{ md: "8", base: "4" }}
      borderRadius="sm"
      borderColor="brand.300"
      borderWidth={2}
      width="full"
      mt="8"
    >
      <Heading
        as="h3"
        size={{ md: "2xl", base: "xl" }}
        color="brand.500"
        mb="2"
      >
        Notatka od nas!
      </Heading>
      <Text>
        {note ?? `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
      </Text>
    </Box>
  );
}

export default Note;
