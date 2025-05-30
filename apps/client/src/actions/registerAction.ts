"use server";

import { redirect } from "next/navigation";

export default async function registerAction(
  prevState: unknown,
  formData: FormData,
) {
  const username = formData.get("email") as string;
  const password = formData.get("pass") as string;
  const res = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const json = await res.json();

  if (!json.ok) return json.message;
  redirect("/zaloguj-sie");
}
