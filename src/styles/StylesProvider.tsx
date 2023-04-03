"use client";

import { ThemeStateProvider, useThemeState } from "@/state/theme";
import { SSRStyletronProvider } from "./StyletronProvider";
import { LightTheme, BaseProvider, DarkTheme } from "baseui";

function StylesProviderWithoutThemeState({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    state: { theme },
  } = useThemeState();
  return (
    <SSRStyletronProvider>
      <BaseProvider theme={theme === "light" ? LightTheme : DarkTheme}>
        {children}
      </BaseProvider>
    </SSRStyletronProvider>
  );
}

function StylesProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeStateProvider>
      <StylesProviderWithoutThemeState>
        {children}
      </StylesProviderWithoutThemeState>
    </ThemeStateProvider>
  );
}

export { StylesProvider };
