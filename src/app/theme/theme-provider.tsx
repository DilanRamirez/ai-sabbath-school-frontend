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

const BORDER_RADIUS = 12;

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2C3E50",
    },
    secondary: {
      main: "#34495E",
    },
    background: {
      default: "#F4F4F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C3E50",
      secondary: "#7F8C8D",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Merriweather", serif',
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Merriweather", serif',
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Merriweather", serif',
      fontSize: "1.5rem",
      fontWeight: 600,
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
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "1rem",
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ECF0F1",
          color: "#2C3E50",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: BORDER_RADIUS,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
          marginBottom: 8,
        },
      },
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
