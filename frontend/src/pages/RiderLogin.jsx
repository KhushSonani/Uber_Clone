import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
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

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-sm">
        <div className="p-6 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black shadow-sm">
              <span className="text-sm font-semibold">RS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">Welcome back</h2>
            <p className="text-sm text-zinc-400">Sign in to continue with RideSync</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
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
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  icon={
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-700 bg-black text-indigo-600 focus:ring-indigo-600 cursor-pointer shadow-sm"
                />
                <span className="ml-2 text-xs text-zinc-400 font-medium group-hover:text-zinc-200 transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-xs text-zinc-400 font-medium hover:text-zinc-200 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full min-h-12 rounded-2xl bg-indigo-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 flex items-center justify-center"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-col space-y-3 text-center">
            <p className="text-xs text-zinc-400">
              New here?{' '}
              <Link to="/rider/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Sign up as rider
              </Link>
            </p>

            <p className="text-xs text-zinc-400">
              Want to drive?{' '}
              <Link to="/captain/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Sign up as captain
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiderLogin