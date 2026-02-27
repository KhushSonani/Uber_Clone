import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'rides', label: 'Rides', path: '/dashboard' },
  { key: 'account', label: 'Account', path: '/rider/login' },
]

const BottomNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto w-full max-w-md px-4 pb-4">
        <div className="rounded-2xl bg-black/95 text-white shadow-sm border border-zinc-800">
          <div className="flex items-center justify-between px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 min-h-12 rounded-xl text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                  type="button"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-80" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default BottomNavigation

