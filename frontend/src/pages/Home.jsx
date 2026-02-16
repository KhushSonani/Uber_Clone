import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Navbar from '../components/Navbar'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar transparent={true} />
      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your ride, on demand
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Request a ride, hop in, and go. Choose from multiple ride options for any occasion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ride with us</h3>
              <p className="text-gray-600 mb-6">Book rides anytime, anywhere</p>
              <div className="space-y-3">
                <Button onClick={() => navigate('/rider/signup')} variant="primary">
                  Sign Up
                </Button>
                <Button onClick={() => navigate('/rider/login')} variant="secondary">
                  Log In
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Drive with us</h3>
              <p className="text-gray-600 mb-6">Earn money on your schedule</p>
              <div className="space-y-3">
                <Button onClick={() => navigate('/captain/signup')} variant="primary">
                  Sign Up
                </Button>
                <Button onClick={() => navigate('/captain/login')} variant="secondary">
                  Log In
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-white">
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-400">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home