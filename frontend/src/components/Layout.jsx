import React from 'react'
import BottomNavigation from './BottomNavigation'

const Layout = ({ children, showBottomNav = true }) => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Fullscreen Background Layer */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      {/* Centered Mobile Container */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col">

        <main className="relative flex-1 pb-20 md:pb-8">
          {children}
        </main>

        {showBottomNav && <BottomNavigation />}

      </div>
    </div>
  )
}

export default Layout