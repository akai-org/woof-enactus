"use client";
import registerAction from "@/api/registerAction";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
  email: "",
  pass: "",
};

export default function ZarejestrujSiePage() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <Stack>
      <form action={formAction}>
        <Fieldset.Root
          size="lg"
          maxW="md"
          mx="auto"
          mt={10}
          invalid={state.message}
        >
          <Stack textAlign="center">
            <Fieldset.Legend
              as="h1"
              fontSize="3xl"
              color="brand.500"
              fontWeight="semibold"
            >
              Zarejestruj się
            </Fieldset.Legend>
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
          <Fieldset.ErrorText w="fit" mx="auto">
            {state?.message}
          </Fieldset.ErrorText>
          <Button type="submit" alignSelf="center" disabled={pending}>
            Zarejestruj placówkę
          </Button>
        </Fieldset.Root>
      </form>

      <Button variant="outline" alignSelf="center" mt={5}>
        <Link href="/zaloguj-sie">Masz już konto? Zaloguj się</Link>
      </Button>
    </Stack>
  );
}
