// TEMPORARY
type PartnerProfile = {
  id: number;
  uuid: string;
  partnerId: number;
  description: string;
  getToInfo: string;
  city: string;
  street: string;
  postal: string;
  phone: string;
  website: string;
  animals: string[];
  visitHours: string;
  email: string;
  image: string; // url
  openHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    id: number;
    uuid: string;
    profileId: number;
  };
};

type PartnerType = "SHELTER" | "VET" | "ORG" | "SHOP";

type PartnerData = {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  type: PartnerType;
  profile: PartnerProfile;
};

type PartnerNeed = {
  amountCurrent: number;
  amountMax: number;
  amountUnit: string;
  id: number;
  name: string;
  note: string;
  partnerId: number;
  state: "OK" | "MEDIUM" | "LOW";
  stateInfo: string;
  uuid: number;
};

type Legend = {
  name: string;
  color: string;
  markerPath: string;
  type: PartnerType;
};

// type for GET /partners endpoint in src/api
type PartnersParams = {
  name: string;
  city: string;
  street: string;
  type: string; // e.g. "VET,SHELTER,ORG"
};

type GenericServerResponse<T> = {
  ok: boolean;
  data: T;
  message: string;
  error: string;
};

type PartnerPageParams = {
  slug: string;
};

type HomeSearchParams = Partial<{
  query: string; // e.g. "city,street"
  type: string; // e.g. "VET,SHELTER,ORG"
}>;

export type {
  PartnerData,
  PartnerProfile,
  Legend,
  PartnersParams,
  GenericServerResponse,
  PartnerType,
  PartnerNeed,
  PartnerPageParams,
  HomeSearchParams,
};
