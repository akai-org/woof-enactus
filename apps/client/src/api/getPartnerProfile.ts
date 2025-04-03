import type { PartnerData, ServerResponse } from "@/types";

// TODO: add logger, improve error handling
export default async function getPartnerProfile(
  partnerUuid: string,
): Promise<PartnerData | null> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/partners/profile/${partnerUuid}`,
    );
    const { data, ok }: ServerResponse<PartnerData> = await res.json();

    if (!res.ok || !ok) {
      throw new Error();
    }

    return data;
  } catch {
    console.error("error in getPartnerProfile");
    return null;
  }
}
