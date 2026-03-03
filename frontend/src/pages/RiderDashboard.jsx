import React from 'react'
import { useAuth } from "../context/AuthContext";

const RiderDashboard = () => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-6xl px-4 py-6 space-y-8">
                {/* Header */}
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-10 rounded-2xl bg-white text-black flex items-center justify-center shadow-sm">
                            <span className="text-sm font-bold tracking-wide"><img
                                src="/app-icon-w.jpg"
                                alt="RideSync"
                                className="h-10 w-14 rounded-2xl shadow-lg ring-1 ring-white/10"
                            /></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                RIDESYNC
                            </span>
                            <span className="text-sm text-zinc-500">
                                Rider dashboard
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500">{user.fullname}</span>
                        <div className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-semibold shadow-sm">
                            {user?.fullname
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Greeting */}
                <section className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Good morning,{user?.fullname?.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Here&apos;s a quick overview of your rides today.
                    </p>
                </section>

                {/* Main content */}
                <main className="grid gap-6 lg:grid-cols-2">
                    {/* Create Ride Card */}
                    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-6 space-y-6 shadow-xl">
                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold tracking-tight">
                                Book a Ride
                            </h2>
                            <p className="text-xs text-zinc-400">
                                Set your pickup and destination to get started.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                        Pickup
                                    </span>
                                    <span className="text-sm text-zinc-100">
                                        Current location
                                    </span>
                                </div>
                                <span className="text-[11px] text-indigo-400">
                                    Change
                                </span>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                        Destination
                                    </span>
                                    <span className="text-sm text-zinc-500">
                                        Where do you want to go?
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                        Estimated fare
                                    </span>
                                    <span className="text-sm text-zinc-100">
                                        ₹ 320 – ₹ 380
                                    </span>
                                </div>
                                <span className="text-[11px] text-zinc-500">
                                    Economy · 12 min away
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:from-indigo-400 hover:to-purple-400 active:scale-[0.99]"
                        >
                            Confirm ride
                        </button>
                    </section>

                    {/* Current Ride Section */}
                    <section className="space-y-6">
                        {/* Current Ride header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold tracking-tight">
                                    Current ride
                                </h2>
                                <p className="text-xs text-zinc-400">
                                    Live status of your ongoing and recent rides.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Pending ride */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-5 space-y-4 shadow-xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-zinc-100">
                                        Office commute
                                    </span>
                                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-400 border border-red-500/30">
                                        Pending
                                    </span>
                                </div>

                                <div className="space-y-3 text-xs text-zinc-400">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Pickup
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                A-102, Green Heights, Andheri East
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-500" />
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Drop
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                BKC One, Bandra Kurla Complex
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Fare
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                ₹ 340.00
                                            </p>
                                        </div>
                                        <p className="text-[11px] text-zinc-500">
                                            Driver will be assigned shortly
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="rounded-2xl bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 border border-red-500/40 transition-colors duration-150 hover:bg-red-500/20"
                                    >
                                        Cancel ride
                                    </button>
                                </div>
                            </div>

                            {/* Accepted ride */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-5 space-y-4 shadow-xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-zinc-100">
                                        Airport drop
                                    </span>
                                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-400 border border-emerald-500/30">
                                        Accepted
                                    </span>
                                </div>

                                <div className="space-y-3 text-xs text-zinc-400">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Pickup
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                Orion Residency, Powai
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-500" />
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Drop
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                Terminal 2, Mumbai International Airport
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Fare
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                ₹ 820.00
                                            </p>
                                        </div>
                                        <p className="text-[11px] text-emerald-400">
                                            Driver arriving in 5 minutes
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Completed ride */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md p-5 space-y-4 shadow-xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-zinc-100">
                                        Evening ride
                                    </span>
                                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 border border-zinc-700">
                                        Completed
                                    </span>
                                </div>

                                <div className="space-y-3 text-xs text-zinc-400">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Pickup
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                Lakeside Park, Powai
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-500" />
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Drop
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                Home · Green Heights, Andheri East
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                                Fare
                                            </p>
                                            <p className="text-sm text-zinc-100">
                                                ₹ 260.00
                                            </p>
                                        </div>
                                        <p className="text-[11px] text-zinc-500">
                                            Paid via UPI • Yesterday, 8:15 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default RiderDashboard;