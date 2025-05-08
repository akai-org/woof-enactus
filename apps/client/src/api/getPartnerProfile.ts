import type { PartnerData, GenericResponse } from "@/types";

// TODO: add logger, improve error handling
export default async function getPartnerProfile(
  partnerSlug: string,
): Promise<PartnerData | null> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/partners/profile/${partnerSlug}`,
    );
    const { data, ok }: GenericResponse<PartnerData> = await res.json();

    if (!res.ok || !ok) {
      throw new Error();
    }

    return data ?? null;
  } catch {
    console.error("error in getPartnerProfile");
    return null;
  }
}
