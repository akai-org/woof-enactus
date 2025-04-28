"use server";
import type { AuthFormDataType } from "@/components/AuthForm";
import type { GenericResponse } from "@/types";

const loginAction = async (formData: AuthFormDataType) => {
  const res = await fetch(process.env.API_URL + "/auth/login", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const {
    data,
    ok,
  }: GenericResponse<{ accessToken: string; refreshToken: string }> =
    await res.json();
  if (!ok) {
    console.error("error in loginAction");
    return false;
  }

  return data.accessToken;
};
export { loginAction };
