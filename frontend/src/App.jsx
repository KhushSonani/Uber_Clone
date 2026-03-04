import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RiderSignup from './pages/RiderSignup'
import RiderLogin from './pages/RiderLogin'
import CaptainSignup from './pages/DriverSignup'
import CaptainLogin from './pages/DriverLogin'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'

function App() {
  const { loading } = useAuth();
  if(loading){
    return null;
  }
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rider/signup" element={<RiderSignup />} />
        <Route path="/rider/login" element={<RiderLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App