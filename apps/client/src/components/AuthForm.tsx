"use client";
import { Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";
import { Link } from "@/components/ui/";
import { type ReactNode } from "react";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

type Props = {
  onSubmitProp: (data: AuthFormDataType) => Promise<boolean>;
  legend: string;
  submit: string;
  rememberPassword?: boolean;
  children?: ReactNode;
};

const schema = z.object({
  username: z
    .string({ message: "To pole jest wymagane" })
    .min(4, "Email musi mieć co najmniej 4 znaki"),
  password: z
    .string({ message: "To pole jest wymagane" })
    .min(4, "Hasło musi mieć co najmniej 4 znaki"),
});

type AuthFormDataType = z.infer<typeof schema>;

function AuthForm(props: Props) {
  const {
    onSubmitProp,
    legend,
    submit,
    rememberPassword = false,
    children,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<AuthFormDataType> = async data => {
    const ok = await onSubmitProp(data);
    if (typeof ok == "string") {
      localStorage.setItem("token", ok);
      redirect("/panel-zarzadzania");
    }
    if (!ok) setError("root", { message: "Nieprawidłowe dane logowania" });
    if (ok) redirect("/zaloguj-sie");
  };
  return (
    <Flex
      direction="column"
      gap={6}
      m={6}
      alignItems="center"
      justifyContent="center"
    >
      <Fieldset.Root maxW="md" textAlign="center" invalid={errors.root && true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Legend
            fontSize="2xl"
            fontWeight="bold"
            mb={5}
            color="brand.500"
          >
            {legend}
          </Fieldset.Legend>
          <Fieldset.Content>
            <Field.Root maxW="md" invalid={errors.username && true}>
              <Field.Label>Adres email konta</Field.Label>
              <Input
                placeholder="Adres email"
                type="email"
                {...register("username")}
              />
              <Field.ErrorText>
                {errors.username && errors.username.message}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root maxW="md" invalid={errors.password && true}>
              <Field.Label>Hasło</Field.Label>
              <Input
                placeholder="Hasło"
                type="password"
                {...register("password")}
              />
              <Field.ErrorText>
                {errors.password && errors.password.message}
              </Field.ErrorText>
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
            <Fieldset.ErrorText>
              {errors.root && errors.root.message}
            </Fieldset.ErrorText>
          </Fieldset.Content>
        </form>
      </Fieldset.Root>
      {children}
    </Flex>
  );
}
export { AuthForm };
export type { AuthFormDataType };
