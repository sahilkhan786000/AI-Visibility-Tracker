import MetricCard from "./MetricCard";

export default function MetricsOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <MetricCard label="Visibility" value="57%" />
      <MetricCard label="Answers Mentioned" value="12" />
      <MetricCard label="Prompts Tracked" value="8" />
      <MetricCard label="Market Share" value="34%" />
    </div>
  );
}
