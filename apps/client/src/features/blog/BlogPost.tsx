"use client";

import { Box, Badge, Text, Flex, Image, Heading } from "@chakra-ui/react";
import type { BlogPostCategory } from "@/types";
import { getPostCategoryColor, truncate } from "@/utils";
import { NullishGuard } from "@/components";
import NextLink from "next/link";

interface BlogPostProps {
  imageUrl?: string;
  title: string;
  description: string;
  date: string;
  category: BlogPostCategory;
  slug: string;
}

const DESC_MAX_CHARACTERS = 150;

export default function BlogPost({
  imageUrl,
  title,
  description,
  date,
  category,
  slug,
}: BlogPostProps) {
  return (
    <Box
      maxW="45ch"
      borderWidth="medium"
      borderColor="brand.300"
      borderRadius="sm"
      padding="8"
      display="flex"
      flexDirection="column"
    >
      <NullishGuard check={[imageUrl, slug]} fallback={""}>
        <NextLink href={`/blog/${slug}`}>
          <Image src={process.env.NEXT_PUBLIC_CMS_API_URL + imageUrl!} alt="" />
        </NextLink>
      </NullishGuard>

      <Flex
        alignItems="flex-start"
        flexDirection="column"
        flex="1"
        marginTop="4"
        gap="3"
      >
        <Badge
          fontWeight="bold"
          size="md"
          backgroundColor={getPostCategoryColor(category)}
          variant="solid"
        >
          {category}
        </Badge>

        <NextLink href={`/blog/${slug}`}>
          <Heading as="h3" fontSize="2xl" color="brand.700">
            {title}
          </Heading>
        </NextLink>

        <Text flex="1">{truncate(description, DESC_MAX_CHARACTERS)}</Text>

        <Text color="brand.600" fontWeight="bold">
          {new Date(date).toLocaleString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </Text>
      </Flex>
    </Box>
  );
}
