import { registerAction } from "@/actions/registerAction";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function OrgRegisterPage() {
  return (
    <AuthForm
      action={registerAction}
      legend="Zarejestruj się"
      submit="Zarejestruj placówkę"
    >
      <Button variant="outline" asChild>
        <NextLink href="/zaloguj-sie">Masz już konto? Zaloguj się</NextLink>
      </Button>
    </AuthForm>
  );
}
