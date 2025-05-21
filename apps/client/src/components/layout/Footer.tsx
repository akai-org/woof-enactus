import { Box, Container, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

function Footer() {
  return (
    <Box bg="brand.800" color="brand.500" paddingY="6">
      <Container>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap={4}
          justify="center"
          align="center"
          position="relative"
        >
          <Flex flex="1" justifyContent="flex-start">
            <Link
              color="brand.500"
              fontWeight="bold"
              href="mailto:kontaktwithenactus@gmail.com"
            >
              enactusput@gmail.com
            </Link>
          </Flex>

          <Flex flex="1" justifyContent="center">
            <Text fontWeight="bold" whiteSpace="nowrap">
              &#169; WOOF by Enactus PUT
            </Text>
          </Flex>

          <Flex flex="1" justifyContent="flex-end" gap="4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon color={"brand.500"} size="xl">
                <FiFacebook />
              </Icon>
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon color={"brand.500"} size="xl">
                <FiInstagram />
              </Icon>
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon color={"brand.500"} size="xl">
                <FiLinkedin />
              </Icon>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
