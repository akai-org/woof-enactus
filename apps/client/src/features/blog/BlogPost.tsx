"use client";

import { Box, Badge, Text, Flex, Image, Heading } from "@chakra-ui/react";
import type { BlogPostCategory } from "@/types";
import { blogCategoryItems } from "@/constants";
import { truncate } from "@/utils";
import { NullishGuard } from "@/components";
import NextLink from "next/link";

interface BlogPostProps {
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  type: BlogPostCategory;
  slug: string;
}

const checkColor = (type: BlogPostCategory) =>
  blogCategoryItems.find(item => item.type === type)?.color ?? "brand.600";

const DESC_MAX_CHARACTERS = 150;

export default function BlogPost({
  imageUrl,
  title,
  description,
  date,
  type,
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
        <NextLink href={`/${slug}`}>
          <Image src={process.env.NEXT_PUBLIC_BLOG_API_URL + imageUrl} alt="" />
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
          backgroundColor={checkColor(type)}
          variant="solid"
        >
          {type}
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
