import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="relative flex min-h-screen flex-col text-white">
        {/* Fullscreen map background */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#18181b,_#020617)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 to-black/50" />
          <div className="pointer-events-none absolute inset-6 rounded-3xl border border-zinc-800/60" />
          <div className="pointer-events-none absolute inset-x-10 top-16 h-32 rounded-3xl border border-zinc-700/40 bg-zinc-900/40" />
          <div className="pointer-events-none absolute inset-x-16 bottom-40 h-32 rounded-3xl border border-zinc-700/40 bg-zinc-900/30" />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 flex flex-1 flex-col justify-between px-4 pt-6 pb-4 animate-fade-in">
          {/* Top label */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-200 shadow-sm border border-zinc-800 transition-colors duration-200 hover:bg-black/70 hover:text-white"
              type="button"
            >
              RIDESYNC
            </button>
            <div className="flex items-center space-x-2 text-xs text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Online</span>
            </div>
          </div>

          {/* Bottom sheet */}
          <div className="pointer-events-none mt-auto flex justify-center">
            <div className="pointer-events-auto w-full rounded-3xl bg-black/95 p-5 pb-6 shadow-sm border border-zinc-800 md:pb-7 transition-colors duration-200">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-700" />

              <div className="mb-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Book your next ride
                </h1>
                <p className="mt-1 text-sm text-zinc-400">
                  Set your pickup, choose a ride, and go. Simple, fast, and always nearby.
                </p>
              </div>

              <div className="mb-4 space-y-3">
                <div className="rounded-2xl bg-zinc-900 px-4 py-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-400">Pickup</span>
                    <span className="text-sm font-medium">Current location</span>
                  </div>
                  <span className="text-xs text-indigo-400">Change</span>
                </div>
                <div className="rounded-2xl bg-zinc-900 px-4 py-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-400">Destination</span>
                    <span className="text-sm font-medium text-zinc-400">Where to?</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/rider/signup')}
                className="mb-3 flex w-full min-h-12 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-indigo-500 active:scale-[0.99]"
                type="button"
              >
                Book a ride
              </button>

              <div className="mt-2 flex flex-col gap-3 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => navigate('/rider/login')}
                  className="w-full text-left font-medium text-indigo-400 underline-offset-2 transition-colors duration-200 hover:text-indigo-300 hover:underline sm:w-auto"
                  type="button"
                >
                  Already have an account? Log in
                </button>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => navigate('/rider/signup')}
                    className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-2.5 text-xs font-medium text-zinc-200 shadow-sm transition-colors duration-200 hover:bg-zinc-900 sm:w-auto"
                    type="button"
                  >
                    Sign up as rider
                  </button>
                  <button
                    onClick={() => navigate('/captain/signup')}
                    className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-2.5 text-xs font-medium text-zinc-200 shadow-sm transition-colors duration-200 hover:bg-zinc-900 sm:w-auto"
                    type="button"
                  >
                    Sign up as captain
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home