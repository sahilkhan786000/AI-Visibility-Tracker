export default function AnalysisInputPanel() {
  return (
    <div className="p-6 mb-6 rounded-xl bg-white/10">
      <input className="w-full mb-3 p-3 rounded" placeholder="Category (e.g. CRM software)" />
      <input className="w-full mb-3 p-3 rounded" placeholder="Brands (comma separated)" />
      <button className="w-full py-3 bg-indigo-600 text-white rounded">
        Run Analysis
      </button>
    </div>
  );
}
