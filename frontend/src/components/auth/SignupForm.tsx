import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";
import { signup } from "../../services/authApi";
import { showError, showSuccess } from "../../utils/toast";

export default function SignupForm() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    // 🔍 Client-side validations
    if (!email.trim()) {
      return showError("Email is required", theme);
    }

    if (!password.trim()) {
      return showError("Password is required", theme);
    }

    if (password.length < 8) {
      return showError("Password must be at least 8 characters", theme);
    }

    try {
      setLoading(true);

      const res = await signup(email, password);
      localStorage.setItem("token", res.token);

      showSuccess("Account created successfully", theme);
      navigate("/dashboard");
    } catch (err: any) {
      showError(
        err.message || "Unable to create account. Try again.",
        theme
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`w-full max-w-md p-8 rounded-xl ${themes[theme].card}`}>
      <h2 className={`text-2xl font-bold mb-6 ${themes[theme].text}`}>
        Create Account
      </h2>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full mb-3 p-3 rounded outline-none ${themes[theme].input}`}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full mb-4 p-3 rounded outline-none ${themes[theme].input}`}
        placeholder="Password"
      />

      <button
        disabled={loading}
        onClick={handleSignup}
        className={`w-full py-3 rounded-lg transition-transform hover:scale-[1.02] disabled:opacity-60 ${themes[theme].button}`}
      >
        {loading ? "Creating account…" : "Sign up"}
      </button>

      <p className={`${themes[theme].text} text-center mt-4`}>
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
