import { useEffect, useState } from "react";
import SpaceVideoBackground from "../components/background/SpaceVideoBackground";
import NatureVideoBackground from "../components/background/NatureVideoBackground";
import { useTheme } from "../context/ThemeContext";
import AppLayout from "../components/layout/AppLayout";
import { PageFade } from "../components/common/PageFade";
import GlassLoader from "../components/common/GlassLoader";

import AnalysisInputPanel from "../components/dashboard/AnalysisInputPanel";
import MetricsOverview from "../components/dashboard/MetricsOverview";
import Leaderboard from "../components/dashboard/LeaderBoard";
import PromptTable from "../components/dashboard/PromptTable";
import SessionSidebar from "../components/dashboard/SessionSidebar";

import { checkVisibility } from "../services/visibilityApi";
import { getSessions, saveSession } from "../services/sessionApi";
import { showError, showSuccess } from "../utils/toast";
import type { VisibilityResponse } from "../types/visibility";

export default function Dashboard() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);

  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSession, setActiveSession] =
    useState<VisibilityResponse | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  useEffect(() => {
    getSessions()
      .then((data) => {
        setSessions(data);
        if (data.length > 0) {
          setActiveSession(data[0].result); 
        }
      })
      .catch(() => {
        setSessions([]);
      });
  }, []);

  async function runAnalysis(
  category: string,
  brands: string[]
): Promise<boolean> {
  try {
    setLoading(true);

    const result = await checkVisibility(category, brands);

    const saved = await saveSession({
      category,
      brands,
      result,
    });

    setSessions((prev) => [saved, ...prev]);
    setActiveSession(saved.result);
    setSidebarOpen(false);

    showSuccess("Analysis completed successfully", theme);
    return true;
  } catch (err: any) {
    showError(
      err.message ||
        "You are not authorized to run analysis. Please log in again.",
      theme
    );
    return false; 
  } finally {
    setLoading(false);
  }
}


  return (
    <>
      {/* 🟦 Session Sidebar */}
      <SessionSidebar
        open={sidebarOpen}
        sessions={sessions}
        onSelect={(session: any) => {
          setActiveSession(session.result);
          setSidebarOpen(false);
        }}
        onClose={() => setSidebarOpen(false)}
      />

 
      {theme === "space" && <SpaceVideoBackground />}
      {theme === "nature" && <NatureVideoBackground />}

     
      <div className="relative z-10">
        <AppLayout onToggleSessions={() => setSidebarOpen(true)}>
          <PageFade>
            <AnalysisInputPanel
              onRun={runAnalysis}
              loading={loading}
            />

            <MetricsOverview summary={activeSession?.summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Leaderboard items={activeSession?.leaderboard} />
              <PromptTable answers={activeSession?.answers} />
            </div>
          </PageFade>

       
          {loading && <GlassLoader />}
        </AppLayout>
      </div>
    </>
  );
}
