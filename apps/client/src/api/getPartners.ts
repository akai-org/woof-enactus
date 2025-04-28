import type { PartnerData, PartnersParams, GenericResponse } from "@/types";

// TODO: add logger, improve error handling
export default async function getPartners(
  params?: Partial<PartnersParams>,
): Promise<PartnerData[] | null> {
  try {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${process.env.API_URL}/partners?${searchParams}`);
    const { data, ok }: GenericResponse<PartnerData[]> = await res.json();

    if (!res.ok || !ok) {
      throw new Error();
    }

    return data ?? null;
  } catch {
    console.error("error in getPartners");
    return null;
  }
}
