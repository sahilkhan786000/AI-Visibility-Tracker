import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

const brands = [
  { name: "HubSpot", visibility: 57 },
  { name: "Salesforce", visibility: 42 },
  { name: "Pipedrive", visibility: 31 },
];

export default function Leaderboard() {
  const { theme } = useTheme();

  return (
    <div className={`p-6 rounded-xl ${themes[theme].card}`}>
      <h3 className={`font-semibold mb-4 ${themes[theme].text}`}>
        Leaderboard
      </h3>

      <div className="space-y-3">
        {brands.map((b, i) => (
          <div
            key={b.name}
            className={`flex justify-between items-center ${themes[theme].text}`}
          >
            <span className="font-medium">
              #{i + 1} {b.name}
            </span>
            <span className="opacity-80">{b.visibility}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
