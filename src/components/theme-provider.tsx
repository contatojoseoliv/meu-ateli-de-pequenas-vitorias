import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Provedor de tema (classe `.dark`) para componentes que usam `next-themes`.
 * Necessário para Sonner (e qualquer outro componente que use `useTheme`).
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}
