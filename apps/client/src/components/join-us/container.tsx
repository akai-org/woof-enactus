import { Box, Button, Card, Container, Heading, Text } from "@chakra-ui/react";

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
            <Text as="span" color="brand.500" textTransform="uppercase">
              Haumaps
            </Text>
            !
          </Heading>
        </Card.Header>
        <Card.Body>
          <Button variant="cta" size="2xl" alignSelf="center">
            <Heading fontSize="2xl" color="white" fontWeight="500">
              ZAREJESTRUJ PLACÓWKĘ!
            </Heading>
          </Button>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
