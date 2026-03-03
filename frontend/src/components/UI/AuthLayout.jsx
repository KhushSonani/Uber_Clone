import React from "react";

const AuthLayout = ({ title, subtitle, error, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <img
            src="/app-icon-bu.jpg"
            alt="RideSync"
            className="h-14 w-14 rounded-2xl shadow-lg ring-1 ring-white/10"
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            RideSync
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md shadow-2xl">
          <div className="px-8 py-10">

            {/* Title + Subtitle */}
            <div className="mb-8">
              {title && (
                <h2 className="text-2xl font-semibold">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-sm text-zinc-400">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Form / Content */}
            {children}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;