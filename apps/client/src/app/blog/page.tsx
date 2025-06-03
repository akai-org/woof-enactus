import { Center, Container, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BlogList } from "@/features/blog";
import { getContainer } from "@/features/di";
import type { IBlogService } from "@/services";
import { ErrorMessage } from "@/components";

//TODO: add posts filtering by category

/*
  NOTE: using route segment config option forces to use SSR with dynamic rendering.
  This skips also Full Route Cache (SSG) and calling inaccessible CMSApiClient during build.

  More info: https://nextjs.org/docs/app/deep-dive/caching#opting-out-2
*/
export const dynamic = "force-dynamic";

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
