import { ErrorMessage } from "@/components";
import { container } from "@/features/di";
import type { IBlogService } from "@/services";
import { Center, Container, Spinner, Text } from "@chakra-ui/react";
import React, { Suspense } from "react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await container
    .resolve<IBlogService>("BlogService")
    .getPost(slug);

  if (!post.success) return <ErrorMessage message={post.error.userMessage} />;

  const { title } = post.data;

  return (
    <Container marginY="20">
      <Suspense
        fallback={
          <Center>
            <Spinner size="lg" />
          </Center>
        }
      >
        <Text>{title}</Text>
      </Suspense>
    </Container>
  );
}
