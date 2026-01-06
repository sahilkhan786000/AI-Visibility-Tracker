import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";
import { motion, AnimatePresence } from "framer-motion";

const prompts = [
  {
    id: 1,
    text: "Best CRM for startups?",
    mentioned: true,
    rank: "1st",
    answer: "HubSpot is often recommended for startups due to ease of use.",
  },
  {
    id: 2,
    text: "CRM tools for remote teams?",
    mentioned: false,
    rank: "—",
    answer: "For remote teams, tools like HubSpot and Zoho CRM are considered.",
  },
];

export default function PromptTable() {
  const { theme } = useTheme();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const rowHover =
    theme === "space" ? "hover:bg-white/5" : "hover:bg-black/5";

  return (
    <div className={`p-6 rounded-xl ${themes[theme].card}`}>
      <h3 className={`font-semibold mb-4 ${themes[theme].text}`}>
        Prompt Breakdown
      </h3>

      <table className="w-full text-sm border-collapse">
        <tbody>
          {prompts.map((row, index) => (
            <>
              {/* MAIN ROW */}
              <tr
                key={row.id}
                onClick={() =>
                  setExpandedRow(expandedRow === index ? null : index)
                }
                className={`cursor-pointer transition border-b ${themes[theme].tableDivider} ${rowHover}`}
              >
                <td className={`py-3 px-2 ${themes[theme].text}`}>
                  {row.text}
                </td>
                <td className={`py-3 px-2 ${themes[theme].text}`}>
                  {row.mentioned ? "✅" : "❌"}
                </td>
                <td className={`py-3 px-2 ${themes[theme].text}`}>
                  {row.rank}
                </td>
              </tr>

              {/* EXPANDED ROW */}
              <AnimatePresence>
                {expandedRow === index && (
                  <tr>
                    <td colSpan={3} className="p-0">
                     <motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: "auto" }}
  exit={{ opacity: 0, height: 0 }}
  transition={
    theme === "space"
      ? { duration: 0.4, ease: "easeOut" }   // 🌌 slow reveal
      : { duration: 0.25, ease: "easeInOut" } // 🌿 gentle
  }
  className={`
    px-4 py-3 text-sm
    ${themes[theme].text}
    ${
      theme === "space"
        ? "bg-black/30 backdrop-blur-xl shadow-inner"
        : "bg-emerald-50/70 border border-green-200"
    }
    rounded-lg mt-2
  `}
>
  <strong>AI Answer:</strong> {row.answer}
</motion.div>

                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
