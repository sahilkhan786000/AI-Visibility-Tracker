import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "space" ? "nature" : "space")}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition
        ${themes[theme].card}
        ${themes[theme].text}
        hover:scale-[1.03]
      `}
    >
      {theme === "space" ? "🌿 Nature" : "🌌 Space"}
    </button>
  );
}
