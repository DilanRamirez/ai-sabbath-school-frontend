"use client";
import "./globals.css";
import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/app/theme/theme-provider";
import { ReduxProvider } from "@/app/store/provider";
import { useHydrate } from "./hooks/use-hydrate";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  useHydrate(); // ✅ Now runs WITHIN ReduxProvider
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <ReduxProvider>
              <LayoutWrapper>
                <div className="flex min-h-screen flex-col">
                  <main className="flex-1">{children}</main>
                </div>
              </LayoutWrapper>
            </ReduxProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
