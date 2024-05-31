import {
  Theme,
  TypeBackground,
  Palette,
  PaletteMode,
  PaletteOptions,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";


// Extend the TypeBackground interface to include `alt`
interface CustomTypeBackground extends TypeBackground {
  alt: string;
}

// Extend the Palette interface to include custom properties
interface CustomPalette extends Palette {
  neutral: {
    dark: string;
    main: string;
    light: string;
    mediumMain?: string;
    medium: string;
  };
  background: CustomTypeBackground;
}

// Extend the Theme interface to include the custom palette
export interface CustomTheme extends Theme {
  palette: CustomPalette;
}

// Color design tokens
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

// Theme settings
export const themeSettings = (mode: PaletteMode): CustomTheme => {
  const paletteOptions: PaletteOptions = {
    mode: mode,
    ...(mode === "dark"
      ? {
          primary: {
            dark: colorTokens.primary[200],
            main: colorTokens.primary[500],
            light: colorTokens.primary[800],
            contrastText: "#FFFFFF",
          },
          neutral: {
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          } as CustomTypeBackground,
        }
      : {
          primary: {
            dark: colorTokens.primary[700],
            main: colorTokens.primary[500],
            light: colorTokens.primary[50],
            contrastText: "#FFFFFF",
          },
          neutral: {
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          } as CustomTypeBackground,
        }),
  };

  return createTheme({
    palette: paletteOptions as CustomPalette, // Cast paletteOptions to CustomPalette
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
      subtitle1: {},
      subtitle2: {},
      body1: {},
      body2: {},
      caption: {},
      button: {},
      overline: {},
      fontWeightLight: undefined,
      fontWeightRegular: undefined,
      fontWeightMedium: undefined,
      fontWeightBold: undefined,
      htmlFontSize: 0,
      pxToRem: (px: number) => `${px / 16}rem`,
    }as TypographyOptions,
  }) as CustomTheme; // Cast the returned theme to CustomTheme
};
