import { Hanken_Grotesk, Open_Sans } from "next/font/google";

const hkGrotesk = Hanken_Grotesk({
  variable: "--font-hk-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export { hkGrotesk, openSans };
