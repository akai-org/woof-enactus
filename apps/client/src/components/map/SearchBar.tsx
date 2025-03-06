"use client";
import {
  Container,
  Input,
  Group,
  InputAddon,
  Slider,
  useSlider,
  Button,
  Flex,
  Popover,
  Portal,
  Checkbox,
  CheckboxGroup,
  Fieldset,
  For,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";

export default function SearchBar() {
  const slider = useSlider({
    defaultValue: [0],
    step: 10,
    max: 100,
  });

  return (
    <Container padding={4}>
      <Group attached width={"100%"}>
        <Input placeholder="Miasto, ulica" size="sm" />
        <InputAddon bg="none" size="sm">
          <Popover.Root positioning={{ placement: "bottom-end" }}>
            <Popover.Trigger padding={0} as="button">
              + {slider.value}km
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Body>
                    <Flex justify="space-between" align="center" gap={4}>
                      <Slider.RootProvider value={slider} width="full">
                        <Slider.Control>
                          <Slider.Track>
                            <Slider.Range />
                          </Slider.Track>
                          <Slider.Thumb index={0}>
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
          <IconButton variant="ghost" size="xs">
            <FaSearch />
          </IconButton>
        </InputAddon>
      </Group>
      <Flex justify="space-between" padding={2}>
        <Popover.Root positioning={{ placement: "bottom-start" }}>
          <Popover.Trigger asChild>
            <Button size="sm" variant="outline">
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
                  <Fieldset.Root paddingTop={6}>
                    <CheckboxGroup>
                      <Fieldset.Content>
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
                            <Flex align="center" gap={4}>
                              <Box boxSize={4} rounded="sm" bg={value.color} />
                              <Text>{value.name}</Text>
                            </Flex>
                          )}
                        </For>
                      </Fieldset.Content>
                    </CheckboxGroup>
                  </Fieldset.Root>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
        <Popover.Root positioning={{ placement: "bottom-end" }}>
          <Popover.Trigger asChild>
            <Button variant="outline" size="sm">
              <IoFilterSharp />
              FILTRY
            </Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Body>
                  <Popover.Title fontWeight="medium" fontSize="2xl">
                    FILTRY
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
                  <Fieldset.Root paddingTop={6}>
                    <CheckboxGroup>
                      <Fieldset.Content>
                        <For
                          each={[
                            "Schroniska",
                            "Organizacje prozwierzęce",
                            "Weterynaria",
                            "Sklepy zoologiczne",
                          ]}
                        >
                          {value => (
                            <Checkbox.Root key={value} value={value}>
                              <Checkbox.HiddenInput />
                              <Checkbox.Control>
                                <Checkbox.Indicator />
                              </Checkbox.Control>
                              <Checkbox.Label>{value}</Checkbox.Label>
                            </Checkbox.Root>
                          )}
                        </For>
                      </Fieldset.Content>
                    </CheckboxGroup>
                  </Fieldset.Root>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Flex>
    </Container>
  );
}
