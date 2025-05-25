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
    category: "zdrowie",
  },
  {
    name: "Rozrywka",
    color: "brand.400",
    category: "rozrywka",
  },
  {
    name: "Weterynaria",
    color: "accent.yellow",
    category: "weterynarz",
  },
];

export { mapLegendItems, blogCategoryItems };
