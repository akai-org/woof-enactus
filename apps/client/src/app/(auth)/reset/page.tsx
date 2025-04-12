import { Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";

export default function ResetPage() {
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
          Zresetuj hasło
        </Fieldset.Legend>
        <Fieldset.HelperText color="brand.700">
          Podaj email na który wyślemy link do resetu hasła
        </Fieldset.HelperText>
        <Fieldset.Content>
          <Field.Root maxW="md">
            <Field.Label>Adres email konta</Field.Label>
            <Input placeholder="Adres email" type="email" />
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit">Wyślij link</Button>
      </Fieldset.Root>
    </Flex>
  );
}
