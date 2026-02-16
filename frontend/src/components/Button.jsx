import React from 'react'

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = true, 
  disabled = false,
  size = 'md'
}) => {
  const baseClasses = 'font-semibold rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center'
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-4 text-base',
    lg: 'px-8 py-5 text-lg'
  }

  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-900 focus:ring-black disabled:bg-gray-300 disabled:text-gray-500',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-50 focus:ring-black disabled:border-gray-300 disabled:text-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400'
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  )
}

export default Button