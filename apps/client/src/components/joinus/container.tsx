import { Box, Button, Card, Container, Heading, Text } from "@chakra-ui/react";

export default function JoinUsContainer() {
  return (
    <Container
      
      gap={20}
      display="flex"
      flexDirection="column"
      marginBottom="40px"
    >
      <Card.Root
      
        margin="auto"
        maxWidth="650px"
        borderColor="brand.300"
        backgroundColor="brand.200"
      >
        <Card.Header>
          <Heading
            fontStyle="italic"
            lineHeight="50px"
            margin="auto"
            color="brand.600"
            size="2xl"
            fontWeight="350"
          >
            Reprezentujesz schronisko dla zwierząt <br />
            lub orgaznizacje prozwierzęcą i chciałbyś <br />
            przedstawić swoją placówkę? Dołącz do{" "}
            <Text as="span" color="brand.500">
              HAUMAPS
            </Text>
            !
          </Heading>
        </Card.Header>
        <Card.Body>
          <Button
            margin="auto"
            backgroundColor="accent.green"
            padding="35px"
            width="auto"
          >
            <Heading fontSize="xl" color="white" fontWeight="500">
              ZAREJESTRUJ PLACÓWKĘ!
            </Heading>
          </Button>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
