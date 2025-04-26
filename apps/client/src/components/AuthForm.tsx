import { Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";
import { Link } from "@/components/ui/";
import { type ReactNode } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  legend: string;
  submit: string;
  rememberPassword?: boolean;
  children?: ReactNode;
};

function AuthForm(props: Props) {
  const { action, legend, submit, rememberPassword = false, children } = props;

  return (
    <Flex
      direction="column"
      gap={6}
      m={6}
      alignItems="center"
      justifyContent="center"
    >
      <Fieldset.Root maxW="md" textAlign="center">
        <form action={action}>
          <Fieldset.Legend
            fontSize="2xl"
            fontWeight="bold"
            mb={5}
            color="brand.500"
          >
            {legend}
          </Fieldset.Legend>
          <Fieldset.Content>
            <Field.Root maxW="md">
              <Field.Label>Adres email konta</Field.Label>
              <Input
                id="mail"
                name="mail"
                required
                placeholder="Adres email"
                type="email"
              />
            </Field.Root>

            <Field.Root maxW="md">
              <Field.Label>Hasło</Field.Label>
              <Input
                id="password"
                name="password"
                required
                placeholder="Hasło"
                type="password"
              />
            </Field.Root>
            {rememberPassword && (
              <Link
                chakraLinkProps={{ fontSize: "sm", alignSelf: "end" }}
                linkProps={{ href: "/reset" }}
              >
                Przypomnij hasło
              </Link>
            )}
            <Button type="submit">{submit}</Button>
          </Fieldset.Content>
          <Fieldset.ErrorText>
            Some fields are invalid. Please check them.
          </Fieldset.ErrorText>
        </form>
      </Fieldset.Root>
      {children}
    </Flex>
  );
}
export { AuthForm };
