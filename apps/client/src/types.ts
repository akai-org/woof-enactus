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
  GoodsState,
} from "woof";

// ====== altered types based on woof package ======
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
type BlogPostCategory = "zdrowie" | "rozrywka" | "weterynarz";

interface IBlogPost {
  title: string;
  type: BlogPostCategory;
  createdAt: string;
  documentId: string;
  id: string;
  thumbnail?: unknown;
  description: string;
  content: string;
  slug: string;
}

type Legend = {
  name: string;
  color: string;
  markerPath?: string;
  type: PartnerType;
};

type BlogLegend = {
  name: string;
  color: string;
  type: BlogPostCategory;
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
};

export type {
  PartnerData,
  WorkingHours,
  PartnerProfile,
  PartnerType,
  GenericResponse,
  PartnerEvent,
  GoodsState,
};

export type {
  Legend,
  PartnerNeeds,
  PartnerPageParams,
  HomeSearchParams,
  PartnersParams,
  RequireKey,
  AuthProps,
  BlogPostCategory,
  IBlogPost,
  BlogLegend,
};
