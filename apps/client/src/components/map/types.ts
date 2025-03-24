// TEMPORARY
type Profile = {
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
};

type Data = {
  id: number;
  uuid: string;
  name: string;
  latitude: number;
  longitude: number;
  type: "SHELTER" | "VET" | "ORG" | "SHOP";
  profile: Profile;
};

export type { Data, Profile };
