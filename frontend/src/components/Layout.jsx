import React from 'react'
import BottomNavigation from './BottomNavigation'

const Layout = ({ children, showBottomNav = true, fullWidth = false }) => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      {/* Container */}
      <div
        className={`relative flex min-h-screen flex-col ${
          fullWidth ? "w-full" : "mx-auto w-full max-w-md"
        }`}
      >
        <main className="relative flex-1 pb-20 md:pb-8">
          {children}
        </main>

        {showBottomNav && <BottomNavigation />}
      </div>
    </div>
  )
}

export default Layout;