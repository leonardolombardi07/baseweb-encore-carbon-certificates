"use client";

import "./globals.css";
import { StylesProvider } from "@/styles";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StylesProvider>{children}</StylesProvider>
      </body>
    </html>
  );
}

export { RootLayout };
