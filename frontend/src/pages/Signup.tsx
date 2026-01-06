import SignupForm from "../components/auth/SignupForm";
import AuthHeader from "../components/layout/AuthHeader";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/themes";

export default function Signup() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen relative flex items-center justify-center ${themes[theme].bg}`}>
      <AuthHeader />
      <SignupForm />
    </div>
  );
}
