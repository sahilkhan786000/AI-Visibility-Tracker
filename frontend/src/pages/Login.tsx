import LoginForm from "../components/auth/LoginForm";
import AuthHeader from "../components/layout/AuthHeader";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../styles/themes";
import AuthHero from "../components/layout/AuthHero";

export default function Login() {
  const { theme } = useTheme();

  return (
    // align each compeonent in a column one below the other
    <div className={`min-h-screen relative flex items-center justify-center ${themes[theme].bg}`}>
      <AuthHeader /> 
       <AuthHero>
        <LoginForm />
      </AuthHero>
     
 
    </div>
  );
}
