import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "space" ? "nature" : "space")}
      className="px-4 py-2 rounded-lg border text-sm"
    >
      {theme === "space" ? "🌿 Nature" : "🌌 Space"}
    </button>
  );
}
