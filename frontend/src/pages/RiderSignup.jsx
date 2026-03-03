import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext.jsx"; 
import AuthLayout from "../components/UI/AuthLayout";

const RiderSignup = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const response = await api.post("/users/signup", payload);
      const token = response.data.accessToken;
      login(token);
      console.log("Signup Successful");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup Failed. Try again.");
    } finally{
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to start your journey with RideSync"
      error={error}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
  
        {/* Username + Fullname */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
              placeholder="John012"
            />
          </div>
  
          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
              placeholder="John Doe"
            />
          </div>
        </div>
  
        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            placeholder="name@example.com"
          />
        </div>
  
        {/* Phone */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            placeholder="+91 xxxxx xxxxx"
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
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            placeholder="Enter password"
          />
        </div>
  
        {/* Confirm Password */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            placeholder="Confirm password"
          />
        </div>
  
        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 active:scale-[0.98] transition"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
  
      </form>
  
      {/* Bottom Links */}
      <div className="mt-8 pt-6 border-t border-zinc-800 text-center space-y-3 text-xs text-zinc-400">
        <p>
          Already have an account?{" "}
          <Link to="/rider/login" className="text-white hover:underline">
            Sign in
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

export default RiderSignup;
