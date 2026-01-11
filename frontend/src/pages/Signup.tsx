import SignupForm from "../components/auth/SignupForm";
import AuthHeader from "../components/layout/AuthHeader";
import AuthHero from "../components/layout/AuthHero";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/themes";

export default function Signup() {
  const { theme } = useTheme();

  return (
      <div className={`min-h-screen ${themes[theme].bg}`}>
      <AuthHeader />
        <AuthHero>
          <SignupForm />
        </AuthHero>
        </div>
  );
}
