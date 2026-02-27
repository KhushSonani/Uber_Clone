import React,{useEffect,useState} from 'react'
import api from '../api/index.js'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const Dashboard = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async ()=>{
      try {
        const res = await api.get("/users/profile");
        console.log("Profile Data:",res.data);
        setUser(res.data.user);
        
      } catch (err) {
        console.error("Failed to fetch profile:", err.response ? err.response.data : err.message);
      }
    };
    fetchProfile();
  },[]);

  const handleLogout = () => {
    console.log('Logout clicked')
    navigate('/')
  }

  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 text-white">
        <header className="mb-8 flex items-center justify-between">
          <button
            className="flex items-center space-x-3 rounded-2xl bg-white text-black px-3 py-2 shadow-sm"
            onClick={() => navigate('/')}
            type="button"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">RideSync</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-black text-zinc-400 shadow-sm"
              type="button"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm">
              <span className="text-xs font-semibold tracking-wide">
                {user?.fullname ? user.fullname.substring(0, 2).toUpperCase() : 'ME'}
              </span>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Good morning, {user?.fullname || 'User'}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Here&apos;s what&apos;s happening with your rides today.
          </p>
        </section>

        <section className="mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">Total Rides</h3>
            <p className="text-3xl font-semibold text-white">0</p>
            <p className="mt-3 flex items-center text-xs font-medium text-emerald-400">
              <svg className="mr-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              0% from last week
            </p>
          </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">Total Earnings</h3>
            <p className="text-3xl font-semibold text-white">₹0</p>
            <p className="mt-3 flex items-center text-xs font-medium text-emerald-400">
              <svg className="mr-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              0% from last week
            </p>
          </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">Online Hours</h3>
            <p className="text-3xl font-semibold text-white">0h</p>
            <p className="mt-3 text-xs font-medium text-zinc-400">This week</p>
          </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">Rating</h3>
            <p className="text-3xl font-semibold text-white">5.0</p>
            <p className="mt-3 text-xs font-medium text-zinc-400">From 0 reviews</p>
          </div>
        </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
            
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 px-4 py-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 shadow-sm">
                <svg className="h-9 w-9 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">No rides yet</h3>
              <p className="max-w-sm text-center text-sm text-zinc-400">
                Your recent ride history will appear here once you start taking rides.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="flex w-full min-h-12 items-center justify-center space-x-3 rounded-xl bg-white text-black text-sm font-semibold shadow-sm transition-colors hover:bg-zinc-100" type="button">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Ride</span>
              </button>
              
              <button className="w-full min-h-12 rounded-xl border border-zinc-800 bg-black text-sm font-semibold text-white transition-colors hover:bg-zinc-900" type="button">
                View Earnings
              </button>
              
              <button className="w-full min-h-12 rounded-xl border border-zinc-800 bg-black text-sm font-semibold text-white transition-colors hover:bg-zinc-900" type="button">
                My Profile
              </button>
              
              <button className="w-full min-h-12 rounded-xl border border-zinc-800 bg-black text-sm font-semibold text-white transition-colors hover:bg-zinc-900" type="button">
                Support
              </button>

              <div className="mt-3 border-t border-zinc-800 pt-3">
                <button 
                  onClick={handleLogout}
                  className="w-full min-h-12 rounded-xl bg-red-50 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Dashboard