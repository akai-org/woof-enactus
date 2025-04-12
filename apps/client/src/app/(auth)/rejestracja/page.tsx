import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const placowki = [
  {
    name: "Schronisko",
    color: "brand.700",
    link: "/register/schronisko",
  },
  {
    name: "Organizacja prozwierzęca",
    color: "brand.400",
    link: "/register/organizacja",
  },
  {
    name: "Gabinet weterynaryjny",
    color: "accent.yellow",
    link: "/register/weterynarz",
  },
  {
    name: "Sklep zoologiczny",
    color: "brand.500",
    link: "/register/sklep",
  },
];

export default function RegisterPage() {
  return (
    <Container maxW="breakpoint-xl" my="12">
      <Flex
        direction="column"
        gap={6}
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="4xl" color="brand.500">
          Rejestracja placówki
        </Heading>
        <Heading as="h2" size="lg" color="brand.700">
          Wybierz odpowiedni rodzaj placówki
        </Heading>
        <Flex w="full" justify="space-between" gap="5">
          {placowki.map(placowka => (
            <Box
              w="full"
              textAlign="center"
              key={placowka.name}
              borderWidth="1px"
              borderColor={placowka.color}
              asChild
            >
              <Link href={placowka.link}>
                <Heading as="h3" size="lg" color={placowka.color}>
                  {placowka.name}
                </Heading>
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}
