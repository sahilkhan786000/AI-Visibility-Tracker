import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function MetricStackCard({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    value: string;
    hint?: string;
  }[];
}) {
  const { theme } = useTheme();

  return (
    <div className={`p-5 rounded-xl ${themes[theme].card}`}>
      {/* 🔹 Card Title */}
      <h3 className={`font-semibold mb-4 ${themes[theme].text}`}>
        {title}
      </h3>

      {/* 🔹 Metrics */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div
              className={`flex justify-between text-sm ${themes[theme].text}`}
            >
              <span className="font-medium">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>

           
            {item.hint && (
              <p
                className={`text-xs mt-0.5 opacity-60 ${themes[theme].text}`}
              >
                {item.hint}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
