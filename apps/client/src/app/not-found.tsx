import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Flex justify="center" align="center" direction="column" gap={5} mt={20}>
      <Heading size="3xl" textAlign="center">
        Strony nie znaleziono
      </Heading>
      <Link href="/" passHref>
        <Button>Przejdź do strony głównej</Button>
      </Link>
    </Flex>
  );
}
