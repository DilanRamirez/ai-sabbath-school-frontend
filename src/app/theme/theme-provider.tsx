"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";

// Define your custom MUI theme
let theme = createTheme({
  palette: {
    mode: "light", // will be overridden by NextThemesProvider
    primary: {
      main: "#2C3E50",
    },
    secondary: {
      main: "#34495E",
    },
    background: {
      default: "#f9f9f9",
      paper: "#BDC3C7",
    },
    text: {
      primary: "#2C3E50",
      secondary: "#34495E",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Merriweather", serif',
    },
    h2: {
      fontFamily: '"Merriweather", serif',
    },
    h3: {
      fontFamily: '"Merriweather", serif',
    },
    h4: {
      fontFamily: '"Merriweather", serif',
    },
    h5: {
      fontFamily: '"Merriweather", serif',
    },
    h6: {
      fontFamily: '"Merriweather", serif',
    },
  },
});
theme = responsiveFontSizes(theme);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextThemesProvider>
  );
}
