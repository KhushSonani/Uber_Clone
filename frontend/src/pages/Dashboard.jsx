import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RiderDashboard from "./RiderDashboard";
import CaptainDashboard from "./CaptainDashboard";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/rider/login");
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  if (!user) return null;

  if (user.role === "rider") {
    return <RiderDashboard />;
  }

  if (user.role === "captain") {
    return <CaptainDashboard />;
  }

  return null;
};

export default Dashboard;