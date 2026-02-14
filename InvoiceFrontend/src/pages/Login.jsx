import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authActions";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.authState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }

    const success = await dispatch(loginUser({ email, password }));

    if (success) {
      navigate("/invoices");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md rounded-3xl border border-gray-200 shadow-sm p-8"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Login to manage invoices & payments.
        </p>

        {error && (
          <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl font-semibold text-sm">
            {error}
          </div>
        )}

        <div className="mt-7 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            disabled={loading}
            onClick={handleLogin}
            className={`w-full py-4 rounded-2xl font-bold shadow transition
            ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-500 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-green-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
