import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function AnalysisInputPanel({
  onRun,
  loading
}: {
  onRun: (category: string, brands: string[]) => Promise<boolean>;
  loading?: boolean;
}) {
  const { theme } = useTheme();
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState("");

  async function handleSubmit() {
    const parsedBrands = brands
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);

    if (!category || parsedBrands.length === 0) return;

    const success = await onRun(category, parsedBrands);

    // ✅ Clear only on success
    if (success) {
      setCategory("");
      setBrands("");
    }
  }

  return (
    <div className={`relative p-6 mb-8 rounded-xl ${themes[theme].card}`}>
     

      <h2 className={`text-lg font-semibold mb-4 ${themes[theme].text}`}>
        AI Visibility Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`p-3 rounded outline-none ${themes[theme].input}`}
          placeholder="Category (e.g. CRM software)"
        />

        <input
          value={brands}
          onChange={(e) => setBrands(e.target.value)}
          className={`p-3 rounded outline-none ${themes[theme].input}`}
          placeholder="Brands (comma separated)"
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`rounded transition-transform hover:scale-[1.02] disabled:opacity-60 ${themes[theme].button}`}
        >
          {loading ? "Analyzing…" : "Run Analysis"}
        </button>
      </div>
    </div>
  );
}
