import { loginAction } from "@/api/loginAction";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function LoginPage() {
  return (
    <AuthForm
      onSubmitProp={loginAction}
      legend="Zaloguj się"
      submit="Zaloguj się do twojej placówki"
      rememberPassword
    >
      <Button variant="outline" asChild>
        <NextLink href="/rejestracja">Zarejestruj nową placówkę</NextLink>
      </Button>
    </AuthForm>
  );
}
