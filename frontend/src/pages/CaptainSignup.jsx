import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Become a Captain</h2>
              <p className="text-gray-500 mt-2">Start earning on your own schedule</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">1</div>
                  Personal Information
                </h3>
                <div className="space-y-4 ml-11">
                  <div className="grid grid-cols-2 gap-4">
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
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
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

              <div className="pt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">2</div>
                  Vehicle Details
                </h3>
                <div className="space-y-4 ml-11">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Vehicle Type<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 text-gray-900"
                    >
                      <option value="">Select vehicle type</option>
                      <option value="car">🚗 Car</option>
                      <option value="suv">🚙 SUV</option>
                      <option value="bike">🏍️ Bike</option>
                      <option value="auto">🛺 Auto</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Vehicle Number"
                      type="text"
                      name="vehicleNumber"
                      placeholder="DL-01-AB-1234"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      required
                    />
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

              <div className="pt-4">
                <Button type="submit" variant="primary" size="lg">
                  Register as Captain
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already registered?{' '}
                <Link to="/captain/login" className="text-black font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <Link to="/rider/signup" className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                Want to ride? Sign up as Rider →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup