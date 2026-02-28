import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import api from "../api";
import { useAuth } from "../context/AuthContext.jsx";

const CaptainSignup = () => {
  const { login } = useAuth();

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        // phone: formData.phone,
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
      const { login } = useAuth();
      login(token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-10">
            <div className="mb-10 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-2">
                Become a Captain
              </h2>
              <p className="text-gray-500 text-lg">
                Start earning on your own schedule
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="User Name"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Full Name"
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="space-y-5">
                  <div>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black">
                      <option value="" disabled>
                        Select vehicle type
                      </option>
                      <option value="car">🚗 Car</option>
                      <option value="scooter">🛵 Scooter</option>
                      <option value="bike">🏍️ Bike</option>
                      <option value="auto">🛺 Auto</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Input
                      label="Vehicle Number"
                      type="text"
                      name="plate"
                      value={formData.plate}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Vehicle Color"
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Capacity"
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold">
                  Register as Captain
                </button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">
                Already registered?{" "}
                <Link
                  to="/captain/login"
                  className="text-black font-semibold hover:underline">
                  Sign In
                </Link>
              </p>

              <Link
                to="/rider/signup"
                className="text-sm text-gray-500 hover:text-black transition-colors font-medium">
                Want to ride? Sign up as Rider →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
