import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Navbar";
import { Container } from "@chakra-ui/react";
import Providers from "../providers";

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
    <html lang="pl" suppressHydrationWarning>
      <body>
        <Providers>
          <Nav />
          <Container flex={1}>{children}</Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
