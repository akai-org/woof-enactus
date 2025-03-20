import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

export const Footer = () => {
  return (
    <Box bg="brand.800" p="25px" className="footer">
      <Flex justify="space-between" align="center" position="relative">
        {/* Lewa strona */}
        <Text fontWeight="bold" color="brand.500">
          @kontaktwithenactus@gmail.com
        </Text>

        {/* Środkowy tekst, zawsze centrowany */}
        <Text
          fontWeight="bold"
          color="brand.500"
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          whiteSpace="nowrap"
        >
          &#169; Enactus Poland
        </Text>

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
