import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProfile = async()=>{
    try {
      const response = await api.get('/users/profile');
      setUser(response.data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem('accessToken');
    }finally{
      setLoading(false);
    }
  };

  const login = (token) =>{
    localStorage.setItem('accessToken', token);
    fetchProfile();
  }
  const logout = () =>{
    localStorage.removeItem('accessToken');
    setUser(null);
  }

  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if(token){
      fetchProfile();
    }else{
      setLoading(false);
    }
  },[]);

  const value = {
    user,
    login,
    logout,
    loading
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}