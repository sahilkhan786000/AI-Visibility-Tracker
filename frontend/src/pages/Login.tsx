import LoginForm from "../components/auth/LoginForm";
import AuthHeader from "../components/layout/AuthHeader";
import AuthHero from "../components/layout/AuthHero";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/themes";

export default function Login() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen relative flex items-center justify-center ${themes[theme].bg}`}
    >
      <AuthHeader />
      <AuthHero />
      <LoginForm />
    </div>
  );
}
