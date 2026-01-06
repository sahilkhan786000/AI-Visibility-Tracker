import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function AnalysisInputPanel() {
  const { theme } = useTheme();

  return (
    <div className={`p-6 mb-8 rounded-xl ${themes[theme].card}`}>
      <h2 className={`text-lg font-semibold mb-4 ${themes[theme].text}`}>
        AI Visibility Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className={`p-3 rounded outline-none ${themes[theme].input}`}
          placeholder="Category (e.g. CRM software)"
        />
        <input
          className={`p-3 rounded outline-none ${themes[theme].input}`}
          placeholder="Brands (comma separated)"
        />
        <button
          className={`rounded transition-transform hover:scale-[1.02] ${themes[theme].button}`}
        >
          Run Analysis
        </button>
      </div>
    </div>
  );
}
