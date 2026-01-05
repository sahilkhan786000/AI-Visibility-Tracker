import Navbar from "./Nabar";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function AppLayout({ children }: any) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${themes[theme].bg}`}>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
