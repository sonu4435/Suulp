'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import {
  BarChart3,
  Zap,
  Shield,
  Headphones,
  Users,
  Sparkles,
  Lock,
  Cloud,
  Smartphone,
  Gauge,
  Puzzle,
  Lightbulb,
} from 'lucide-react'

export default function Features() {
  const mainFeatures = [
    {
      icon: BarChart3,
      title: 'Advanced CMS',
      description: 'Manage your entire property information, amenities, and content with our intuitive content management system.',
      details: [
        'Multi-language support',
        'Real-time content updates',
        'SEO optimization tools',
        'Media library management',
      ],
    },
    {
      icon: Users,
      title: 'Powerful CRM',
      description: 'Build lasting relationships with guests through advanced customer relationship management tools.',
      details: [
        'Guest profiles and history',
        'Personalized communications',
        'Loyalty program integration',
        'Guest feedback analysis',
      ],
    },
    {
      icon: Headphones,
      title: 'AI Support Agents',
      description: 'Provide 24/7 support with voice-enabled AI agents that understand guest needs.',
      details: [
        'Multi-language support',
        'Natural language processing',
        'Escalation to human staff',
        'Integration with messaging apps',
      ],
    },
  ]

  const additionalFeatures = [
    {
      icon: Zap,
      title: 'Real-time Analytics',
      description: 'Get instant insights into your operations with comprehensive dashboards.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with international standards.',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Manage your hotel from anywhere with our native mobile applications.',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Scalable, reliable infrastructure that grows with your business.',
    },
    {
      icon: Lock,
      title: 'Access Control',
      description: 'Role-based permissions and detailed audit logs for security.',
    },
    {
      icon: Puzzle,
      title: 'Integrations',
      description: 'Connect with your favorite tools and services seamlessly.',
    },
    {
      icon: Gauge,
      title: 'Performance Monitoring',
      description: 'Real-time monitoring of system performance and usage metrics.',
    },
    {
      icon: Lightbulb,
      title: 'AI Insights',
      description: 'Machine learning-powered recommendations to optimize operations.',
    },
  ]

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
      transition: { duration: 0.8 },
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6"
            >
              Powerful <span className="text-accent">Features</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-foreground/70 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Everything you need to manage your hotel operations and delight your guests.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainFeatures.map((feature, i) => {
              const Icon = feature.icon
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'lg:grid-cols-2 lg:[&>*:nth-child(1)]:order-2' : ''
                  }`}
                >
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-accent/20">
                        <Icon className="text-accent" size={32} />
                      </div>
                      <h2 className="text-3xl font-bold font-serif text-foreground">
                        {feature.title}
                      </h2>
                    </div>

                    <p className="text-lg text-foreground/70 mb-8">
                      {feature.description}
                    </p>

                    <ul className="space-y-4">
                      {feature.details.map((detail, di) => (
                        <motion.li
                          key={di}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: di * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 text-foreground/80"
                        >
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/30 text-accent flex-shrink-0 mt-1">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                          </span>
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`relative h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center ${
                      !isEven ? 'lg:col-start-1' : ''
                    }`}
                  >
                    <Icon className="text-accent/30" size={120} />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 md:py-32 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              More Features You'll Love
            </h2>
            <p className="text-xl text-foreground/60">
              A complete suite of tools to run your hotel like never before
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-card border border-secondary/30 hover:border-accent/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <Icon className="text-accent mb-4" size={32} />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              Built on Cutting-Edge Technology
            </h2>
            <p className="text-xl text-foreground/70 mb-12">
              We use the latest technologies to ensure speed, security, and reliability
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Supabase', 'GSAP'].map(
                (tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-lg bg-card border border-secondary/30 text-foreground/80 font-semibold"
                  >
                    {tech}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
