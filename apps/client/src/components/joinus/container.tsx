import { Box, Button, Card, Container, Heading, Text } from "@chakra-ui/react";

export default function JoinUsContainer() {
    return (
        
          <Container padding="20px" gap={20} display="flex" flexDirection="column" marginBottom="40px">
            <Card.Root  borderColor="brand.300" backgroundColor="brand.200">
              <Card.Header>
                    <Heading  fontStyle="italic" lineHeight="80px" margin="auto" color="brand.600" size="5xl" fontWeight="350">
                        Reprezentujesz schronisko dla zwierząt <br/>lub orgaznizacje prozwierzęcą i chciałbyś <br/>
                        przedstawić swoją placówkę? Dołącz do <Text as="span" color="brand.500">HAUMAPS</Text>! 
                    </Heading>
              </Card.Header>
              <Card.Body>
                <Button margin="auto" backgroundColor="accent.green" padding="50px" maxWidth="50%">
                    <Heading color="white" size="5xl" fontWeight="500">
                        ZAREJESTRUJ PLACÓWKĘ!
                    </Heading>
                </Button>
              </Card.Body>
            </Card.Root>
          </Container>
        
      );
}