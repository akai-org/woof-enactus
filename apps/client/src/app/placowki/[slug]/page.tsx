import { Box, Container, For, Heading, Tabs } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import {
  PartnerInfo,
  PartnerNeeds,
  PartnerEvents,
  GoBackButton,
} from "@/components";
import { getPartnerProfile } from "@/api";
import type { PartnerPageParams } from "@/types";

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

export async function generateStaticParams() {
  // const partners = await fetch(`${process.env.API_URL}/partners`).then(res =>
  //   res.json(),
  // );

  // return partners.data.map((p: { slug: string }) => ({
  //   slug: p.slug,
  // }));
   
  // Backend nie jest dostępny podczas budowania,
  // dlatego w generateStaticParams() nie może być
  // funkcji fetch
  return [];
}

export const dynamic = "auto";

export default async function PartnerPage({
  params,
}: {
  params: Promise<PartnerPageParams>;
}) {
  const { slug } = await params;
  const profileData = await getPartnerProfile(slug);

  if (!profileData) notFound();

  const tabsToShow = [];
  switch (profileData.type) {
    case "VET":
      tabsToShow.push(tabs[1]);
      break;
    case "SHOP":
      tabsToShow.push(tabs[1]);
      break;
    default:
      tabsToShow.push(tabs[0], tabs[1], tabs[2]);
  }

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
            <Tabs.Content bg={tab.color} value={tab.id} p={[2, undefined, 8]}>
              <Box bg="brand.100" borderRadius="md" p={[3, 8]}>
                {tab.id == "info" && <PartnerInfo profileData={profileData} />}
                {tab.id == "stuff" && <PartnerNeeds slug={slug} />}
                {tab.id == "events" && <PartnerEvents slug={slug}/>}
              </Box>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
    </Container>
  );
}
