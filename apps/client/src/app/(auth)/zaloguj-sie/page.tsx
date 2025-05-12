import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function ZalogujSiePage() {
  return (
    <Stack>
      <Fieldset.Root size="lg" maxW="md" mx="auto" mt={10}>
        <Stack textAlign="center">
          <Fieldset.Legend
            as="h1"
            fontSize="3xl"
            color="brand.500"
            fontWeight="semibold"
          >
            Zaloguj się
          </Fieldset.Legend>
          <Fieldset.HelperText color="brand.700" fontWeight="semibold">
            Podaj dane logowania{" "}
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Adres e-mail</Field.Label>
            <Input name="email" type="email" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Hasło</Field.Label>
            <Input name="pass" type="password" />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="center">
          Zaloguj się do swojej placówki
        </Button>
      </Fieldset.Root>

      <Button variant="ghost" alignSelf="center" asChild>
        <Link href="/przypomnij-haslo">Zapomniałem\am hasła</Link>
      </Button>
      <Button variant="outline" alignSelf="center">
        <Link href="/zarejestruj-sie">Zarejestruj placówke</Link>
      </Button>
    </Stack>
  );
}
