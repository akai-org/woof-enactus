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

type PartnerType = "SHELTER" | "VET" | "ORG" | "SHOP";

type PartnerData = {
  id: number;
  uuid: string;
  name: string;
  latitude: number;
  longitude: number;
  type: PartnerType;
  profile: PartnerProfile;
};

type Legend = {
  name: string;
  color: string;
  markerPath: string;
  type: PartnerType;
};

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
  uuid: string;
};

export type {
  PartnerData,
  PartnerProfile,
  Legend,
  PartnersParams,
  GenericServerResponse,
  PartnerType,
  PartnerPageParams,
};
