"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function loginAction(
  prevState: unknown,
  formData: FormData,
) {
  const username = formData.get("email") as string;
  const password = formData.get("pass") as string;
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
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
  //console.log(json);

  if (!json.ok) return json.message;

  const data = json.data;
  const cookieStore = await cookies();
  cookieStore.set({
    name: "accessToken",
    value: data.accessToken,
    httpOnly: true,
  });
  cookieStore.set({
    name: "refreshToken",
    value: data.refreshToken,
    httpOnly: true,
  });

  redirect("/panel-placowki");
}
