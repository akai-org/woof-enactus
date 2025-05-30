import { Center, Container, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BlogList } from "@/features/blog";
import { getContainer } from "@/features/di";
import type { IBlogService } from "@/services";
import { ErrorMessage } from "@/components";

//TODO: add posts filtering by category

export default async function BlogPage() {
  const posts = await getContainer()
    .resolve<IBlogService>("BlogService")
    .getPosts();

  if (!posts.success) return <ErrorMessage message={posts.error.userMessage} />;

  return (
    <Container marginY="20">
      {/*<Flex justifyContent="flex-end" marginInlineEnd={{ base: "0", sm: "8" }}>
        <BlogFilters />
      </Flex> */}

      <Suspense
        fallback={
          <Center>
            <Spinner size="lg" />
          </Center>
        }
      >
        <BlogList posts={posts.data} />
      </Suspense>
    </Container>
  );
}
