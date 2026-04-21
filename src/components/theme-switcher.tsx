import { useTheme } from "@/hooks/use-theme";
import { Icon } from "@iconify/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
      <button
        aria-label="Light mode"
        className={`p-1.5 rounded-md transition-all active:scale-95 ${
          theme === "light" ? "bg-white/10 text-primary-text" : "text-quaternary-text hover:text-tertiary-text"
        }`}
        type="button"
        onClick={() => setTheme("light")}
      >
        <Icon icon="lucide:sun" width={14} />
      </button>
      <button
        aria-label="Dark mode"
        className={`p-1.5 rounded-md transition-all active:scale-95 ${
          theme === "dark" ? "bg-white/10 text-primary-text" : "text-quaternary-text hover:text-tertiary-text"
        }`}
        type="button"
        onClick={() => setTheme("dark")}
      >
        <Icon icon="lucide:moon" width={14} />
      </button>
    </div>
  );
}
