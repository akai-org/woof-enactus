import { PartnerEvents, PartnerInfo, PartnerNeeds } from "@/components";
import { Box, Button, Container, For, Heading, Tabs } from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { notFound } from "next/navigation";
import { Data } from "@/types";
import { Link } from "@/components/ui/Link";

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

async function getPartnerData(uuid: string): Promise<Data> {
  const response = await fetch(
    `${process.env.API_URL}/partners/profile/${uuid}`,
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
    <Container mt={8} maxW="breakpoint-xl">
      <Button variant="outline" asChild size="sm">
        <Link linkProps={{ href: "/" }}>
          <RiArrowLeftLine />
          Powrót
        </Link>
      </Button>
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
          <For each={tabs}>
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
        <For each={tabs}>
          {tab => (
            <Tabs.Content bg={tab.color} value={tab.id} p={[2, undefined, 8]}>
              <Box bg="brand.100" borderRadius="md" p={[3, 8]}>
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
