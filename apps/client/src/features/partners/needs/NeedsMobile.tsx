import type { GoodsState, PartnerNeeds } from "@/types";
import { Accordion, Box, Flex, HStack, Span } from "@chakra-ui/react";
import React from "react";

type NeedsMobileProps = {
  needs: PartnerNeeds;
  priorityColors: Readonly<Record<GoodsState, string>>;
};

function NeedsMobile({ needs, priorityColors }: NeedsMobileProps) {
  return (
    <Accordion.Root
      collapsible
      defaultValue={["0"]}
      hideFrom="md"
      borderWidth={1}
      borderColor="brand.300"
      borderRadius="sm"
      mt="6"
    >
      {needs.goods.map((need, i) => (
        <Accordion.Item
          key={need.uuid}
          value={i.toString()}
          bgColor={i % 2 === 0 ? "brand.300" : "brand.100"}
          py="2"
        >
          <Accordion.ItemTrigger justifyContent="space-between" px="2">
            <HStack>
              <Span>{need.name}</Span>
              <Box
                bg={priorityColors[need.state]}
                minW={4}
                boxSize={4}
                rounded={"md"}
              />
            </HStack>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent px="2">
            <Accordion.ItemBody>
              Stan obecny:{" "}
              {`${need.amountCurrent ?? 0} / ${need.amountMax} ${need.amountUnit ?? ""}`}
              <Flex alignItems="center" gap={2} mt="2">
                <Box
                  bg={priorityColors[need.state]}
                  minW={4}
                  boxSize={4}
                  rounded={"md"}
                />
                {need.stateInfo}
              </Flex>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export default NeedsMobile;
