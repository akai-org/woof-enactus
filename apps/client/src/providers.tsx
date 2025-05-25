"use client";
import { system } from "@/constants";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ProgressProvider
        height="3px"
        color="#095100"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </ChakraProvider>
  );
}

export default Providers;
