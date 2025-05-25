"use client";

import { Box, Image, Badge, Text, Flex, Heading } from "@chakra-ui/react";
import type { BlogPostCategory } from "@/types";
import { blogCategoryItems } from "@/constants";
import { truncate } from "@/utils";

interface BlogPostProps {
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  type: BlogPostCategory;
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
      <Image src={imageUrl} alt="" />

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

        <Heading as="h3" fontSize="2xl" color="brand.700">
          {title}
        </Heading>

        <Text flex="1">{truncate(description, DESC_MAX_CHARACTERS)}</Text>

        <Text color="brand.600" fontWeight="bold">
          {date}
        </Text>
      </Flex>
    </Box>
  );
}
