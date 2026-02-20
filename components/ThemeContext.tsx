"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const Ctx = createContext<ThemeCtx>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("suulp-theme") as Theme | null;
      // Only use saved value if it's valid; default is light
      if (saved === "dark" || saved === "light") setTheme(saved);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("suulp-theme", next);
    } catch {}
  };

  // Prevent flash on first render by keeping theme class correct immediately
  if (!mounted) {
    return (
      <div className="lk" style={{ minHeight: "100vh" }}>
        {children}
      </div>
    );
  }

  return (
    <Ctx.Provider value={{ theme, isDark: theme === "dark", toggleTheme }}>
      <div
        className={theme === "dark" ? "dk" : "lk"}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);
