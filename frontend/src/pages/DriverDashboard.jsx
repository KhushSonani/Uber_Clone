import React from "react";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import api from "../api";

const CaptainDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const captainName = user?.fullname || "Captain";
  const firstName = captainName?.split(" ")[0];
  if (!user) return null;
  const handleLogout = () =>{
    logout();
    navigate("/",{replace: true});
  }

  const stats = [
    {
      label: "Total Rides",
      value: "128",
      sub: "Completed in the last 30 days",
      icon: (
        <svg
          className="h-5 w-5 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 16V9.5A2.5 2.5 0 0 1 6.5 7H17a3 3 0 0 1 3 3v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5 16h14M6.5 7 8 4.5h5L15.5 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="7" cy="17.5" r="1.5" fill="currentColor" />
          <circle cx="17" cy="17.5" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Total Earnings",
      value: "₹ 42,350",
      sub: "This month so far",
      icon: (
        <svg
          className="h-5 w-5 text-indigo-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 7h9.5a3.5 3.5 0 0 1 0 7H7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 4v16M7 4h6M7 20h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Online Hours",
      value: "6h 24m",
      sub: "Today’s active time",
      icon: (
        <svg
          className="h-5 w-5 text-amber-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 9v3.5L14 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Rating",
      value: "4.9",
      sub: "Based on 320 rides",
      icon: (
        <svg
          className="h-5 w-5 text-yellow-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="m12 4 1.9 3.85 4.25.62-3.07 2.99.72 4.21L12 13.9 8.2 15.67l.72-4.21L5.85 8.47l4.25-.62L12 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const recentRides = [
    {
      id: 1,
      passenger: "Neha Sharma",
      pickup: "Infinity Mall, Andheri West",
      drop: "Powai Lake, Hiranandani",
      fare: "₹ 320",
      status: "Pending",
      statusColor: "red",
      note: "New request • 2 min ago",
    },
    {
      id: 2,
      passenger: "Rohan Verma",
      pickup: "BKC Business Park",
      drop: "Mumbai International Airport T2",
      fare: "₹ 780",
      status: "Accepted",
      statusColor: "emerald",
      note: "Pickup in 4 minutes",
    },
    {
      id: 3,
      passenger: "Ananya Iyer",
      pickup: "Phoenix Marketcity, Kurla",
      drop: "Lokhandwala Complex, Andheri West",
      fare: "₹ 540",
      status: "Completed",
      statusColor: "zinc",
      note: "Completed • Today, 9:15 AM",
    },
  ];

  const actionButtons = [
    {
      label: "Go Online",
      variant: "primary",
    },
    {
      label: "View Ride History",
      variant: "secondary",
    },
    {
      label: "Earnings",
      variant: "secondary",
    },
    {
      label: "Profile",
      variant: "secondary",
    },
    {
      label: "Support",
      variant: "secondary",
    },
    {
      label: "Logout",
      variant: "danger",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-10 rounded-2xl bg-white text-black flex items-center justify-center shadow-sm">
              <img
                src="/app-icon-w.jpg"
                alt="RideSync"
                className="h-10 w-14 rounded-2xl shadow-lg ring-1 ring-white/10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                RIDESYNC
              </span>
              <span className="text-sm text-zinc-500">Captain dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-zinc-400">Captain</p>
              <p className="text-xs font-medium text-zinc-200">
                {captainName}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-semibold shadow-sm">
              {captainName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>
        </header>

        {/* Greeting */}
        <section className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Good morning, {firstName}
          </h1>
          <p className="text-sm text-zinc-400">
            Here&apos;s your driving overview for today.
          </p>
        </section>

        {/* Stats cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-4 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 h-9 w-9 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                  {item.label}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-semibold tracking-tight">
                  {item.value}
                </p>
                <p className="text-xs text-zinc-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Main content */}
        <main className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Recent Ride Requests */}
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                  Recent ride requests
                </h2>
                <p className="text-xs text-zinc-400">
                  Live overview of your latest passenger requests.
                </p>
              </div>
              <span className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-[11px] text-zinc-400">
                Today • Auto-refreshed
              </span>
            </div>

            <div className="space-y-4">
              {recentRides.map((ride) => {
                const colorMap = {
                  red: {
                    bg: "bg-red-500/10",
                    border: "border-red-500/30",
                    text: "text-red-400",
                  },
                  emerald: {
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/30",
                    text: "text-emerald-400",
                  },
                  zinc: {
                    bg: "bg-zinc-800",
                    border: "border-zinc-700",
                    text: "text-zinc-400",
                  },
                }[ride.statusColor];

                return (
                  <div
                    key={ride.id}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-zinc-100">
                          {ride.passenger}
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          Passenger • Cash / UPI
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border ${colorMap.bg} ${colorMap.border} ${colorMap.text}`}
                      >
                        {ride.status}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs text-zinc-400">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                            Pickup
                          </p>
                          <p className="text-sm text-zinc-100">{ride.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-500" />
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                            Drop
                          </p>
                          <p className="text-sm text-zinc-100">{ride.drop}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                            Estimated fare
                          </p>
                          <p className="text-sm text-zinc-100">{ride.fare}</p>
                        </div>
                        <p className="text-[11px] text-zinc-500">{ride.note}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      {ride.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            className="rounded-2xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors duration-150 hover:bg-zinc-800"
                          >
                            Ignore
                          </button>
                          <button
                            type="button"
                            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform duration-150 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.99]"
                          >
                            Accept ride
                          </button>
                        </>
                      )}
                      {ride.status === "Accepted" && (
                        <button
                          type="button"
                          className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform duration-150 hover:from-indigo-400 hover:to-purple-400 active:scale-[0.99]"
                        >
                          Start trip
                        </button>
                      )}
                      {ride.status === "Completed" && (
                        <button
                          type="button"
                          className="rounded-2xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors duration-150 hover:bg-zinc-800"
                        >
                          View details
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Actions */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-6 space-y-5 shadow-xl">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                  Quick actions
                </h2>
                <p className="text-xs text-zinc-400">
                  Manage your availability, trips, and account with a tap.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {actionButtons.map((action) => {
                  if (action.variant === "primary") {
                    return (
                      <button
                        key={action.label}
                        type="button"
                        className="flex h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.99]"
                      >
                        {action.label}
                      </button>
                    );
                  }

                  if (action.variant === "danger") {
                    return (
                      <button
                        key={action.label}
                        type="button"
                        onClick={handleLogout}
                        className="flex h-11 w-full items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/5 text-sm font-semibold text-red-400 shadow-sm transition-colors duration-150 hover:bg-red-500/15"
                      >
                        {action.label}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={action.label}
                      type="button"
                      className="flex h-11 w-full items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/80 text-sm font-medium text-zinc-200 shadow-sm transition-colors duration-150 hover:bg-zinc-900"
                    >
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-900 bg-black/40 p-4 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Today&apos;s tips
              </p>
              <p className="text-sm text-zinc-200">
                Peak demand expected between{" "}
                <span className="text-emerald-400">6 PM – 9 PM</span> near
                business districts. Staying online can increase your earnings.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default CaptainDashboard;