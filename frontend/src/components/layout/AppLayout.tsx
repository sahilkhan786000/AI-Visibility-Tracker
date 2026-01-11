import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";
import ThemeToggle from "../common/ThemeToggle";
import { showSuccess } from "../../utils/toast";
import type { ReactNode } from "react";

export default function AppLayout({
  children,
  onToggleSessions,
}: {
  children: ReactNode;
  onToggleSessions?: () => void;
}) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    showSuccess("Logged out successfully", theme);
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative z-10 min-h-screen">
      {/* GLASS HEADER */}
      <header
        className={`
          fixed top-0 left-0 right-0
          h-16 px-6
          flex items-center justify-between
          z-30
          backdrop-blur-xl
          bg-white/5
          ${
            theme === "space"
              ? "border-b border-white/10"
              : "border-b border-black/10"
          }
        `}
      >
        <h1
          className={`text-xl font-semibold tracking-wide ${themes[theme].headerText}`}
        >
          AI Visibility Tracker
        </h1>

        <div className="flex items-center gap-4">
          
          <ThemeToggle />
          {onToggleSessions && (
            <button
              onClick={onToggleSessions}
              className={`px-3 py-1.5 text-sm rounded-lg transition hover:scale-[1.05] ${themes[theme].button}`}
            >
              Sessions
            </button>
          )}


          <button
            onClick={handleLogout}
            className={`px-3 py-1.5 text-sm rounded-lg transition hover:scale-[1.05] ${themes[theme].button}`}
          >
            Logout
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-20 px-6">{children}</main>
    </div>
  );
}
