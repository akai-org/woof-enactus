import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    body: {
      display: "flex",
      flexDirection: "column",
    },
  },
  theme: {
    tokens: {
      colors: {
        palette: {
          main: { value: "#0D6F00" }, // Zielony - główny kolor
          lighter: { value: "#4AA900" }, // Jaśniejszy zielony
          darker: { value: "#095100" }, // Ciemniejszy zielony
          accent: { value: "#FFD600" }, // Żółty - akcentowy kolor
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.palette.main}" }, // Główny kolor (tło przycisków, główne elementy)
          contrast: { value: "white" }, // Kolor tekstu na głównym tle
          fg: { value: "{colors.palette.darker}" }, // Kolor tekstu/ikon (ciemniejszy ton)
          muted: { value: "{colors.palette.lighter}" }, // Stonowany odcień (jaśniejszy ton)
          emphasized: { value: "{colors.palette.accent}" }, // Akcentowy kolor (żółty)
          focusRing: { value: "{colors.palette.accent}" }, // Obramowanie focus (np. dla inputów)

          hover: { value: "{colors.palette.darker}" }, // Ciemniejszy kolor po najechaniu
          active: { value: "{colors.palette.darker}" }, // Jeszcze ciemniejszy po kliknięciu
          border: { value: "{colors.palette.accent}" }, // Kolor obramowania (akcent)
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
