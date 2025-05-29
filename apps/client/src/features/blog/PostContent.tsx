/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

//TODO: children prop issues with react-markdown components

import type { BlogPostCategory } from "@/types";
import { getPostCategoryColor } from "@/utils";
import { Box, Heading, List, Text, Image, Link } from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import NextLink from "next/link";

interface PostContentProps {
  category: BlogPostCategory;
  title: string;
  content: string;
}

function PostContent({ category, title, content }: PostContentProps) {
  return (
    <Box marginY="8">
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        color={getPostCategoryColor(category)}
        textTransform="uppercase"
        marginBottom="2"
      >
        {category}
      </Text>
      <Heading
        as="h1"
        fontSize={{ base: "4xl", md: "5xl" }}
        lineHeight={{ base: "shorter", md: "short" }}
        fontWeight="bold"
        color="brand.700"
      >
        {title}
      </Heading>
      <Box marginTop="14">
        <ReactMarkdown
          components={{
            p({ node: _, children }) {
              return (
                <Text lineHeight="moderate" marginBottom="6">
                  {children as any}
                </Text>
              );
            },
            h3({ node: _, children }) {
              return (
                <Heading as="h3" fontSize="2xl" marginY="2">
                  {children as any}
                </Heading>
              );
            },
            ul({ node: _, children }) {
              return <List.Root marginBottom="2">{children as any}</List.Root>;
            },
            ol({ node: _, children }) {
              return (
                <List.Root as="ol" marginBottom="2">
                  {children as any}
                </List.Root>
              );
            },
            li({ node: _, children }) {
              return (
                <List.Item
                  marginLeft={{ base: "5", md: "10" }}
                  _marker={{ color: "inherit" }}
                >
                  {children as any}
                </List.Item>
              );
            },
            img({ src, alt }) {
              return (
                <Image
                  src={src}
                  alt={alt}
                  width="full"
                  maxHeight="36rem"
                  marginY="6"
                />
              );
            },
            a({ href, children, ...rest }) {
              return (
                <Link asChild>
                  <NextLink href={href ?? ""} {...rest}>
                    {children as any}
                  </NextLink>
                </Link>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}

export default PostContent;
