import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-web-green-600 to-web-green-500 text-white hover:from-web-green-700 hover:to-web-green-600 hover:scale-105 hover:shadow-xl hover:shadow-web-green-500/30 focus:ring-web-green-500',
    secondary: 'bg-neutral-800/50 backdrop-blur-sm text-web-green-100 border border-web-green-500/20 hover:bg-neutral-700/50 hover:border-web-green-400/40 hover:scale-105',
    ghost: 'text-web-green-400 hover:text-web-green-300 hover:bg-web-green-500/10'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      ref={ref}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
