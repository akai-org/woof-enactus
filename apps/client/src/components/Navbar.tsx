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
  Avatar,
  Tabs,
  Link,
  Icon,
  Center,
} from "@chakra-ui/react";
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
    <Box
      position="sticky"
      top="0"
      width="100%"
      bg="brand.100"
      zIndex="banner"
      borderBottomWidth="2px"
      borderBottomColor="brand.300"
    >
      <Container>
        <Center minHeight="20">
          <Flex gap={4} flex="1" justifyContent="flex-start" marginRight="8">
            <Drawer.Root placement="start">
              <Drawer.Trigger asChild>
                <IconButton hideFrom="md" aria-label="Menu" variant="ghost">
                  <Icon size="2xl">
                    <IoMenu />
                  </Icon>
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
                      <Link
                        href="/"
                        textDecoration="none"
                        color="brand.500"
                        textStyle={"xl"}
                        fontWeight="bold"
                        textTransform={"uppercase"}
                      >
                        Haumaps
                      </Link>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
            <Link
              href="/"
              textDecoration="none"
              color="brand.500"
              textStyle="3xl"
              fontWeight="bold"
              textTransform={"uppercase"}
              _focus={{ boxShadow: "none", outline: "none" }}
            >
              Haumaps
            </Link>
          </Flex>

          <Flex flex="1" justifyContent="center">
            <Tabs.Root defaultValue="map" paddingY="6">
              <Tabs.List
                hideBelow="md"
                defaultValue={links[0].name}
                borderBottom="none"
                minWidth="50%"
                display="flex"
                gap="10"
              >
                <For each={links}>
                  {item => (
                    <Link
                      href={item.href}
                      textDecoration="none"
                      textStyle="md"
                      width="max-content"
                      _focus={{ boxShadow: "none", outline: "none" }}
                    >
                      <Tabs.Trigger
                        value={item.name}
                        color="brand.500"
                        as="span"
                        borderRadius="sm"
                        transition="background-color 0.3s ease"
                        _hover={{
                          color: "brand.100",
                          backgroundColor: "brand.500",
                        }}
                      >
                        {item.name}
                      </Tabs.Trigger>
                    </Link>
                  )}
                </For>
              </Tabs.List>
            </Tabs.Root>
          </Flex>

          <Flex flex="1" justifyContent="flex-end">
            <Link
              href="/login"
              textDecoration="none"
              _focus={{ boxShadow: "none", outline: "none" }}
            >
              <Avatar.Root>
                <Avatar.Fallback />
              </Avatar.Root>
            </Link>
          </Flex>
        </Center>
      </Container>
    </Box>
  );
}

export default Nav;
