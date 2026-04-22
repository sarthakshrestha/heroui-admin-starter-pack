import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "@gravity-ui/icons";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center p-1 bg-surface-featured rounded-pill w-fit border-none">
      <button
        aria-label="Light mode"
        className={`flex items-center justify-center p-2.5 rounded-pill transition-all active:scale-95 ${
          theme === "light" 
            ? "bg-background text-primary-text shadow-sm" 
            : "text-tertiary-text hover:text-secondary-text"
        }`}
        type="button"
        onClick={() => setTheme("light")}
      >
        <Sun width={16} height={16} />
      </button>
      <button
        aria-label="Dark mode"
        className={`flex items-center justify-center p-2.5 rounded-pill transition-all active:scale-95 ${
          theme === "dark" 
            ? "bg-background text-primary-text shadow-sm" 
            : "text-tertiary-text hover:text-secondary-text"
        }`}
        type="button"
        onClick={() => setTheme("dark")}
      >
        <Moon width={16} height={16} />
      </button>
    </div>
  );
}

