"use server";
import type { AuthFormDataType } from "@/components/AuthForm";
import type { GenericServerResponse } from "@/types";

async function registerAction(formData: AuthFormDataType) {
  try {
    const res = await fetch(process.env.API_URL + "/auth/register", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const { ok }: GenericServerResponse<null> = await res.json();
    if (!ok) throw new Error();
    return true;
  } catch {
    console.error("error in registerAction");
    return false;
  }
}

export { registerAction };
