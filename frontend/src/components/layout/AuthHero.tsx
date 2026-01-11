import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function AuthHero() {
  const { theme } = useTheme();

  return (
    <div className="absolute top-28 w-full flex justify-center">
      <div className="text-center max-w-xl px-6">
        <h1
          className={`text-3xl md:text-4xl font-bold tracking-tight ${themes[theme].headerText}`}
        >
          AI Visibility Tracker
        </h1>

        <p
          className={`mt-3 text-sm md:text-base ${themes[theme].text} opacity-70`}
        >
          Track how often your brand appears in AI-generated answers.
          Measure visibility, competitors, and prompt-level mentions.
        </p>
      </div>
    </div>
  );
}
