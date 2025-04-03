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

type PartnerData = {
  id: number;
  uuid: string;
  name: string;
  latitude: number;
  longitude: number;
  type: "SHELTER" | "VET" | "ORG" | "SHOP";
  profile: PartnerProfile;
};

type Legend = {
  name: string;
  color: string;
  markerPath: string;
  type: PartnerData["type"];
};

type PartnersParams = {
  name: string;
  city: string;
  street: string;
  type: PartnerData["type"];
};

type ServerResponse<T> = {
  ok: boolean;
  data: T;
};

export type {
  PartnerData,
  PartnerProfile,
  Legend,
  PartnersParams,
  ServerResponse,
};
