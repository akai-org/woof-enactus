import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  For,
  IconButton,
  Portal,
  Text,
  Container,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";

const links = [
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

function Nav() {
  return (
    <Tabs.Root defaultValue="map" paddingY="6">
      <Container display="flex" justifyContent="space-between">
        <Flex gap={4} align="center">
          <Drawer.Root placement="start" size="xs">
            <Drawer.Trigger asChild>
              <IconButton
                size="sm"
                bg={"brand.700"}
                hideFrom="md"
                aria-label="Menu"
                variant={"solid"}
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
                          color="brand.500"
                          textStyle={"3xl"}
                          fontWeight="bold"
                        >
                          Menu
                        </Text>
                      </Drawer.Title>
                      <Drawer.CloseTrigger asChild>
                        <CloseButton size="xl" />
                      </Drawer.CloseTrigger>
                    </Flex>
                  </Drawer.Header>
                  <Drawer.Body display="flex" flexDirection="column" gap={8}>
                    <For each={links}>
                      {item => (
                        <Link
                          href={item.href}
                          textDecoration="none"
                          textStyle={"md"}
                          _focus={{ boxShadow: "none", outline: "none" }}
                        >
                          {item.name}
                        </Link>
                      )}
                    </For>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Text
                      color="brand.500"
                      textStyle={"xl"}
                      fontWeight="bold"
                      textTransform={"uppercase"}
                    >
                      Haumaps
                    </Text>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
          <Text
            color="brand.500"
            textStyle="2xl"
            fontWeight="bold"
            textTransform={"uppercase"}
          >
            Haumaps
          </Text>
        </Flex>

        <Tabs.List
          hideBelow="md"
          defaultValue={links[0].name}
          borderBottom="none"
          minWidth="50%"
          display="flex"
          justifyContent="space-between"
        >
          <For each={links}>
            {item => (
              <Link
                href={item.href}
                textDecoration="none"
                textStyle="md"
                _focus={{ boxShadow: "none", outline: "none" }}
              >
                <Tabs.Trigger value={item.name} asChild>
                  <Box
                    color="brand.500"
                    as="span"
                    px="6"
                    py="3"
                    borderRadius="sm"
                    transition="background-color 0.3s ease"
                    _hover={{
                      color: "brand.100",
                      backgroundColor: "brand.500",
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
          textDecoration="none"
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <Avatar.Root>
            <Avatar.Fallback />
          </Avatar.Root>
        </Link>
      </Container>
    </Tabs.Root>
  );
}

export default Nav;
