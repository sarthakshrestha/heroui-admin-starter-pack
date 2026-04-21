import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
  }, []);

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return { theme, setTheme };
}
