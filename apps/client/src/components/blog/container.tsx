"use client";

import { Box, Center, Image, HStack, Badge, Text } from "@chakra-ui/react";
import type { BlogType } from "@/types";
import { blogLegendItems } from "@/constants";
// Oczekiwane propsy
interface BlogContainerProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  date: string;
  type: BlogType;
}
const checkColor = (type: BlogType) => {
  return blogLegendItems.find(item => item.type === type)?.color || "green";
};

export default function BlogContainer({
  imageUrl,
  imageAlt,
  title,
  description,
  date,
  type,
}: BlogContainerProps) {
  return (
    <Box
      maxH="500px"
      maxW="sm"
      borderWidth="3px"
      borderColor="brand.300"
      borderRadius="5px"
      margin="20px"
      display="flex"
      flexDirection="column"
    >
      <Center padding="30px" paddingBottom="0px">
        <Image src={imageUrl} alt={imageAlt} />
      </Center>

      <Box
        p="4"
        paddingTop="20px"
        padding="30px"
        display="flex"
        flexDirection="column"
        flex="1"
        minHeight="0"
      >
        <HStack>
          <Badge
            fontWeight="bold"
            size="md"
            backgroundColor={checkColor(type)}
            variant="solid"
          >
            {type}
          </Badge>
        </HStack>

        <Text
          fontWeight="bold"
          fontSize="20px"
          color="brand.700"
          flexShrink={0}
          marginTop="8px"
        >
          {title}
        </Text>

        <Box overflow="hidden" flex="1" minHeight="0">
          <Text marginTop="8px" color="fg" maxH="100px">
            {description}
          </Text>
        </Box>

        <Text
          marginTop="10px"
          color="green"
          fontWeight="bold"
          fontSize="small"
          flexShrink={0}
        >
          {date}
        </Text>
      </Box>
    </Box>
  );
}
