import { blogCategoryItems } from "@/constants/legend";
import type { BlogPostCategory } from "@/types";

export const getPostCategoryColor = (category: BlogPostCategory) =>
  blogCategoryItems.find(item => item.category === category)?.color ??
  "brand.600";
