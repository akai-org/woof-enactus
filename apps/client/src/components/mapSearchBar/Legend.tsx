import {
  Box,
  Button,
  Flex,
  For,
  HStack,
  Popover,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

export default function Legend() {
  return (
    <Popover.Root positioning={{ placement: "bottom-start" }}>
      <Popover.Trigger asChild>
        <Button size="xs" variant="outline">
          LEGENDA
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body>
              <Popover.Title fontWeight="medium" fontSize="2xl">
                LEGENDA
              </Popover.Title>
              <Popover.CloseTrigger
                fontWeight="medium"
                fontSize="2xl"
                position="absolute"
                right={4}
                top={4}
                cursor="pointer"
              >
                <IoClose />
              </Popover.CloseTrigger>
              <VStack align="self-start" my={4} gap={4}>
                <For
                  each={[
                    { name: "Schroniska", color: "#0c5404" },
                    {
                      name: "Organizacje prozwierzęce",
                      color: "#b4cc09",
                    },
                    { name: "Weterynaria", color: "#fed700" },
                    { name: "Sklepy zoologiczne", color: "#4aa801" },
                  ]}
                >
                  {value => (
                    <Flex align="center" gap={4} key={value.name}>
                      <Box boxSize={4} rounded="sm" bg={value.color} />
                      <Text>{value.name}</Text>
                    </Flex>
                  )}
                </For>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
