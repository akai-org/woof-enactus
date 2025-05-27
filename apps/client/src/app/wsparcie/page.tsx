import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Strong,
  Text,
} from "@chakra-ui/react";
import { FiCoffee } from "react-icons/fi";

export default function SupportPage() {
  return (
    <Box bgColor="brand.100">
      <Container py={20} maxWidth="breakpoint-lg">
        <Card.Root
          borderColor="black"
          padding={{ base: "1", sm: "6", md: "10" }}
        >
          <Card.Header>
            <Heading
              color="brand.500"
              size={{ base: "3xl", md: "5xl" }}
              fontWeight="600"
              mb="6"
            >
              Chcesz wesprzeć nasz projekt?
            </Heading>
          </Card.Header>
          <Card.Body>
            <Flex
              alignItems="flex-start"
              flexDirection={{ base: "column-reverse", md: "row" }}
              gap="20px"
            >
              <Box flex={1} width={{ base: "100%", md: "50%" }}>
                <Card.Description lineHeight="25px" fontWeight="500">
                  Tworzymy WOOF z myślą o zwierzętach, które każdego dnia
                  potrzebują pomocy a Twoje wsparcie finansowe może realnie
                  przyczynić się do poprawy ich losu. Każda wpłata to krok
                  bliżej do uruchomienia w pełni funkcjonalnej aplikacji, która
                  połączy ludzi dobrej woli ze schroniskami i organizacjami pro
                  zwierzęcymi w całej Polsce. Twoja darowizna pomoże nam
                  rozwijać technologię, utrzymywać serwery, tworzyć nowe funkcje
                  oraz szerzyć wiedzę i empatię wobec zwierząt.
                  <br />
                  <br />
                  <Strong>
                    Hej, jesteś przedsiębiorcą i szukasz wartościowego projektu
                    CSR?
                  </Strong>
                  <br />
                  WOOF to idealna przestrzeń do pokazania społecznego
                  zaangażowania. Wspierając nas, stajesz się partnerem realnej
                  zmiany. Twoja firma może wesprzeć finansowo konkretne
                  schronisko, ufundować potrzebne narzędzia do działania
                  platformy lub wesprzeć projekt, pomagając dotrzeć z naszą
                  misją do jeszcze szerszego grona odbiorców.
                  <br />
                  <br />
                  <Strong>
                    A może po prostu kochasz zwierzęta i chcesz zrobić coś
                    dobrego?
                  </Strong>
                  <br />
                   Wesprzyj nasz projekt jako osoba prywatna. Każda
                  złotówka naprawdę się liczy! Nawet najmniejsza wpłata zbliża
                  nas do uruchomienia aplikacji, która ułatwi pomaganie i dotrze
                  tam, gdzie potrzeba jest największa. Jeśli chcesz stać się
                  częścią tej zmiany – wesprzyj nasz projekt! 
                  <br/>
                  <br/>
                  Dziękujemy, że
                  jesteś z nami!
                </Card.Description>
              </Box>
              {/* <Image
                width={{ base: "100%", md: "50%" }}
                src={AboutUs1.src}
                alt=""
                padding="5"
              /> */}
            </Flex>
            <Button variant="cta" size="2xl" alignSelf="center" mt="8" asChild>
              <Link href="https://ko-fi.com" color="brand.100">
                <FiCoffee color="white" />
                Support us on Ko-fi
              </Link>
            </Button>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
