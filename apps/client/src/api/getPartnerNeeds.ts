import type { GenericServerResponse, PartnerNeeds } from "@/types";

// TODO: add logger, improve error handling
export default async function getPartnerNeeds(
  partnerSlug: string,
): Promise<PartnerNeeds | null> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/partners/${partnerSlug}/needed-goods`,
    );
    const { data, ok }: GenericServerResponse<PartnerNeeds> = await res.json();
    if (!res.ok || !ok) {
      throw new Error();
    }

    return data;
  } catch {
    console.error("error in getPartnerNeeds");
    return null;
  }
}
