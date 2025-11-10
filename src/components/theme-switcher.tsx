import { useTheme } from "@heroui/use-theme";
import { Icon } from "@iconify/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-start justify-start gap-2 mt-2 mb-2">
      <button
        aria-label="Light mode"
        className={`p-2 rounded-full transition ${
          theme === "light" ? "bg-default-100 text-primary" : "text-default-400"
        }`}
        type="button"
        onClick={() => setTheme("light")}
      >
        <Icon icon="solar:sun-2-bold" width={12} />
      </button>
      <button
        aria-label="Dark mode"
        className={`p-2 rounded-full transition ${
          theme === "dark" ? "bg-default-100 text-primary" : "text-default-400"
        }`}
        type="button"
        onClick={() => setTheme("dark")}
      >
        <Icon icon="solar:moon-bold" width={12} />
      </button>
    </div>
  );
}
