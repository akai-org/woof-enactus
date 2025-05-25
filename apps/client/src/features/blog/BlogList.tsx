"use client";

import { useEffect, useRef, useState } from "react";
import { Center, Spinner, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import type { IBlogPost } from "@/types";
import BlogPost from "./BlogPost";

interface BlogListProps {
  posts: IBlogPost[];
  initialCount?: number;
  incrementBy?: number;
}

export default function BlogList({
  posts,
  initialCount = 6,
  incrementBy = 5,
}: BlogListProps) {
  const [count, setCount] = useState(initialCount);
  const [showObserver, setShowObserver] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setCount(prev => Math.min(prev + incrementBy, posts.length));
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [showObserver, incrementBy, posts.length]);

  return (
    <Flex
      marginY="8"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <SimpleGrid marginBottom="10" gap="8" columns={{ base: 1, md: 2, lg: 3 }}>
        {posts.slice(0, count).map(post => (
          <BlogPost key={post.id} {...post} />
        ))}
      </SimpleGrid>
      {!showObserver && count < posts.length && (
        <Center>
          <Button variant="cta" size="xl" onClick={() => setShowObserver(true)}>
            Pokaż więcej
          </Button>
        </Center>
      )}

      {showObserver && count < posts.length && (
        <Center ref={loaderRef}>
          <Spinner size="lg" />
        </Center>
      )}
    </Flex>
  );
}
