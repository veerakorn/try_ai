import { useState } from 'react'
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน'
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any valid email/password
      console.log('Login successful:', formData)
      
      // Navigate to home page
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      setErrors({ submit: 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-web-green-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-web-green-500/5 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-web-green-400/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 169, 80, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 169, 80, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl p-8 border border-web-green-500/20 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-web-green-400 to-web-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-web-green-500/30">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-web-green-400 to-web-green-600 bg-clip-text text-transparent mb-2">
              เข้าสู่ระบบ
            </h2>
            <p className="text-neutral-300 text-sm">
              ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-neutral-200 text-sm font-medium mb-2">
                อีเมล
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-neutral-700/50 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-error focus:ring-error/50' 
                      : 'border-neutral-600 focus:ring-web-green-500/50 focus:border-web-green-500'
                  }`}
                  placeholder="example@email.com"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-neutral-400">📧</span>
                </div>
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-1 animate-pulse">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-neutral-200 text-sm font-medium mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-neutral-700/50 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-error focus:ring-error/50' 
                      : 'border-neutral-600 focus:ring-web-green-500/50 focus:border-web-green-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-web-green-400 transition-colors"
                >
                  <span>{showPassword ? '🙈' : '👁️'}</span>
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-1 animate-pulse">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-web-green-500 bg-neutral-700 border-neutral-600 rounded focus:ring-web-green-500 focus:ring-2"
                />
                <span className="ml-2">จดจำฉันไว้</span>
              </label>
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-web-green-400 hover:text-web-green-300 transition-colors"
              >
                ลืมรหัสผ่าน?
              </button>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-error text-sm text-center">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform ${
                isLoading
                  ? 'bg-neutral-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-web-green-600 to-web-green-500 hover:from-web-green-500 hover:to-web-green-400 hover:scale-105 active:scale-95 shadow-lg shadow-web-green-500/30'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  กำลังเข้าสู่ระบบ...
                </div>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-neutral-800 text-neutral-400">หรือ</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full py-3 px-4 bg-neutral-700/50 border border-neutral-600 rounded-lg text-neutral-200 hover:bg-neutral-600/50 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <span className="mr-2">🔍</span>
                เข้าสู่ระบบด้วย Google
              </button>
              <button
                type="button"
                className="w-full py-3 px-4 bg-neutral-700/50 border border-neutral-600 rounded-lg text-neutral-200 hover:bg-neutral-600/50 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <span className="mr-2">📘</span>
                เข้าสู่ระบบด้วย Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-neutral-400">ยังไม่มีบัญชี? </span>
              <button
                onClick={() => navigate('/register')}
                className="text-web-green-400 hover:text-web-green-300 transition-colors font-medium"
              >
                สมัครสมาชิก
              </button>
            </div>

          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-neutral-400 hover:text-web-green-400 transition-colors"
          >
            <span className="mr-2">←</span>
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
