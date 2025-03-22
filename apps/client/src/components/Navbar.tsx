import { Box, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

export const Nav = () => {
  return (
    <Tabs.Root
      defaultValue="map"
      display="flex"
      justifyContent="space-between"
      padding="20px"
    >
      <Text color="brand.500" fontSize="28px" fontWeight="bold">
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
              color="brand.500"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "accent.green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "brand.500", // Zmiana koloru underline na aktywny
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
              color="brand.500"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "accent.green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "brand.500", // Zmiana koloru underline na aktywny
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
              color="brand.500"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "accent.green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "brand.500", // Zmiana koloru underline na aktywny
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
              color="brand.500"
              as="button"
              px="20px" // Zwiększa obszar w prawo i lewo
              py="10px" // Zachowuje normalny padding góra/dół
              borderRadius="5px"
              transition="background-color 0.3s ease"
              _hover={{
                color: "white", // Tekst zmienia się na biały
                backgroundColor: "accent.green",

                _before: { content: "none" }, // Ukrywa before (underline)
              }}
              _selected={{
                _before: {
                  backgroundColor: "brand.500", // Zmiana koloru underline na aktywny
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
