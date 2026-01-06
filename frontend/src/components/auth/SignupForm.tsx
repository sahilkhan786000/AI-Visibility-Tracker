import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function SignupForm() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`w-full max-w-md p-8 rounded-xl ${themes[theme].card}`}>
      <h2 className={`text-2xl font-bold mb-6 ${themes[theme].text}`}>
        Create Account
      </h2>

      <input
        className={`w-full mb-3 p-3 rounded outline-none ${themes[theme].input}`}
        placeholder="Email"
      />

      <input
        type="password"
        className={`w-full mb-4 p-3 rounded outline-none ${themes[theme].input}`}
        placeholder="Password"
      />

      <button
        className={`w-full py-3 rounded-lg transition-transform hover:scale-[1.02] ${themes[theme].button}`}
        onClick={() => navigate("/dashboard")}
      >
        Sign up
      </button>

      <p  className={`
    ${themes[theme].text}
    text-center
    px-6 py-4
    max-w-3xl
    mx-auto
    leading-relaxed
  `}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className={`cursor-pointer ${themes[theme].accent}`}
        >
          Login
        </span>
      </p>
    </div>
  );
}
