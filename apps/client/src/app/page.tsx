import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

export default function Home() {
  return (
    <>
      <Nav></Nav>
      <div style={{ height: "300px" }}></div>

      <div style={{ height: "300px" }}></div>
      <Footer></Footer>
    </>
  );
}

export const Nav = () => {
  return (
    <Tabs.Root
      defaultValue="map"
      display="flex"
      justifyContent="space-between"
      padding="20px"
    >
      <Text color="palette.lighter" fontSize="28px" fontWeight="bold">
        HAUMAPS
      </Text>

      <Tabs.List
        borderBottom="none"
        width="50%"
        display="flex"
        justifyContent="space-between"
      >
        <Link
          href="#map"
          _hover={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <Tabs.Trigger value="map" asChild>
            <Box
              color="palette.lighter"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "palette.lighter", // Zmiana koloru underline na aktywny
                },
              }}
            >
              Mapa
            </Box>
          </Tabs.Trigger>
        </Link>

        <Link
          href="#blog"
          _hover={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <Tabs.Trigger value="blog" asChild>
            <Box
              color="palette.lighter"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "palette.lighter", // Zmiana koloru underline na aktywny
                },
              }}
            >
              Blog
            </Box>
          </Tabs.Trigger>
        </Link>

        <Link
          href="#support"
          _hover={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <Tabs.Trigger value="support" asChild>
            <Box
              color="palette.lighter"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "palette.lighter", // Zmiana koloru underline na aktywny
                },
              }}
            >
              Wsparcie
            </Box>
          </Tabs.Trigger>
        </Link>

        <Link
          href="#about"
          _hover={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <Tabs.Trigger value="about" asChild>
            <Box
              color="palette.lighter"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "palette.lighter", // Zmiana koloru underline na aktywny
                },
              }}
            >
              O Nas
            </Box>
          </Tabs.Trigger>
        </Link>
      </Tabs.List>

      <Link
        href="/login"
        _hover={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none", outline: "none" }}
      >
        <Avatar.Root>
          <Avatar.Fallback />
        </Avatar.Root>
      </Link>
    </Tabs.Root>
  );
};

export const Footer = () => {
  return (
    <Box bg="palette.darker" p="25px" className="footer">
      <Flex justify="space-between" align="center" position="relative">
        {/* Lewa strona */}
        <Text fontWeight="bold" color="palette.lighter">
          @kontaktwithenactus@gmail.com
        </Text>

        {/* Środkowy tekst, zawsze centrowany */}
        <Text
          fontWeight="bold"
          color="palette.lighter"
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
            <Icon color="palette.lighter">
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
            <Icon color="palette.lighter">
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
            <Icon color="palette.lighter">
              <FiLinkedin size="30px" />
            </Icon>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
