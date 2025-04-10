import type {
  PartnerData,
  PartnersParams,
  GenericServerResponse,
} from "@/types";

// TODO: add logger, improve error handling
export default async function getPartners(
  params?: Partial<PartnersParams>,
): Promise<PartnerData[] | null> {
  try {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${process.env.API_URL}/partners?${searchParams}`);
    const { data, ok }: GenericServerResponse<PartnerData[]> = await res.json();

    if (!res.ok || !ok) {
      throw new Error();
    }

    return data;
  } catch {
    console.error("error in getPartners");
    return null;
  }
}
