import {
  Box,
  Card,
  Flex,
  type FlexProps,
  Grid,
  Heading,
  Image,
  Link,
  List,
  VStack,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { FaMapMarkerAlt, FaPhoneVolume, FaRegClock } from "react-icons/fa";
import type { PartnerData, PartnerProfile } from "@/types";

const polishDays: Record<string, string> = {
  monday: "Poniedziałek",
  tuesday: "Wtorek",
  wednesday: "Środa",
  thursday: "Czwartek",
  friday: "Piątek",
  saturday: "Sobota",
  sunday: "Niedziela",
};

const getPolishDay = (day: string) => polishDays[day] ?? "";

export default function PartnerInfo({
  profileData,
}: {
  profileData: PartnerData;
}) {
  const data = profileData.profile;
  const type = profileData.type;

  const mappedOpenHours = Object.keys(data.openHours).reduce(
    (acc, key) => {
      if (
        key !== "id" &&
        key !== "uuid" &&
        key !== "profileId" &&
        key in data.openHours
      ) {
        acc[key] =
          data.openHours[key as keyof PartnerProfile["openHours"]].toString();
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={4}>
      <VStack gap={4} align="start">
        <Card.Root w="full" borderColor="brand.300" borderWidth={2}>
          <Card.Header>
            <Flex align="center" gap={2} color="brand.700">
              <FaPhoneVolume size={30} />
              <Heading as="h2" size={["2xl", "3xl"]}>
                Szczegóły placówki
              </Heading>
            </Flex>
          </Card.Header>
          <Card.Body>
            <InfoBox title="Główny numer telefonu">
              <Link color="brand.900" href={`tel:${data.phone}`}>
                {data.phone}
              </Link>
            </InfoBox>
            {type == "VET" && (
              <InfoBox title="Linia nagłego kontaktu">
                <Link color="brand.900" href={`tel:${data.phone}`}>
                  BRAK W BAZIE DANYCH
                </Link>
              </InfoBox>
            )}
            <InfoBox title="Email">
              <Link color="brand.900" href={`mailto:${data.email}`}>
                {data.email}
              </Link>
            </InfoBox>
            <InfoBox title="Strona internetowa">
              <Link color="brand.900" href={`mailto:${data.website}`}>
                {data.website}
              </Link>
            </InfoBox>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full" borderColor="brand.300" borderWidth={2}>
          <Card.Body p={[2, 4]}>
            <InfoBox icon={<FaMapMarkerAlt />} title="Adres">
              {`${data.street}  ${data.city} ${data.postal}`}
            </InfoBox>
            <InfoBox title="Informacje o dojeździe" direction="column">
              {data.getToInfo}
            </InfoBox>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full" borderColor="brand.300" borderWidth={2}>
          <Card.Body p={[2, 4]}>
            <InfoBox icon={<FaRegClock />} title="Godziny pracy" mb={5} />
            <VStack>
              {Object.entries(mappedOpenHours).map(([day, hours], i) => (
                <Flex
                  key={i}
                  justifyContent="space-between"
                  w="full"
                  maxW={400}
                  mx="auto"
                  bg={i < 5 ? "brand.600" : "brand.500"}
                  color="brand.100"
                  rounded="md"
                  p={2}
                >
                  <span>{getPolishDay(day)}</span>
                  <span>{hours}</span>
                </Flex>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
      <VStack gap={4} align="start">
        <Card.Root w="full" borderColor="brand.300" borderWidth={2}>
          <Card.Body p={[2, 6]}>
            <Image src={data.image} alt="" />
          </Card.Body>
        </Card.Root>
        <Card.Root
          w="full"
          borderColor="brand.300"
          flexGrow={1}
          borderWidth={2}
        >
          <Card.Body p={[2, 4]} gap="4">
            <InfoBox title="Opis placówki" direction="column">
              {data.description}
            </InfoBox>
            <InfoBox
              title={
                type == "VET"
                  ? "Obsługiwane zwierzęta"
                  : "Zwierzęta po naszą opieką"
              }
              direction="column"
            >
              <List.Root>
                {data.animals.map(animal => (
                  <List.Item
                    key={animal}
                    ml={5}
                    _marker={{ color: "brand.700" }}
                  >
                    {animal}
                  </List.Item>
                ))}
              </List.Root>
            </InfoBox>
            <InfoBox title="Godziny przyjęć">{data.visitHours}</InfoBox>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Grid>
  );
}

function InfoBox({
  icon,
  title,
  children,
  ...rest
}: { icon?: ReactNode; title: string; children?: ReactNode } & FlexProps) {
  return (
    <Flex
      align={rest.direction == "column" ? "start" : "center"}
      gap={2}
      my={1}
      wrap="wrap"
      {...rest}
    >
      <Flex align="center" gap={2} color="brand.500" textWrap="nowrap">
        {icon}
        <Heading size="lg" fontWeight="bold">
          {title}:
        </Heading>
      </Flex>

      <Box color="brand.900">{children}</Box>
    </Flex>
  );
}
