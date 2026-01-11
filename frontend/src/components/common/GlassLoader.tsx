import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function GlassLoader({ text }: { text?: string }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Loader Card */}
      <div
        className={`relative px-8 py-6 rounded-xl flex flex-col items-center gap-4 ${themes[theme].card}`}
      >
        {/* Spinner */}
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />

        <p className={`${themes[theme].text} text-sm opacity-80`}>
          {text ?? "Analyzing AI visibility…"}
        </p>
      </div>
    </motion.div>
  );
}
