import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";
import type { ReactNode } from "react";

export default function AuthHero({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
   
      <div className="text-center max-w-xl mb-8">
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


      {children}
    </main>
  );
}
