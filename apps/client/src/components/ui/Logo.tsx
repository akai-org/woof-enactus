"use client";

import Image from "next/image";
import LogoImage from "@/assets/haumaps-logo.webp";
import { chakra } from "@chakra-ui/react";

const ChakraImage = chakra(Image);

function Logo() {
  return (
    <ChakraImage
      borderRadius={"2xl"}
      marginInlineEnd={"2"}
      src={LogoImage}
      alt={"HauMaps logo"}
      width={50}
      height={50}
    />
  );
}

export default Logo;
