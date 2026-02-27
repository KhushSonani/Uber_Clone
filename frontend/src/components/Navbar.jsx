import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ transparent = false }) => {
  return (
    <nav className={`w-full transition-all duration-300 ${transparent ? 'bg-transparent absolute top-0 left-0 right-0 z-10' : 'bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Link to="/" className="group flex items-center outline-none">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-zinc-800 shadow-sm rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className={`text-3xl font-extrabold tracking-tight transition-colors duration-300 ${transparent ? 'text-white drop-shadow-md group-hover:text-gray-200' : 'text-black group-hover:text-zinc-700'}`}>
                RideSync
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
