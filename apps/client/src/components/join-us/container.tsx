import { Button, Card, Container, Heading, Span } from "@chakra-ui/react";
import Link from "next/link";

export default function JoinUsContainer() {
  return (
    <Container gap={20} marginBottom="10">
      <Card.Root
        marginY="10"
        marginX="auto"
        maxWidth="70ch"
        borderColor="brand.300"
        backgroundColor="brand.200"
        p="4"
      >
        <Card.Header>
          <Heading
            lineHeight="45px"
            margin="auto"
            color="brand.600"
            size={{ base: "xl", sm: "2xl" }}
            fontWeight="350"
            textAlign="center"
          >
            Reprezentujesz schronisko dla zwierząt lub organizację prozwierzęcą
            i chciałbyś przedstawić swoją placówkę? Dołącz do{" "}
            <Span color="brand.500" textTransform="uppercase">
              Haumaps
            </Span>
            !
          </Heading>
        </Card.Header>
        <Card.Body>
          <Button
            variant="cta"
            size={{ base: "xl", sm: "2xl" }}
            alignSelf="center"
            disabled
            color="white"
            fontWeight="500"
            asChild
          >
            {/* <Link href="/rejestracja"> */}
            <Span fontSize={{ base: "xl", sm: "2xl" }}>
              ZAREJESTRUJ PLACÓWKĘ!
            </Span>
            {/* </Link> */}
          </Button>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
