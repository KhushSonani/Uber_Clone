import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/index.js";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../components/UI/AuthLayout.jsx";

const CaptainSignup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    plate: "",
    color: "",
    capacity: "",
    vehicleType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!Number.isInteger(Number(formData.capacity))) {
      setError("Capacity must be a valid whole number");
      return;
    }

    if (Number(formData.capacity) < 1) {
      setError("Capacity must be at least 1");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        vehicle: {
          color: formData.color,
          plate: formData.plate,
          capacity: Number(formData.capacity),
          vehicleType: formData.vehicleType,
        },
      };

      const response = await api.post("/captains/signup", payload);
      const token = response.data.accessToken;
      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Become a Captain"
      subtitle="Start earning on your own schedule"
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
              placeholder="captain_john"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          />

          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
            className="h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          />
        </div>

        {/* Password + Confirm */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          />

          <input
            type="password"
            name="confirmPassword"
            autoComplete="current-password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          />
        </div>

        {/* Vehicle Type */}
        <div className="relative">
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
            className="w-full h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 pr-10 text-sm appearance-none outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          >
            <option value="" disabled>
              Select vehicle type
            </option>
            <option value="car">Car</option>
            <option value="scooter">Scooter</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
            ▼
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="plate"
            placeholder="MH12AB1234"
            value={formData.plate}
            onChange={handleChange}
            required
            className="h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          />

          <input
            type="text"
            name="color"
            placeholder="White"
            value={formData.color}
            onChange={handleChange}
            required
            className="h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          />

          <input
            type="number"
            name="capacity"
            placeholder="4"
            min="1"
            step="1"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="h-12 rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register as Captain"}
        </button>

      </form>

      <div className="mt-8 pt-6 border-t border-zinc-800 text-center space-y-3 text-xs text-zinc-400">
        <p>
          Already registered?{" "}
          <Link to="/captain/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
        <p>
          Want to ride?{" "}
          <Link to="/rider/signup" className="text-white hover:underline">
            Sign up as rider
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default CaptainSignup;