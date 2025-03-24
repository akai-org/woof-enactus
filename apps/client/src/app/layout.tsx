import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";

import { Box } from "@chakra-ui/react";

import Providers from "../providers";
import { hkGrotesk, openSans } from "./fonts";
import { Footer, Nav } from "@/components";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import "../style.css";

export const metadata: Metadata = {
  title: "Haumaps",
  description: "Baza danych organizacji pomocy zwierzętom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${openSans.variable} ${hkGrotesk.variable}`}
      lang="pl"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Nav />
          <Box flex={1}>{children}</Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
