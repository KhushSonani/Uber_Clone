import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Navbar from '../components/Navbar'

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicleType: '',
    vehicleNumber: '',
    vehicleColor: '',
    vehicleModel: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Captain Signup Form Data:', formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-10">
            <div className="mb-10 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-2">Become a Captain</h2>
              <p className="text-gray-500 text-lg">Start earning on your own schedule</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-extrabold text-black mb-6 flex items-center">
                  <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold shadow-sm">1</div>
                  Personal Information
                </h3>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="First Name"
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      icon={
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      }
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      icon={
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Details Section */}
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-extrabold text-black mb-6 flex items-center">
                  <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold shadow-sm">2</div>
                  Vehicle Details
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Vehicle Type<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 font-medium appearance-none shadow-sm"
                      >
                        <option value="" disabled className="text-gray-400">Select vehicle type</option>
                        <option value="car">🚗 Car</option>
                        <option value="suv">🚙 SUV</option>
                        <option value="bike">🏍️ Bike</option>
                        <option value="auto">🛺 Auto</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-1">
                      <Input
                        label="Vehicle Number"
                        type="text"
                        name="vehicleNumber"
                        placeholder="DL-01-AB-1234"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Input
                        label="Vehicle Model"
                        type="text"
                        name="vehicleModel"
                        placeholder="Honda City"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Input
                        label="Vehicle Color"
                        type="text"
                        name="vehicleColor"
                        placeholder="White"
                        value={formData.vehicleColor}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-black text-white hover:bg-zinc-800 transition-all duration-300 py-4 rounded-xl text-lg font-bold flex justify-center items-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Register as Captain
                </button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">
                Already registered?{' '}
                <Link to="/captain/login" className="text-black font-semibold hover:underline">
                  Sign In
                </Link>
              </p>

              <Link to="/rider/signup" className="text-sm text-gray-500 hover:text-black transition-colors font-medium">
                Want to ride? Sign up as Rider &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup