import {
  Button,
  Checkbox,
  CheckboxGroup,
  Fieldset,
  For,
  Popover,
  Portal,
} from "@chakra-ui/react";
import React from "react";
import { IoClose, IoFilterSharp } from "react-icons/io5";

export default function Filters() {
  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Button variant="outline" size="xs">
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
                        <Checkbox.Root
                          key={value}
                          value={value}
                          colorPalette="green"
                        >
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
  );
}
