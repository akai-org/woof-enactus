import {
  Card,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  List,
  VStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhoneVolume } from "react-icons/fa";
import type { PartnerData } from "@/types";
import { NullishGuard, VetTypeGuard } from "@/components";
import WorkingHours from "./WorkingHours";
import InfoBox from "./InfoBox";

type PartnerInfoProps = {
  profileData: PartnerData;
};

export default function PartnerInfo({ profileData }: PartnerInfoProps) {
  const data = profileData.profile;
  const type = profileData.type;

  return (
    <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={4} w="full">
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
              <NullishGuard check={data.phone}>
                <Link color="brand.900" href={`tel:${data.phone}`}>
                  {data.phone}
                </Link>
              </NullishGuard>
            </InfoBox>

            <VetTypeGuard partnerType={type}>
              <InfoBox title="Linia nagłego kontaktu">
                <NullishGuard check={null}>
                  <Link color="brand.900" href={`tel:${data.phone}`}>
                    BRAK W BAZIE DANYCH
                  </Link>
                </NullishGuard>
              </InfoBox>
            </VetTypeGuard>

            <InfoBox title="Email">
              <NullishGuard check={data.email}>
                <Link color="brand.900" href={`mailto:${data.email}`}>
                  {data.email}
                </Link>
              </NullishGuard>
            </InfoBox>

            <InfoBox title="Strona internetowa">
              <NullishGuard check={data.website}>
                <Link color="brand.900" href={data.website}>
                  {data.website}
                </Link>
              </NullishGuard>
            </InfoBox>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full" borderColor="brand.300" borderWidth={2}>
          <Card.Body p={[2, 4]}>
            <InfoBox icon={<FaMapMarkerAlt />} title="Adres">
              <NullishGuard check={[data.street, data.city, data.postal]}>
                {`${data.street}  ${data.city} ${data.postal}`}
              </NullishGuard>
            </InfoBox>

            <InfoBox title="Informacje o dojeździe" direction="column">
              <NullishGuard check={data.getToInfo}>
                {data.getToInfo}
              </NullishGuard>
            </InfoBox>
          </Card.Body>
        </Card.Root>

        <WorkingHours workingHours={data.openHours} />
      </VStack>
      <VStack gap={4} align="start">
        <NullishGuard check={data.image} fallback={null}>
          <Card.Root w="full" borderColor="brand.300" borderWidth={2}>
            <Card.Body p={[2, 6]}>
              <Image src={data.image} alt="Zdjęcie placówki" />
            </Card.Body>
          </Card.Root>
        </NullishGuard>

        <Card.Root
          w="full"
          borderColor="brand.300"
          flexGrow={1}
          borderWidth={2}
        >
          <Card.Body p={[2, 4]} gap="4">
            <InfoBox title="Opis placówki" direction="column">
              <NullishGuard check={data.description}>
                {data.description}
              </NullishGuard>
            </InfoBox>

            <InfoBox
              title={
                type == "VET"
                  ? "Obsługiwane zwierzęta"
                  : "Zwierzęta pod naszą opieką"
              }
              direction="column"
            >
              <NullishGuard check={data.animals}>
                <List.Root>
                  {data.animals &&
                    data.animals.map(animal => (
                      <List.Item
                        key={animal}
                        ml={5}
                        _marker={{ color: "brand.700" }}
                      >
                        {animal}
                      </List.Item>
                    ))}
                </List.Root>
              </NullishGuard>
            </InfoBox>
            <InfoBox title="Godziny przyjęć">
              <NullishGuard check={data.visitHours}>
                {data.visitHours}
              </NullishGuard>
            </InfoBox>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Grid>
  );
}
