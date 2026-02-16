import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ transparent = false }) => {
  return (
    <nav className={`${transparent ? 'bg-transparent absolute top-0 left-0 right-0 z-10' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${transparent ? 'text-white' : 'text-black'}`}>QuickRide</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar