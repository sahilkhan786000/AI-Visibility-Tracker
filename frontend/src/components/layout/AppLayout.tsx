import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";
import ThemeToggle from "../common/ThemeToggle";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <div className="relative z-10 min-h-screen">
      {/* GLASS HEADER */}
      <header
        className={`
          fixed top-0 left-0 right-0
          h-16 px-6
          flex items-center justify-between
          z-30

          /* mirror-glass effect */
          backdrop-blur-xl
          bg-white/5

          /* subtle bottom divider */
          ${
            theme === "space"
              ? "border-b border-white/10"
              : "border-b border-black/10"
          }
        `}
      >
        <h1
          className={`
            text-xl font-semibold tracking-wide
            ${themes[theme].headerText}
          `}
        >
          AI Visibility Tracker
        </h1>

        <ThemeToggle />
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-20 px-6">
        {children}
      </main>
    </div>
  );
}
