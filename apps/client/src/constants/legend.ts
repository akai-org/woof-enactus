import type { Legend, BlogLegend } from "@/types";

const mapLegendItems: Legend[] = [
  {
    name: "Schroniska",
    color: "brand.700",
    markerPath: "marker-700-green.svg",
    type: "SHELTER",
  },
  {
    name: "Organizacje",
    color: "brand.400",
    markerPath: "marker-200-green.svg",
    type: "ORG",
  },
  {
    name: "Weterynaria",
    color: "accent.yellow",
    markerPath: "marker-400-yellow.svg",
    type: "VET",
  },
  {
    name: "Sklepy zoologiczne",
    color: "brand.500",
    markerPath: "marker-500-green.svg",
    type: "SHOP",
  },
];

const blogCategoryItems: BlogLegend[] = [
  {
    name: "Zdrowie",
    color: "brand.700",
    type: "HEALTH",
  },
  {
    name: "Rozrywka",
    color: "brand.400",
    type: "FUN",
  },
  {
    name: "Weterynaria",
    color: "accent.yellow",
    type: "VET",
  },
  {
    name: "Inne",
    color: "brand.500",
    type: "OTHER",
  },
];

export { mapLegendItems, blogCategoryItems };
