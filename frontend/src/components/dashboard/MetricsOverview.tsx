import MetricCard from "./MetricCard";
import MetricStackCard from "./MetricStackCard";

interface Summary {
  totalPrompts: number;
  totalBrands: number;
  totalBrandMentions: number;
  brandInclusionRate: number;
  avgBrandsPerAnswer: number;
}

interface LeaderboardItem {
  brand: string;
  visibilityScore: number;
  mentionRate: number;
  shareOfVoice: number;
  averagePosition: number | null;

  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    score: number;
  };

  totalMentions: number;
  answersMentioned: number;
}

interface MetricsOverviewProps {
  summary?: Summary;
  leaderboard?: LeaderboardItem[];
}

export default function MetricsOverview({
  summary,
  leaderboard,
}: MetricsOverviewProps) {
  /**
   * ------------------------------------------------
   * Answers Mentioned
   * ------------------------------------------------
   *
   * We want the number of AI answers that contained
   * at least one tracked brand.
   *
   * For one brand this is simply:
   *
   * leaderboard[0].answersMentioned
   *
   * But for multiple brands we CANNOT add
   * answersMentioned together because one answer may
   * contain multiple brands.
   *
   * summary.brandInclusionRate tells us the percentage
   * of unique answers containing any tracked brand.
   */

  const answersMentioned =
    summary && summary.totalPrompts > 0
      ? Math.round(
          (summary.brandInclusionRate / 100) *
            summary.totalPrompts
        )
      : null;

  /**
   * ------------------------------------------------
   * Overall AI Visibility
   * ------------------------------------------------
   *
   * For now, use Brand Inclusion as the overall
   * category-level visibility metric.
   *
   * Example:
   *
   * 4 of 8 answers mention tracked brands
   *
   * AI Visibility = 50%
   *
   * Individual brand visibility scores remain in
   * the leaderboard.
   */

  const visibility =
    typeof summary?.brandInclusionRate === "number"
      ? summary.brandInclusionRate
      : null;

  /**
   * ------------------------------------------------
   * Share of Voice
   * ------------------------------------------------
   *
   * This is mainly useful when multiple brands are
   * being tracked.
   *
   * If only one brand is supplied, SOV will normally
   * be 100% whenever that brand appears.
   */

  const topBrand =
    leaderboard && leaderboard.length > 0
      ? leaderboard[0]
      : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Overall visibility */}

      <MetricCard
        label="AI Visibility"
        value={
          visibility !== null
            ? `${visibility.toFixed(0)}%`
            : "—"
        }
      />

      {/* Number of answers containing tracked brands */}

      <MetricCard
        label="Answers Mentioned"
        value={
          answersMentioned !== null
            ? answersMentioned.toString()
            : "—"
        }
      />

      {/* Number of successfully analyzed prompts */}

      <MetricCard
        label="Prompts Tracked"
        value={
          summary
            ? summary.totalPrompts.toString()
            : "—"
        }
      />

      <MetricStackCard
        title="AI Search Signals"
        items={[
          {
            label: "Brand Inclusion",

            value:
              typeof summary?.brandInclusionRate ===
              "number"
                ? `${summary.brandInclusionRate.toFixed(
                    0
                  )}%`
                : "—",

            hint:
              "% of AI answers mentioning any tracked brand",
          },

          {
            label: "Top Brand Visibility",

            value:
              topBrand
                ? `${topBrand.visibilityScore.toFixed(
                    1
                  )}%`
                : "—",

            hint:
              topBrand
                ? `${topBrand.brand} visibility score`
                : "Highest visibility among tracked brands",
          },

          {
            label: "Avg. Brands / Answer",

            value:
              typeof summary?.avgBrandsPerAnswer ===
              "number"
                ? summary.avgBrandsPerAnswer.toFixed(2)
                : "—",

            hint:
              "Average tracked brands mentioned per answer",
          },
        ]}
      />
    </div>
  );
}