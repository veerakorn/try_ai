import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label,
  error,
  type = 'text',
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-web-green-100">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm border rounded-lg
          text-white placeholder-neutral-400
          focus:outline-none focus:ring-2 focus:border-transparent
          transition-all duration-300
          ${error 
            ? 'border-red-500 focus:ring-red-500/50' 
            : 'border-web-green-500/30 focus:ring-web-green-500/50 focus:border-web-green-400'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm animate-pulse">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
