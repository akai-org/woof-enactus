"use server";

import { cookies } from "next/headers";

// TODO: add logger, improve error handling
export default async function refreshAction() {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${cookieStore.get("refreshToken")?.value}`,
    },
  });

  const json = await res.json();
  const data = json.data;
  if (!data?.authToken) return false;
  cookieStore.set({
    name: "accessToken",
    value: data.authToken,
    httpOnly: true,
  });

  return res.ok;
}
