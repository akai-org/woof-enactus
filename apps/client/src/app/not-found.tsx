import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
export default function NotFound() {
  return (
    <Flex justify="center" align="center" direction="column" gap={5} mt={20}>
      <Heading size="3xl" textAlign="center">
        Strony nie znaleziono
      </Heading>

      <Button asChild>
        <Link asChild>
          <NextLink href="/">Strona główna</NextLink>
        </Link>
      </Button>
    </Flex>
  );
}
