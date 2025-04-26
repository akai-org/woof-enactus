"use server";

import type { GenericServerResponse } from "@/types";

async function loginAction(formData: FormData) {
  try {
    const res = await fetch(process.env.API_URL + "/auth/login", {
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
    const {
      data,
      ok,
    }: GenericServerResponse<{ accessToken: string; refreshToken: string }> =
      await res.json();
    if (!res.ok || !ok) {
      throw new Error();
    }
    localStorage.setItem("token", data.refreshToken);
    console.log(data)
  } catch {
    console.error("error in loginAction");
  }
}

export { loginAction };
