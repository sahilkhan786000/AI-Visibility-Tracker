import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function SessionSidebar({
  sessions,
  onSelect,
  open,
  onClose,
}: {
  sessions: any[];
  onSelect: (session: any) => void;
  open: boolean;
  onClose: () => void;
}) {
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 🌫 Backdrop */}
          <motion.div
            className="fixed inset-0 z-30 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 🧊 Sidebar */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={`
              fixed left-0 top-0 h-full w-72 z-40
              backdrop-blur-xl
              ${themes[theme].card}
              ${
                theme === "space"
                  ? "border-r border-white/10"
                  : "border-r border-black/10"
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <h3 className={`font-semibold ${themes[theme].text}`}>
                Sessions
              </h3>

              {/* ✕ Close */}
              <button
                onClick={onClose}
                className={`
                  text-lg opacity-70 hover:opacity-100
                  ${themes[theme].text}
                `}
              >
                ✕
              </button>
            </div>

            {/* Session List */}
            <div className="px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-64px)]">
              {sessions.length === 0 && (
                <div
                  className={`text-sm opacity-60 ${themes[theme].text}`}
                >
                  No sessions yet
                </div>
              )}

              {sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelect(s);
                    onClose();
                  }}
                  className={`
                    p-3 rounded-lg cursor-pointer transition
                    ${
                      theme === "space"
                        ? "hover:bg-white/5"
                        : "hover:bg-black/5"
                    }
                    ${themes[theme].text}
                  `}
                >
                  <div className="font-medium truncate">
                    {s.category}
                  </div>
                  <div className="text-xs opacity-60 truncate">
                    {s.brands.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
