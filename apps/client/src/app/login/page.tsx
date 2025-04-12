import { Link } from "@/components";
import {
  Button,
  Container,
  Field,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Container maxW="breakpoint-xl" my="12">
      <Flex
        direction="column"
        gap={6}
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="4xl" color="brand.500">
          Zaloguj się
        </Heading>
        <Heading as="h2" size="lg" color="brand.700">
          Podaj dane logowania
        </Heading>

        <Field.Root maxW="md">
          <Field.Label>Adres email konta</Field.Label>
          <Input placeholder="Adres email" type="email" />
        </Field.Root>

        <Field.Root maxW="md">
          <Field.Label>Hasło</Field.Label>
          <Input placeholder="Hasło" type="password" />
          <Field.HelperText ml="auto">
            <Link linkProps={{ href: "/password-reset" }}>
              Przypomnij hasło
            </Link>
          </Field.HelperText>
        </Field.Root>
        <Button>Zaloguj się do twojej placówki</Button>
        <Button variant="outline">Zarejestruj nową placówkę</Button>
      </Flex>
    </Container>
  );
}
