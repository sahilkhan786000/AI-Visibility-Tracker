import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";
import AnswerViewer from "./AnswerViewer";

interface PromptRow {
  prompt: string;
  answer: string;
  mentions: string[];
}

export default function PromptTable({
  answers = [],
}: {
  answers?: PromptRow[];
}) {
  const { theme } = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const rowHover =
    theme === "space" ? "hover:bg-white/5" : "hover:bg-black/5";

  function StatusPill({ mentioned }: { mentioned: boolean }) {
    return (
      <span
        className={`
          px-2.5 py-1 rounded-full text-xs font-medium
          ${
            mentioned
              ? theme === "space"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-emerald-100 text-emerald-700"
              : theme === "space"
              ? "bg-white/10 text-white/60 border border-white/10"
              : "bg-gray-100 text"
          }
        `}
      >
        {mentioned ? "Mentioned" : "Not Mentioned"}
      </span>
    );
  }

  return (
    <>
      <div className={`p-6 rounded-xl ${themes[theme].card}`}>
        <h3 className={`font-semibold mb-4 ${themes[theme].text}`}>
          Prompt Breakdown
        </h3>

        {answers.length === 0 ? (
          <p className={`${themes[theme].text} opacity-60 text-sm`}>
            No prompts analyzed yet. Run an analysis to see AI mentions.
          </p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`${themes[theme].text} opacity-60`}>
                <th className="text-left py-2 px-2 font-medium">Prompt</th>
                <th className="text-left py-2 px-2 font-medium">Status</th>
                <th className="text-left py-2 px-2 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {answers.map((row, index) => {
                const mentioned = row.mentions.length > 0;

                return (
                  <tr
                    key={index}
                    onClick={() => setSelectedAnswer(row.answer)}
                    className={`cursor-pointer transition border-b ${themes[theme].tableDivider} ${rowHover}`}
                  >
                    <td className={`py-3 px-2 ${themes[theme].text}`}>
                      {row.prompt}
                    </td>

                    <td className="py-3 px-2">
                      <StatusPill mentioned={mentioned} />
                    </td>

                    <td className={`py-3 px-2 text-xs ${themes[theme].accent}`}>
                      View Answer →
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔮 Glass Modal */}
      {selectedAnswer && (
        <AnswerViewer
          answer={selectedAnswer}
          onClose={() => setSelectedAnswer(null)}
        />
      )}
    </>
  );
}
