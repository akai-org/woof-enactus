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
  Tabs,
  Icon,
  Center,
  Button,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { Link } from "@/components";
import NextLink from 'next/link'

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
                            linkProps={{ href: item.href }}
                            chakraLinkProps={{
                              textDecoration: "none",
                              textStyle: "md",
                              _focus: { boxShadow: "none", outline: "none" },
                            }}
                          >
                            {item.name}
                          </Link>
                        )}
                      </For>
                      <Button bgColor="brand.700">
                        Zaloguj się jako placówka
                      </Button>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Link
                        linkProps={{ href: "/" }}
                        chakraLinkProps={{
                          textDecoration: "none",
                          color: "brand.500",
                          textStyle: "xl",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Haumaps
                      </Link>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
            <Link
              linkProps={{ href: "/" }}
              chakraLinkProps={{
                textDecoration: "none",
                color: "brand.500",
                textStyle: "3xl",
                fontWeight: "bold",
                textTransform: "uppercase",
                _focus: { boxShadow: "none", outline: "none" },
              }}
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
                gap="5"
              >
                <For each={links}>
                  {item => (
                    <Tabs.Trigger value={item.name} asChild>
                      <Link
                        linkProps={{ href: item.href }}
                        chakraLinkProps={{
                          color: "brand.700",
                          borderRadius: "sm",
                          transition: "background-color 0.3s ease",
                          _hover: {
                            color: "brand.100",
                            backgroundColor: "brand.500",
                          },
                          textDecoration: "none",
                          textStyle: "sm",
                          width: "max-content",
                          _focus: { boxShadow: "none", outline: "none" },
                        }}
                      >
                        {item.name}
                      </Link>
                    </Tabs.Trigger>
                  )}
                </For>
              </Tabs.List>
            </Tabs.Root>
          </Flex>

          <Flex flex="1" justifyContent="flex-end">
            <Button
              bgColor="brand.700"
              display={{ base: "none", md: "initial" }}
              asChild
            >
              <NextLink href="/zaloguj-sie">Zaloguj się jako placówka</NextLink>
            </Button>
          </Flex>
        </Center>
      </Container>
    </Box>
  );
}

export default Nav;
