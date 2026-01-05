import ThemeToggle from "../common/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold text-white">
        AI Visibility Tracker
      </h1>
      <ThemeToggle />
    </nav>
  );
}
