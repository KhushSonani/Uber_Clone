import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../components/UI/AuthLayout";

const RiderLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/users/login", formData);
      const token = response.data.accessToken;
      await login(token);
      console.log("Login Successful");
      // if(user.role === "rider"){

      // }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed. Try again.");
      console.error(
        "Login Failed:",
        err.response ? err.response.data : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your journey"
      error={error}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
  
        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            placeholder="you@example.com"
          />
        </div>
  
        {/* Password */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            placeholder="Enter your password"
          />
        </div>
  
        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 active:scale-[0.98] transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
  
      {/* Bottom Links */}
      <div className="mt-8 pt-6 border-t border-zinc-800 text-center space-y-3 text-xs text-zinc-400">
        <p>
          New here?{" "}
          <Link to="/rider/signup" className="text-white hover:underline">
            Sign up as rider
          </Link>
        </p>
  
        <p>
          Want to drive?{" "}
          <Link to="/captain/signup" className="text-white hover:underline">
            Sign up as captain
          </Link>
        </p>
      </div>
  
    </AuthLayout>
  );
};

export default RiderLogin;
