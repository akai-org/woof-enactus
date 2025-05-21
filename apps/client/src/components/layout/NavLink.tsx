"use client";

import { Link } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

type NavLinkProps = {
  name: string;
  href: string;
};

function NavLink({ name, href }: NavLinkProps) {
  const pathname = usePathname();

  const activeStyles = {
    color: "brand.500",
    position: "relative",
    _after: {
      content: "''",
      position: "absolute",
      bottom: "-10px",
      left: 0,
      fontSize: "md",
      display: "block",
      width: "100%",
      height: "0.5",
      bgColor: "brand.500",
    },
  };

  return (
    <Link
      asChild
      display="inline-block"
      width="full"
      textAlign="center"
      _hover={activeStyles}
      _focusVisible={{ ...activeStyles, opacity: 0.65 }}
      {...(pathname === href && activeStyles)}
    >
      <NextLink href={href}>{name}</NextLink>
    </Link>
  );
}

export default NavLink;
