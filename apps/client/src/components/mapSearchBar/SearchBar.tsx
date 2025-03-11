"use client";
import {
  Container,
  Input,
  Group,
  InputAddon,
  Slider,
  useSlider,
  Flex,
  Popover,
  Portal,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Filters from "./Filters";
import Legend from "./Legend";

export default function SearchBar() {
  const slider = useSlider({
    defaultValue: [0],
    step: 10,
    max: 100,
  });

  return (
    <Container padding={4}>
      <Group attached width={"100%"}>
        <Input
          placeholder="Miasto, ulica"
          _placeholder={{ color: "palette.darker" }}
          size="sm"
        />
        <InputAddon bg="none" size="sm">
          <Popover.Root
            positioning={{
              placement: "bottom-end",
              offset: { crossAxis: 0, mainAxis: 10 },
            }}
          >
            <Popover.Trigger
              cursor="pointer"
              color="palette.darker"
              fontWeight="bold"
              boxSize="full"
            >
              + {slider.value}km
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Body>
                    <Flex justify="space-between" align="center" gap={4}>
                      <Slider.RootProvider value={slider} width="full">
                        <HStack justify="space-between" m={2}>
                          <Slider.Label>Odległość</Slider.Label>
                          <div>
                            +
                            <Slider.ValueText />
                            km
                          </div>
                        </HStack>
                        <Slider.Control>
                          <Slider.Track>
                            <Slider.Range bg="palette.darker" />
                          </Slider.Track>
                          <Slider.Thumb index={0} borderColor="palette.darker">
                            <Slider.HiddenInput />
                          </Slider.Thumb>
                        </Slider.Control>
                      </Slider.RootProvider>
                      <Popover.CloseTrigger
                        fontWeight="medium"
                        fontSize="2xl"
                        cursor="pointer"
                      >
                        <IoClose />
                      </Popover.CloseTrigger>
                    </Flex>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </InputAddon>
        <InputAddon bg="none" padding={0}>
          <IconButton variant="ghost" size="xs" color="palette.darker">
            <FaSearch />
          </IconButton>
        </InputAddon>
      </Group>
      <Flex justify="space-between" py={2}>
        <Legend />
        <Filters />
      </Flex>
    </Container>
  );
}
