"use client";
import { system } from "@/constants";
import { ChakraProvider } from "@chakra-ui/react";

function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}

export default Providers;
