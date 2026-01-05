import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur">
      <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>

      <input className="w-full mb-3 p-3 rounded bg-black/30 text-white" placeholder="Email" />
      <input className="w-full mb-4 p-3 rounded bg-black/30 text-white" type="password" placeholder="Password" />

      <button
        onClick={() => navigate("/dashboard")}
        className="w-full py-3 bg-indigo-600 rounded text-white"
      >
        Login
      </button>

      <p className="text-sm text-center mt-4 text-slate-400">
        No account? <span onClick={() => navigate("/signup")} className="cursor-pointer text-indigo-400">Sign up</span>
      </p>
    </div>
  );
}
