interface Props {
  answer: string;
  onClose: () => void;
}

export default function AnswerViewer({ answer, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4 text-white">
          AI Answer (Raw)
        </h3>

        <pre className="text-sm text-slate-300 whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
{answer}
        </pre>
      </div>
    </div>
  );
}
