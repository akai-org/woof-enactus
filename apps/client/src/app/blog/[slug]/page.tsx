import { ErrorMessage, GoBackButton } from "@/components";
import { PostContent } from "@/features/blog";
import { getContainer } from "@/features/di";
import type { IBlogService } from "@/services";
import { Center, Container, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getContainer()
    .resolve<IBlogService>("BlogService")
    .getPost(slug);

  if (!post.success) return <ErrorMessage message={post.error.userMessage} />;

  const { category, title, content } = post.data;

  return (
    <Container marginY="10">
      <Suspense
        fallback={
          <Center>
            <Spinner size="lg" />
          </Center>
        }
      >
        <GoBackButton />
        <PostContent category={category} title={title} content={content} />
      </Suspense>
    </Container>
  );
}
