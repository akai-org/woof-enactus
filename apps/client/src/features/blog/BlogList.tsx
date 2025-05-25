"use client";

import { useCallback, useRef, useState } from "react";
import { Center, Spinner, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import type { IBlogPost } from "@/types";
import BlogPost from "./BlogPost";
import {
  useIntersectionObserver,
  type IntersectionObserverOptions,
} from "@/hooks";

interface BlogListProps {
  posts: IBlogPost[];
  initialCount?: number;
  incrementBy?: number;
}

const OBSERVER_OPTIONS: IntersectionObserverOptions = {
  threshold: 0.5,
};

export default function BlogList({
  posts,
  initialCount = 6,
  incrementBy = 5,
}: BlogListProps) {
  const [count, setCount] = useState(initialCount);
  const [showObserver, setShowObserver] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(() => {
    setCount(prev => Math.min(prev + incrementBy, posts.length));
  }, [incrementBy, posts.length]);

  useIntersectionObserver({
    target: loaderRef,
    onIntersect: handleIntersect,
    enabled: showObserver,
    options: OBSERVER_OPTIONS,
  });

  const displayedPosts = posts.slice(0, count);
  const hasMorePosts = count < posts.length;

  return (
    <Flex
      marginY="8"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <SimpleGrid marginBottom="10" gap="8" columns={{ base: 1, md: 2, lg: 3 }}>
        {displayedPosts.map(
          ({
            createdAt,
            thumbnail,
            title,
            slug,
            type,
            documentId,
            description,
          }) => (
            <BlogPost
              key={documentId}
              imageUrl={(thumbnail as Record<string, string>).url}
              date={createdAt}
              title={title}
              description={description}
              type={type}
              slug={slug}
            />
          ),
        )}
      </SimpleGrid>

      {hasMorePosts &&
        (showObserver ? (
          <Center ref={loaderRef}>
            <Spinner size="lg" />
          </Center>
        ) : (
          <Center>
            <Button
              variant="cta"
              size="xl"
              onClick={() => setShowObserver(true)}
            >
              Pokaż więcej
            </Button>
          </Center>
        ))}
    </Flex>
  );
}
