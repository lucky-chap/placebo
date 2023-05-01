"use client";

import { ThemeProvider as Provider } from "next-themes";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <Provider enableSystem={true} attribute="class">
      {children}
    </Provider>
  );
}
