'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, Loader, ArrowRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    hotelName: '',
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.hotelName) {
      setError('Please fill in all required fields.')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      setLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service.')
      setLoading(false)
      return
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            hotel_name: formData.hotelName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message || 'Failed to create account.')
      } else {
        // Redirect to login or onboarding
        router.push('/login?message=Check your email to confirm your account')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-4xl font-bold font-serif text-foreground mb-2">
                Join <span className="text-accent">Suulp</span>
              </h1>
              <p className="text-foreground/60">Start managing your hotel like never before</p>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-secondary/30 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              {/* Hotel Name */}
              <div>
                <label htmlFor="hotelName" className="block text-sm font-medium text-foreground mb-2">
                  Hotel Name
                </label>
                <input
                  type="text"
                  id="hotelName"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  placeholder="Your Hotel Name"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-secondary/30 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-secondary/30 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-secondary/30 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-secondary/30 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-secondary/30 text-accent focus:ring-accent mt-1"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-foreground/70">
                  I agree to the{' '}
                  <Link href="#" className="text-accent hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg bg-accent text-primary font-semibold hover:bg-accent/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-foreground/60">
                Already have an account?{' '}
                <Link href="/login" className="text-accent hover:underline font-medium">
                  Login here
                </Link>
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 text-center"
            >
              <p className="text-sm text-foreground/70 mb-3">
                <span className="font-semibold text-accent">14-day free trial</span> - No credit card required
              </p>
              <p className="text-xs text-foreground/50">
                Plus 24/7 support and all features included
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
