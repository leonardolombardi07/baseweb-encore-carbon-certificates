"use client";

import React from "react";

export type ThemeValue = "light" | "dark";

interface ThemeState {
  state: { theme: ThemeValue };
  actions: { setThemeValue: (previous: ThemeValue) => void };
}

const ThemeStateContext = React.createContext<ThemeState | null>(null);

const themeLocalStorage = createThemeLocalStorage();

function ThemeStateProvider({ children }: { children: React.ReactNode }) {
  const [themeValue, _setThemeValue] = React.useState<ThemeValue>(
    themeLocalStorage.get() || "light"
  );

  const setThemeValue = React.useCallback((value: ThemeValue) => {
    themeLocalStorage.set(value);
    _setThemeValue(value);
  }, []);

  const value: ThemeState = React.useMemo(() => {
    return {
      state: { theme: themeValue },
      actions: { setThemeValue },
    };
  }, [themeValue, setThemeValue]);

  return (
    <ThemeStateContext.Provider value={value}>
      {children}
    </ThemeStateContext.Provider>
  );
}

function useThemeState() {
  const context = React.useContext(ThemeStateContext);
  if (context === null) {
    throw new Error(
      `${useThemeState.name} must be used within a ${ThemeStateProvider.name}`
    );
  }
  return context;
}

function createThemeLocalStorage() {
  const KEY = "theme";

  return {
    get() {
      return (localStorage.getItem(KEY) as ThemeValue) || null;
    },
    set(value: ThemeValue) {
      localStorage.setItem(KEY, value);
    },
  };
}

export { ThemeStateProvider, useThemeState };
