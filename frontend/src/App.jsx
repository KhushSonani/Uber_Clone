import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RiderSignup from './pages/RiderSignup'
import RiderLogin from './pages/RiderLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
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