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

const placeholder = {
  phone: "123456789",
  email: "placeholder@gmail.com",
  website: "hauhau.com",
  address: "1234 Main St, City, State, 12345",
  transport_acess: "Lorem ipsum",
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
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius nunc. Nullam sit amet odio eu est aliquet euismod. Nullam nec fermentum nunc. Nullam sit amet odio eu est aliquet euismod. Nullam nec fermentum nunc. Nullam sit amet odio eu est aliquet euismod. Nullam nec fermentum nunc.",
  animals: ["psy", "koty", "chomiki"],
  attendaceHours: "Codziennie od 12 do 15",
};

export default function PartnerInfo() {
  return (
    <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={4}>
      <VStack gap={4} align="start">
        <Card.Root w="full">
          <Card.Header p={[2, 4]}>
            <Flex align="center" gap={2} color="palette.darker">
              <FaPhoneVolume size={30} />
              <Heading size={["2xl", "4xl"]}>Szczegóły placówki</Heading>
            </Flex>
          </Card.Header>
          <Card.Body p={[2, 4]}>
            <InfoBox title="Główny numer telefonu">{placeholder.phone}</InfoBox>
            <InfoBox title="Email">{placeholder.email}</InfoBox>
            <InfoBox title="Strona internetowa">{placeholder.website}</InfoBox>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full">
          <Card.Body p={[2, 4]}>
            <InfoBox icon={<FaMapMarkerAlt />} title="Adres">
              {placeholder.address}
            </InfoBox>
            <InfoBox title="Informacje o dojeździe" direction="column">
              {placeholder.transport_acess}
            </InfoBox>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full">
          <Card.Body p={[2, 4]}>
            <InfoBox icon={<FaRegClock />} title="Godziny pracy" mb={5} />
            <VStack>
              {placeholder.workinHours.map((day, i) => (
                <Flex
                  key={i}
                  justifyContent="space-between"
                  w="full"
                  maxW={400}
                  mx="auto"
                  bg={i < 5 ? "palette.main" : "palette.lighter"}
                  color="white"
                  rounded="md"
                  p={2}
                >
                  <span>{day.label}</span>
                  <span>
                    {day.from} - {day.to}
                  </span>
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
              {placeholder.description}
            </InfoBox>
            <InfoBox title="Zwierzęta po naszą opieką" direction="column">
              <List.Root>
                {placeholder.animals.map(animal => (
                  <List.Item
                    key={animal}
                    ml={5}
                    _marker={{ color: "palette.main" }}
                  >
                    {animal}
                  </List.Item>
                ))}
              </List.Root>
            </InfoBox>
            <InfoBox title="Godziny przyjęć">
              {placeholder.attendaceHours}
            </InfoBox>
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
      <Flex align="center" gap={2} color="palette.main" textWrap="nowrap">
        {icon}
        <Heading size="lg">{title}:</Heading>
      </Flex>

      <Box color="black">{children}</Box>
    </Flex>
  );
}
