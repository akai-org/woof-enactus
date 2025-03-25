import {
  Box,
  Card,
  Flex,
  FlexProps,
  Grid,
  Heading,
  Image,
  List,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaMapMarkerAlt, FaPhoneVolume, FaRegClock } from "react-icons/fa";
import { Profile } from "../map/types";

const placeholder = {
  workinHours: [
    { label: "Poniedziałek", from: 8, to: 21 },
    { label: "Wtorek", from: 8, to: 21 },
    { label: "Środa", from: 8, to: 21 },
    { label: "Czwartek", from: 8, to: 21 },
    { label: "Piątek", from: 8, to: 21 },
    { label: "Sobota", from: 8, to: 21 },
    { label: "Niedziela", from: 8, to: 21 },
  ],
  photo: "https://placehold.co/600x400/png",
};

export default function PartnerInfo({ data }: { data: Profile }) {
  const mappedOpenHours = Object.keys(data.openHours).reduce(
    (acc, key) => {
      if (
        key !== "id" &&
        key !== "uuid" &&
        key !== "profileId" &&
        key in data.openHours
      ) {
        acc[key] = data.openHours[key as keyof Profile["openHours"]].toString();
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const getPolishDay = (day: string) => {
    switch (day) {
      case "monday":
        return "Poniedziałek";
      case "tuesday":
        return "Wtorek";
      case "wednesday":
        return "Środa";
      case "thursday":
        return "Czwartek";
      case "friday":
        return "Piątek";
      case "saturday":
        return "Sobota";
      case "sunday":
        return "Niedziela";
      default:
        return "";
    }
  };

  return (
    <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={4}>
      <VStack gap={4} align="start">
        <Card.Root w="full">
          <Card.Header p={[2, 4]}>
            <Flex align="center" gap={2} color="brand.700">
              <FaPhoneVolume size={30} />
              <Heading size={["2xl", "4xl"]}>Szczegóły placówki</Heading>
            </Flex>
          </Card.Header>
          <Card.Body p={[2, 4]}>
            <InfoBox title="Główny numer telefonu">{data.phone}</InfoBox>
            <InfoBox title="Email">{"BRAK W BAZIE DANYCH"}</InfoBox>
            <InfoBox title="Strona internetowa">{data.website}</InfoBox>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full">
          <Card.Body p={[2, 4]}>
            <InfoBox icon={<FaMapMarkerAlt />} title="Adres">
              {`${data.street}  ${data.city} ${data.postal}`}
            </InfoBox>
            <InfoBox title="Informacje o dojeździe" direction="column">
              {data.getToInfo}
            </InfoBox>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full">
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
                  bg={i < 5 ? "brand.700" : "brand.500"}
                  color="white"
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
        <Card.Root w="full">
          <Card.Body p={[2, 4]}>
            <Image src={placeholder.photo} />
          </Card.Body>
        </Card.Root>
        <Card.Root w="full">
          <Card.Body p={[2, 4]}>
            <InfoBox title="Opis placówki" direction="column">
              {data.description}
            </InfoBox>
            <InfoBox title="Zwierzęta po naszą opieką" direction="column">
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

      <Box color="black">{children}</Box>
    </Flex>
  );
}
