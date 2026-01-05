import AppLayout from "../components/layout/AppLayout";
import AnalysisInputPanel from "../components/dashboard/AnalysisInputPanel";
import MetricsOverview from "../components/dashboard/MetricsOverview"
import Leaderboard from "../components/dashboard/LeaderBoard";
import PromptTable from "../components/dashboard/PromptTable";

export default function Dashboard() {
  return (
    <AppLayout>
      <AnalysisInputPanel />
      <MetricsOverview />
      <Leaderboard />
      <PromptTable />
    </AppLayout>
  );
}
