import NextLink, { type LinkProps } from "next/link";
import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

type LinkT = {
  children: ReactNode;
  linkProps: LinkProps;
  chakraLinkProps?: ChakraLinkProps;
};

function Link(props: LinkT) {
  const { children, linkProps, chakraLinkProps } = props;

  return (
    <ChakraLink asChild {...chakraLinkProps}>
      <NextLink {...linkProps}>{children}</NextLink>
    </ChakraLink>
  );
}

export default Link;
