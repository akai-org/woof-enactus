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
  Icon,
  Center,
  Button,
  Link,
  List,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import NextLink from "next/link";
import NavLink from "./NavLink";
import { Logo } from "@/components";

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
          <Flex gap={4} justifyContent="space-between" alignItems="center">
            <Link
              asChild
              color="brand.500"
              textStyle="3xl"
              fontWeight="bold"
              textTransform="uppercase"
            >
              <NextLink href="/">
                <Logo />
                HauMaps
              </NextLink>
            </Link>
          </Flex>

          <Flex flexGrow="1" justifyContent="center">
            <List.Root
              hideBelow="lg"
              defaultValue={links[0].name}
              borderBottom="none"
              minWidth="50%"
              display="flex"
              gap="6"
              flexDirection="row"
              listStyle="none"
            >
              <For each={links}>
                {item => (
                  <List.Item
                    flexGrow="1"
                    color="brand.700"
                    borderRadius="sm"
                    fontSize="sm"
                    fontWeight="medium"
                    value={item.name}
                  >
                    <NavLink href={item.href} name={item.name} />
                  </List.Item>
                )}
              </For>
            </List.Root>
          </Flex>

          <Button bgColor="brand.700" hideBelow={"lg"}>
            Zaloguj się jako placówka
          </Button>
          <Drawer.Root placement="end">
            <Drawer.Trigger asChild>
              <IconButton hideFrom="lg" aria-label="Menu" variant="ghost">
                <Icon size="2xl">
                  <IoMenu />
                </Icon>
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop
                backdropFilter={"blur(3px)"}
                bgColor={"blackAlpha.700"}
              />
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
                        <Drawer.CloseTrigger asChild position="initial">
                          <Link asChild fontWeight="medium">
                            <NextLink href={item.href}>{item.name}</NextLink>
                          </Link>
                        </Drawer.CloseTrigger>
                      )}
                    </For>
                    <Drawer.CloseTrigger asChild position="initial">
                      <Button bgColor="brand.700">
                        Zaloguj się jako placówka
                      </Button>
                    </Drawer.CloseTrigger>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Link
                      asChild
                      color="brand.500"
                      textStyle="xl"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      <NextLink href="/">HauMaps</NextLink>
                    </Link>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Center>
      </Container>
    </Box>
  );
}

export default Nav;
