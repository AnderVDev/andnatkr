import { Theme, TypeBackground, Palette, PaletteMode } from "@mui/material";
import createPalette, { PaletteOptions } from "@mui/material/styles/createPalette";

interface CustomTheme extends Theme {
  palette: Palette & {
    neutral: {
      dark: string;
      main: string;
      light: string;
      mediumMain?: string;
      medium: string;
    };
  };
}

// Define a custom interface extending TypeBackground
interface CustomTypeBackground extends TypeBackground {
  alt: string;
}

// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#cedff0",
    200: "#9dbfe1",
    300: "#6c9ed1",
    400: "#3b7ec2",
    500: "#0a5eb3",
    600: "#084b8f",
    700: "#06386b",
    800: "#042648",
    900: "#021324",
  },
};

// mui theme settings
export const themeSettings = (mode: PaletteMode): CustomTheme => {
  const paletteOptions: PaletteOptions = {
    mode: mode,
  };
  return {
    palette: {
      ...createPalette(paletteOptions), // Use MUI's createPalette to create a Palette object
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
              contrastText: '#FFFFFF', // Example contrastText
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
              contrastText: '#FFFFFF', // Example contrastText
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
          }),
      background: {
        default: mode === "dark" ? colorTokens.grey[900] : colorTokens.grey[10],
        alt: mode === "dark" ? colorTokens.grey[800] : colorTokens.grey[0],
      } as CustomTypeBackground,
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
