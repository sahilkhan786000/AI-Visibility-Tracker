import SpaceVideoBackground from "../components/background/SpaceVideoBackground";
import NatureVideoBackground from "../components/background/NatureVideoBackground";
import { useTheme } from "../context/ThemeContext";
import AppLayout from "../components/layout/AppLayout";
import  {PageFade}  from "../components/common/PageFade";
import AnalysisInputPanel from "../components/dashboard/AnalysisInputPanel";
import MetricsOverview from "../components/dashboard/MetricsOverview";
import Leaderboard from "../components/dashboard/LeaderBoard";
import PromptTable from "../components/dashboard/PromptTable";

export default function Dashboard() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "space" && <SpaceVideoBackground />}
      {theme === "nature" && <NatureVideoBackground />}

      <div className="relative z-10">
        <AppLayout>
        <PageFade>
          <AnalysisInputPanel />
          <MetricsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Leaderboard />
            <PromptTable />
          </div>
        </PageFade>
      </AppLayout>      </div>
    </>
  );
}
