import type { Data } from "@/types";

export default async function getPartner(uuid: string): Promise<Data | null> {
  const res = await fetch(
    `${process.env.API_URL}/partners/profile/${uuid}`,
  ).then(res => res.json());

  if (!res.ok) {
    return null;
  }

  return res.data;
}
