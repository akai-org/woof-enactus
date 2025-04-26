"use server";
import type { AuthFormDataType } from "@/components/AuthForm";
import type { GenericServerResponse } from "@/types";

const loginAction = async (formData: AuthFormDataType) => {
  try {
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
    }: GenericServerResponse<{ accessToken: string; refreshToken: string }> =
      await res.json();
    if (!ok) throw new Error();

    localStorage.setItem("token", data.refreshToken);

    return true;
  } catch {
    console.error("error in loginAction");
    return false;
  }
};
export { loginAction };
