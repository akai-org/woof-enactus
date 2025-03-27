import { Link } from "@/components";
import { Button, Flex, Heading } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Flex justify="center" align="center" direction="column" gap={5} mt={20}>
      <Heading size="3xl" textAlign="center">
        Strony nie znaleziono
      </Heading>
      <Link
        linkProps={{ href: "/", passHref: true }}
        chakraLinkProps={{ unstyled: true }}
      >
        <Button as="span">Przejdź do strony głównej</Button>
      </Link>
    </Flex>
  );
}
