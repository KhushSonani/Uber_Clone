import React from 'react'
import BottomNavigation from './BottomNavigation'

const Layout = ({ children, showBottomNav = true }) => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="relative flex min-h-screen w-full max-w-md flex-col bg-black">
        <main className="flex-1 pb-20 md:pb-8">
          {children}
        </main>

        {showBottomNav && (
          <BottomNavigation />
        )}
      </div>
    </div>
  )
}

export default Layout

