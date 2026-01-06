import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

interface Props {
  answer: string;
  onClose: () => void;
}

export default function AnswerViewer({ answer, onClose }: Props) {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className={`p-6 rounded-xl max-w-2xl w-full ${themes[theme].card}`}>
        <button
          onClick={onClose}
          className={`${themes[theme].text} opacity-70 hover:opacity-100 absolute top-3 right-3`}
        >
          ✕
        </button>

        <h3 className={`text-lg font-semibold mb-4 ${themes[theme].text}`}>
          AI Answer (Raw)
        </h3>

        <pre
          className={`${themes[theme].text} opacity-90 text-sm whitespace-pre-wrap max-h-[60vh] overflow-y-auto`}
        >
{answer}
        </pre>
      </div>
    </div>
  );
}
