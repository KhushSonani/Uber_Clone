import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import api from '../api'
import { useNavigate } from 'react-router-dom'



const RiderLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate();
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
      const response = await api.post('/users/login', formData);
      const token = response.data.accessToken;
      localStorage.setItem('accessToken', token);
      console.log("Login Successful"); 
      navigate('/dashboard');
    }catch(err){
      console.error("Login Failed:", err.response ? err.response.data : err.message);
    }
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log('Rider Login Form Data:', formData)
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-gray-600 font-medium">Remember me</span>
                </label>
                <a href="#" className="text-sm text-black font-semibold hover:underline">
                  Forgot?
                </a>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg">
                  Sign In
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                New to QuickRide?{' '}
                <Link to="/rider/signup" className="text-black font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <Link to="/captain/login" className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                Are you a driver? Sign in as Captain →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiderLogin