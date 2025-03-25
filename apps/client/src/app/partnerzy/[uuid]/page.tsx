import PartnerEvents from "@/components/partner/events";
import PartnerInfo from "@/components/partner/info";
import PartnerNeeds from "@/components/partner/needs";
import { Box, Button, Container, For, Heading, Tabs } from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { notFound, useRouter } from "next/navigation";
import { Data } from "@/components/map/types";

const tabs = [
  {
    id: "stuff",
    label: "Potrzebne rzeczy",
    color: "brand.700",
    content: <PartnerNeeds />,
  },
  {
    id: "info",
    label: "Informacje",
    color: "brand.600",
  },
  {
    id: "events",
    label: "Wydarzenia",
    color: "brand.500",
    content: <PartnerEvents />,
  },
];

async function getPartnerData(uuid: string) {
  const response = await fetch(
    `http://localhost:3000/partners/profile/${uuid}`,
  ).then(res => res.json());
  if (!response.ok) notFound();
  return response.data;
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const profileData = await getPartnerData(uuid);

  return (
    <Container mt={8}>
      <Button variant="outline" size="xs">
        <RiArrowLeftLine />
        Powrót
      </Button>
      <Heading my={5} size="4xl" color="brand.700">
        {profileData.name}
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
                {tab.id == "info" ? (
                  <PartnerInfo data={profileData.profile} />
                ) : (
                  tab.content
                )}
              </Box>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
    </Container>
  );
}
