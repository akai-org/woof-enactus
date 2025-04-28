"use server";
import type { GenericResponse } from "@/types";

export default async function refreshToken(): Promise<any | null> {
  const res = await fetch(`${process.env.API_URL}/auth/refresh`);
  const res2: GenericResponse<any> = await res.json();
  console.log(res2);
}
