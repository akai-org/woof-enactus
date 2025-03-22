import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

export const Footer = () => {
  return (
    <Box bg="palette.darker" p="25px" className="footer">
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={4}
        justify="space-between"
        align="center"
        position="relative"
      >
        {/* Lewa strona */}
        <Box>
          <Text fontWeight="bold" color="palette.lighter">
            @kontaktwithenactus@gmail.com
          </Text>
        </Box>

        {/* Środkowy tekst, zawsze centrowany */}
        <Box
          left="50%"
          position={{ base: "unset", md: "absolute" }}
          transform={{ base: "", md: "translateX(-50%)" }}
        >
          <Text fontWeight="bold" color="palette.lighter" whiteSpace="nowrap">
            &#169; Enactus Poland
          </Text>
        </Box>

        {/* Prawa strona - ikony */}
        <Flex gap="10px">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none", outline: "none" }}
          >
            <Icon color="brand.500">
              <FiFacebook size="30px" />
            </Icon>
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none", outline: "none" }}
          >
            <Icon color="brand.500">
              <FiInstagram size="30px" />
            </Icon>
          </Link>

          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none", outline: "none" }}
          >
            <Icon color="brand.500">
              <FiLinkedin size="30px" />
            </Icon>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
