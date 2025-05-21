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
            lineHeight="50px"
            margin="auto"
            color="brand.600"
            size="2xl"
            fontWeight="350"
          >
            Reprezentujesz schronisko dla zwierząt <br />
            lub orgaznizacje prozwierzęcą i chciałbyś <br />
            przedstawić swoją placówkę? Dołącz do{" "}
            <Span color="brand.500" textTransform="uppercase">
              Haumaps
            </Span>
            !
          </Heading>
        </Card.Header>
        <Card.Body>
          <Button variant="cta" size="2xl" alignSelf="center" disabled asChild>
            {/* <Link href="/rejestracja"> */}
            <Span fontSize="2xl" color="white" fontWeight="500">
              ZAREJESTRUJ PLACÓWKĘ!
            </Span>
            {/* </Link> */}
          </Button>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
