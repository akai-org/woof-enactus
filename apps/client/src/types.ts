import type { FileResponse } from "@strapi/client";
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
type BlogPostCategory = "zdrowie" | "opieka" | "podróże";

interface IBlogPost {
  documentId: string; // uuid
  slug: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: FileResponse;
  title: string;
  category: BlogPostCategory;
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
  category: BlogPostCategory;
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
