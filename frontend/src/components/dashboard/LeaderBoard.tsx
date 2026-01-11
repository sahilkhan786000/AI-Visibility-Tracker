import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function Leaderboard({
  items = [],
}: {
  items?: { brand: string; mentions: number }[];
}) {
  const { theme } = useTheme();
  const max = Math.max(...items.map((i) => i.mentions), 1);

  return (
    <div className={`p-6 rounded-xl ${themes[theme].card}`}>
      <h3 className={`font-semibold mb-4 ${themes[theme].text}`}>
        Visibility Leaderboard
      </h3>

      {items.length === 0 ? (
        <p className={`${themes[theme].text} opacity-60`}>
          No data yet. Run analysis.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((b, i) => (
            <div key={b.brand}>
              <div
                className={`flex justify-between text-sm mb-1 ${themes[theme].text}`}
              >
                <span>
                  #{i + 1} {b.brand}
                </span>
                <span>{b.mentions}</span>
              </div>

              <div className="h-2 rounded bg-black/10 overflow-hidden">
                <div
                  className={`h-2 rounded ${
                    theme === "space"
                      ? "bg-indigo-400"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${(b.mentions / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
