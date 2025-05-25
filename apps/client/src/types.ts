import type {
  DatabaseEntity,
  PartnerProfile,
  PartnerType,
  WorkingHours as InternalWorkingHours,
  NeededGoods,
  GenericResponse,
  Partner,
  NeededGoodsMeta,
  PartnerEvent,
  BlogType,
  GoodsState,
} from "woof";

// ====== altered types from woof package ======
type WorkingHours = Omit<InternalWorkingHours, keyof DatabaseEntity>;

type PartnerData = RequireKey<
  Omit<Partner, "neededGoods" | "neededGoodsMeta">,
  "profile"
>;

type RequireKey<T, K extends keyof T> = T & Required<Pick<T, K>>;

type PartnerNeeds = {
  goods: NeededGoods[];
} & Omit<NeededGoodsMeta, keyof DatabaseEntity>;

// ====== Client-defined types ======
type Legend = {
  name: string;
  color: string;
  markerPath?: string;
  type: PartnerType;
};

type BlogLegend = {
  name: string;
  color: string;
  markerPath?: string;
  type: BlogType;
};

type PartnersParams = {
  name: string;
  city: string;
  street: string;
  types: string; // e.g. "VET,SHELTER,ORG"
};

type PartnerPageParams = {
  slug: string;
};

type HomeSearchParams = Partial<{
  query: string; // e.g. "city,street"
  type: string; // e.g. "VET,SHELTER,ORG"
}>;

type AuthProps = {
  username: string;
  password: string;
}

export type {
  PartnerData,
  WorkingHours,
  PartnerProfile,
  PartnerType,
  BlogType,
  GenericResponse,
  PartnerEvent,
  GoodsState,
};

export type {
  Legend,
  BlogLegend,
  PartnerNeeds,
  PartnerPageParams,
  HomeSearchParams,
  PartnersParams,
  RequireKey,
  AuthProps
};
