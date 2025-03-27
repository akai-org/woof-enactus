import NextLink, { LinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

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

export { Link };
