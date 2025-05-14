import type { GenericResponse, PartnerEvent } from "@/types";

// TODO: add logger, improve error handling
export default async function getPartnerEvents(
  partnerSlug: string,
): Promise<PartnerEvent[] | null> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/events/partner/${partnerSlug}`,
    );
    const { data, ok }: GenericResponse<PartnerEvent[]> = await res.json();
    if (!res.ok || !ok) {
      throw new Error();
    }

    return data ?? null;
  } catch {
    console.error("error in getPartnerEvents");
    return null;
  }
}