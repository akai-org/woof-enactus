import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

/* NOTE: to update types after theme update enter npm run chakra:typegen -w client */

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      cta: {
        variant: "solid",
        fontFamily: "heading",
        textTransform: "uppercase",
        letterSpacing: "wide",
        bgColor: "accent.green",
        color: "brand.100",
        _hover: {
          bgColor: "accent.greenDark",
          transition: "all 200ms ease-out",
        },
      },
      gray: {
        variant: "solid",
        fontFamily: "heading",
        bgColor: "accent.gray",
        color: "brand.900",
        _hover: {
          bgColor: "accent.grayDark",
          transition: "all 200ms ease-out",
        },
      },
    },
  },
});

const linkRecipe = defineRecipe({
  base: {
    _focus: { boxShadow: "none", outline: "none" },
    _hover: {
      textDecoration: "none",
      textDecorationColor: "red.400",
    },
  },
});

const customConfig = defineConfig({
  globalCss: {
    body: {
      display: "flex",
      flexDirection: "column",
    },
    html: {
      colorPalette: "brand",
    },
  },
  theme: {
    recipes: {
      button: buttonRecipe,
      link: linkRecipe,
    },
    tokens: {
      colors: {
        brand: {
          100: { value: "#FFFFFF" },
          200: { value: "#F1FFE5" },
          300: { value: "#DAF0C9" },
          400: { value: "#B5CC08" },
          500: { value: "#4AA900" },
          600: { value: "#0D6F00" },
          700: { value: "#095100" },
          800: { value: "#152812" },
          900: { value: "#1A202C" },
        },
        accent: {
          yellow: { value: "#FFD600" },
          green: { value: "#38A169" },
          greenDark: { value: "#318c5c" },
          gray: { value: "#EDF2F7" },
          grayDark: { value: "#d7dce0" },
        },
      },
      fonts: {
        heading: { value: "var(--font-hk-grotesk)" },
        body: { value: "var(--font-open-sans)" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" }, // Główny kolor (tło przycisków, główne elementy)
          contrast: { value: "{colors.brand.100}" }, // Kolor tekstu na głównym tle
          fg: { value: "{colors.brand.700}" }, // Kolor tekstu/ikon (ciemniejszy ton)
          muted: { value: "{colors.brand.300}" }, // Stonowany odcień (jaśniejszy ton)
          emphasized: { value: "{colors.brand.400}" }, // Akcentowy kolor (żółty)
          focusRing: { value: "{colors.brand.300}" }, // Obramowanie focus (np. dla inputów)

          hover: { value: "{colors.brand.600}" }, // Ciemniejszy kolor po najechaniu
          active: { value: "{colors.brand.700}" }, // Jeszcze ciemniejszy po kliknięciu
          border: { value: "{colors.brand.300}" }, // Kolor obramowania (akcent)
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
