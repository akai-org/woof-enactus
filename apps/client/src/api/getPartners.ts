import type { Data, PartnersSearchParams } from "@/types";

export default async function getPartners(
  params?: Partial<PartnersSearchParams>,
): Promise<Data[] | null> {
  const searchParams = new URLSearchParams(params);

  const res = await fetch(
    `${process.env.API_URL}/partners?${searchParams}`,
  ).then(res => res.json());

  if (!res.ok) {
    return null;
  }
  return res.data;
}
