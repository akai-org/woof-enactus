import PartnerEvents from "@/components/partner/events";
import PartnerInfo from "@/components/partner/info";
import PartnerNeeds from "@/components/partner/needs";
import { Box, Button, For, Heading, Tabs } from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";

const tabs = [
  {
    id: "stuff",
    label: "Potrzebne rzeczy",
    color: "palette.darker",
    content: <PartnerNeeds />,
  },
  {
    id: "info",
    label: "Informacje",
    color: "palette.main",
    content: <PartnerInfo />,
  },
  {
    id: "events",
    label: "Wydarzenia",
    color: "palette.lighter",
    content: <PartnerEvents />,
  },
];

export default function PartnerPage() {
  return (
    <div>
      <Button variant="outline" size="xs">
        <RiArrowLeftLine />
        Powrót
      </Button>
      <Heading my={5} size="4xl" color="palette.darker">
        Partner
      </Heading>
      <Tabs.Root variant="outline" defaultValue={tabs[1].id} fitted pb={5}>
        <Tabs.List>
          <For each={tabs}>
            {tab => (
              <Tabs.Trigger
                value={tab.id}
                justifyContent="center"
                py="10"
                borderColor={tab.color}
                _selected={{
                  color: "white",
                }}
                bg={tab.color}
                color="white"
                borderTopRadius={30}
                fontSize={{ base: "sm", md: "lg" }}
              >
                {tab.label}
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>
        <For each={tabs}>
          {tab => (
            <Tabs.Content bg={tab.color} value={tab.id} p={[2, 4]}>
              <Box bg="white" borderRadius={20} p={2}>
                {tab.content}
              </Box>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
    </div>
  );
}
