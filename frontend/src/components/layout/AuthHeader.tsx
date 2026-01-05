import ThemeToggle from "../common/ThemeToggle";

export default function AuthHeader() {
  return (
    <div className="absolute top-6 right-6">
      <ThemeToggle />
    </div>
  );
}
