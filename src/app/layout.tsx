import "./globals.css";

import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/app/theme/theme-provider";
import { ReduxProvider } from "@/app/store/provider";

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
              <main className="flex-1">{children}</main>
            </ReduxProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
