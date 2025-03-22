import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  For,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";

const Links = [
  {
    name: "Mapa",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Wsparcie",
    href: "/wsparcie",
  },
  {
    name: "O nas",
    href: "/o-nas",
  },
];

export const Nav = () => {
  return (
    <Tabs.Root
      defaultValue="map"
      display="flex"
      justifyContent="space-between"
      padding="20px"
    >
      <Flex gap={4} align="center">
        <Drawer.Root placement="start" size="xs">
          <Drawer.Trigger asChild>
            <IconButton
              size="sm"
              bg="palette.darker"
              hideFrom="md"
              aria-label="Menu"
            >
              <IoMenu />
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Flex justify="space-between" align="center">
                    <Drawer.Title>
                      <Text
                        color="palette.lighter"
                        fontSize="28px"
                        fontWeight="bold"
                      >
                        Menu
                      </Text>
                    </Drawer.Title>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton
                        size="sm"
                        border="solid 1px"
                        borderColor="palette.darker"
                      />
                    </Drawer.CloseTrigger>
                  </Flex>
                </Drawer.Header>
                <Drawer.Body display="flex" flexDirection="column" gap={8}>
                  <For each={Links}>
                    {(item, i) => (
                      <Link
                        href={item.href}
                        _hover={{ textDecoration: "none" }}
                        _focus={{ boxShadow: "none", outline: "none" }}
                        fontSize="18px"
                      >
                        {item.name}
                      </Link>
                    )}
                  </For>
                </Drawer.Body>
                <Drawer.Footer>
                  <Text
                    color="palette.lighter"
                    fontSize="20px"
                    fontWeight="bold"
                  >
                    HAUMAPS
                  </Text>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
        <Text color="palette.lighter" fontSize="28px" fontWeight="bold">
          HAUMAPS
        </Text>
      </Flex>

      <Tabs.List
        hideBelow="md"
        defaultValue={Links[0].name}
        borderBottom="none"
        minWidth="50%"
        display="flex"
        justifyContent="space-between"
      >
        <For each={Links}>
          {(item, i) => (
            <Link
              href={item.href}
              _hover={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none", outline: "none" }}
            >
              <Tabs.Trigger value={item.name} asChild>
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
                  {item.name}
                </Box>
              </Tabs.Trigger>
            </Link>
          )}
        </For>
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