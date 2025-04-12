import { Link } from "@/components";
import {
  Button,
  Container,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function LoginPage() {
  return (
    <Flex
      direction="column"
      gap={6}
      m={6}
      alignItems="center"
      justifyContent="center"
    >
      <Fieldset.Root maxW="md" textAlign="center">
        <Fieldset.Legend fontSize="2xl" fontWeight="bold" color="brand.500">
          Zaloguj się
        </Fieldset.Legend>
        <Fieldset.HelperText color="brand.700">
          Podaj dane logowania
        </Fieldset.HelperText>
        <Fieldset.Content>
          <Field.Root maxW="md">
            <Field.Label>Adres email konta</Field.Label>
            <Input placeholder="Adres email" type="email" />
          </Field.Root>

          <Field.Root maxW="md">
            <Field.Label>Hasło</Field.Label>
            <Input placeholder="Hasło" type="password" />
            <Field.HelperText ml="auto">
              <Link linkProps={{ href: "/reset" }}>Przypomnij hasło</Link>
            </Field.HelperText>
          </Field.Root>
          <Button type="submit">Zaloguj się do twojej placówki</Button>
        </Fieldset.Content>
        <Fieldset.ErrorText>
          Some fields are invalid. Please check them.
        </Fieldset.ErrorText>
      </Fieldset.Root>

      <Button variant="outline" asChild>
        <NextLink href="/rejestracja">Zarejestruj nową placówkę</NextLink>
      </Button>
    </Flex>
  );
}
