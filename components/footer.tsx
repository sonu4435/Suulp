'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-background border-t border-secondary/20">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-2xl font-bold font-serif text-accent mb-4">
              Suulp
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Advanced SaaS platform for hotel management with AI-powered support and modern CMS/CRM tools.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-foreground mb-6">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  Integrations
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                  Careers
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-foreground mb-6">Connect</h4>
            <div className="flex gap-4">
              <motion.a
                href="mailto:hello@suulp.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary/20 text-accent hover:bg-accent/20 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary/20 text-accent hover:bg-accent/20 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary/20 text-accent hover:bg-accent/20 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-secondary/20 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              © 2026 Suulp. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-accent transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
