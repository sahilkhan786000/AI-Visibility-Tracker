import MetricCard from "./MetricCard";
import MetricStackCard from "./MetricStackCard";

export default function MetricsOverview({
  summary,
}: {
  summary?: {
    totalPrompts: number;
    visibilityScore: Record<string, number>;
    brandInclusionRate: number;
    aiSpecificity: number;
    avgBrandsPerAnswer: number;
  };
}) {
  const totalMentions =
    summary?.visibilityScore
      ? Object.values(summary.visibilityScore).reduce(
          (sum, val) => sum + (val ?? 0),
          0
        )
      : 0;

  const visibility =
    summary && summary.totalPrompts > 0
      ? Math.round((totalMentions / summary.totalPrompts) * 100)
      : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <MetricCard
        label="AI Visibility"
        value={visibility !== null ? `${visibility}%` : "—"}
      />

      <MetricCard
        label="Answers Mentioned"
        value={summary ? totalMentions.toString() : "—"}
      />

      <MetricCard
        label="Prompts Tracked"
        value={summary ? summary.totalPrompts.toString() : "—"}
      />

      <MetricStackCard
        title="AI Search Signals"
        items={[
          {
            label: "Brand Inclusion",
            value:
              typeof summary?.brandInclusionRate === "number"
                ? `${summary.brandInclusionRate}%`
                : "—",
            hint: "% of AI answers mentioning any tracked brand",
          },
          {
            label: "AI Specificity",
            value:
              typeof summary?.aiSpecificity === "number"
                ? `${summary.aiSpecificity}%`
                : "—",
            hint: "Answers that name concrete products",
          },
          {
            label: "Avg. Brands / Answer",
            value:
              typeof summary?.avgBrandsPerAnswer === "number"
                ? summary.avgBrandsPerAnswer.toFixed(2)
                : "—",
            hint: "Average brands mentioned per answer",
          },
        ]}
      />
    </div>
  );
}
