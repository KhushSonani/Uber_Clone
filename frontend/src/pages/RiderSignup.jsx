import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext.jsx";

const RiderSignup = () => {
  const { login } = useAuth();

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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...payload } = formData;
      const response = await api.post("/users/signup", payload);
      const token = response.data.accessToken;
      const { login } = useAuth();
      login(token);
      console.log("Signup Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-2">
                Sign Up
              </h2>
              <p className="text-gray-500 text-lg">
                Create your RideSync account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="User Name"
                    type="text"
                    name="username"
                    placeholder="John012"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    icon={
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                  />
                  <Input
                    label="Full Name"
                    type="text"
                    name="fullname"
                    placeholder="John Doe"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  }
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-zinc-800 transition-all duration-300 py-3.5 rounded-lg text-lg font-semibold flex justify-center items-center shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col space-y-4 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/rider/login"
                  className="text-black font-semibold hover:underline">
                  Sign In
                </Link>
              </p>

              <Link
                to="/captain/signup"
                className="text-sm text-gray-500 hover:text-black transition-colors font-medium">
                Want to drive? Sign up as Captain &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderSignup;
