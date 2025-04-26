"use server";

import type { GenericServerResponse } from "@/types";

async function registerAction(formData: FormData) {
  try {
    const res = await fetch(process.env.API_URL + "/auth/register", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("mail"),
        password: formData.get("password"),
      }),
    });
    const { ok, data }: GenericServerResponse<null> = await res.json();
    if (!res.ok || !ok) {
      throw new Error();
    }
    console.log(data);
  } catch {
    console.error("error in registerAction");
  }
}

export { registerAction };
