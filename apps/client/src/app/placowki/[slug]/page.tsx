import { PartnerInfo, PartnerNeeds, PartnerEvents } from "@/features/partners";
import { getContainer } from "@/features/di";
import { ErrorMessage, GoBackButton } from "@/components";

import { Box, Container, For, Heading, Tabs } from "@chakra-ui/react";

import type { PartnerPageParams, PartnerType } from "@/types";
import type { IPartnerService } from "@/services";

const tabs = [
  {
    id: "stuff",
    label: "Potrzebne rzeczy",
    color: "brand.700",
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
  },
];

const getTabs = (type: PartnerType) => {
  const tabsToShow = [];
  switch (type) {
    case "ORG":
    case "SHELTER":
      tabsToShow.push(tabs[0]);
    default:
      tabsToShow.push(tabs[1], tabs[2]);
      break;
  }

  return tabsToShow;
};

export default async function PartnerPage({
  params,
}: {
  params: Promise<PartnerPageParams>;
}) {
  const { slug } = await params;

  const profile = await getContainer()
    .resolve<IPartnerService>("PartnerService")
    .getProfile(slug);

  if (!profile.success)
    return <ErrorMessage message={profile.error.userMessage} />;

  const tabsToShow = getTabs(profile.data.type);
  const profileData = profile.data;

  return (
    <Container mt={8} maxW="breakpoint-xl">
      <GoBackButton />
      <Heading
        my={5}
        size={{ base: "4xl", md: "5xl" }}
        as="h1"
        color="brand.700"
      >
        {profileData.name}
      </Heading>
      <Tabs.Root variant="outline" defaultValue={tabs[1].id} fitted pb={5}>
        <Tabs.List>
          <For each={tabsToShow}>
            {tab => (
              <Tabs.Trigger
                value={tab.id}
                key={tab.id}
                justifyContent="center"
                py={{ base: "8", md: "10" }}
                borderColor={tab.color}
                _selected={{
                  color: "brand.100",
                }}
                bg={tab.color}
                color="brand.100"
                borderTopRadius={"4xl"}
                fontSize={{ base: "sm", md: "lg" }}
              >
                {tab.label}
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>
        <For each={tabsToShow}>
          {tab => (
            <Tabs.Content
              bg={tab.color}
              value={tab.id}
              key={tab.id}
              p={[2, undefined, 8]}
            >
              <Box bg="brand.100" borderRadius="md" p={[3, 8]}>
                {tab.id === "info" && <PartnerInfo profileData={profileData} />}
                {tab.id === "stuff" && <PartnerNeeds slug={slug} />}
                {tab.id === "events" && <PartnerEvents slug={slug} />}
              </Box>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
    </Container>
  );
}
