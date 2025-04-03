import { legendItems } from "@/constants";
import {
  Button,
  CheckboxGroup,
  Fieldset,
  For,
  Popover,
  Portal,
} from "@chakra-ui/react";
import React from "react";
import { IoClose, IoFilterSharp } from "react-icons/io5";
import { Checkbox } from "@/components";

export default function Filters() {
  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Button
          variant="surface"
          size="md"
          textTransform="uppercase"
          fontWeight="bold"
        >
          <IoFilterSharp />
          Filtry
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
              >
                Filtry
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
                    <For each={legendItems}>
                      {({ name }) => (
                        <Checkbox key={name} value={name}>
                          {name}
                        </Checkbox>
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
