import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock signup (prototype)
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Create Account
      </h2>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-black/30 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-black/30 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-indigo-600 hover:bg-indigo-500 transition text-white"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-sm text-slate-400 mt-4 text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="cursor-pointer text-indigo-400"
        >
          Login
        </span>
      </p>
    </div>
  );
}
