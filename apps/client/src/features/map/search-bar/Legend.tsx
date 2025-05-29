import { mapLegendItems } from "@/constants";
import {
  Box,
  Button,
  Flex,
  For,
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
        <Button
          size="md"
          variant="surface"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          Legenda
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body
              borderWidth="thin"
              borderColor="brand.300"
              borderRadius="sm"
            >
              <Popover.Title
                fontWeight="semibold"
                fontSize="2xl"
                textTransform="uppercase"
                fontFamily="heading"
                marginBottom="6"
              >
                Legenda
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
              <VStack align="self-start" gap={4}>
                <For each={mapLegendItems}>
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
