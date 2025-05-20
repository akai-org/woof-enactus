"use client";
import { loginAction } from "@/actions";
import {
  Button,
  Container,
  Field,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
  email: "",
  pass: "",
};

export default function ZalogujSiePage() {
  const [message, formAction, pending] = useActionState(loginAction, null);

  return (
    <Container>
      <form action={formAction}>
        <Fieldset.Root size="lg" maxW="md" mx="auto" mt={10} invalid={message}>
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

          <Button
            disabled={pending}
            type="submit"
            alignSelf="center"
            variant="cta"
          >
            Zaloguj się do swojej placówki
          </Button>
          {/* <Fieldset.ErrorText w="fit" mx="auto">
            {message}
          </Fieldset.ErrorText> */}
        </Fieldset.Root>
      </form>
      {/* <Button variant="ghost" alignSelf="center" asChild>
        <Link href="/przypomnij-haslo">Zapomniałem\am hasła</Link>
      </Button> */}
      {/* <Button variant="outline" alignSelf="center">
        <Link href="/rejestracja">Zarejestruj placówke</Link>
      </Button> */}
    </Container>
  );
}
