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
