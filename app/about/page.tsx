'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

export default function About() {
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

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push the boundaries of what is possible in hotel management technology.',
    },
    {
      title: 'Reliability',
      description: 'Your data security and system uptime are our top priorities.',
    },
    {
      title: 'Hospitality',
      description: 'We understand and serve the hospitality industry with deep expertise.',
    },
    {
      title: 'Support',
      description: 'Dedicated support team available 24/7 to help you succeed.',
    },
  ]

  const stats = [
    { number: '500+', label: 'Hotels Trust Us' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '$10M+', label: 'Revenue Generated' },
    { number: '50K+', label: 'Guests Served Daily' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
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
              About <span className="text-accent">Suulp</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-foreground/70 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              We're revolutionizing hotel management with AI-powered solutions, intuitive interfaces, and unwavering commitment to our customers' success.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/hotel-team.jpg"
                alt="Our team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold font-serif text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                Founded in 2020 by hospitality industry veterans, Suulp emerged from a simple observation: hotel management software was outdated and disconnected from modern guest expectations.
              </p>
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                We set out to build something different. A platform that combines the best of CMS, CRM, and cutting-edge AI technology, designed specifically for how hotels operate today.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Today, Suulp powers hotel operations across 50+ countries, helping teams streamline workflows, reduce costs, and create unforgettable guest experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              By The Numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-foreground/60">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-card border border-secondary/30 hover:border-accent/50 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold text-accent mb-4">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 md:py-32 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              Why Choose Suulp?
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              'Industry-leading uptime guarantee (99.9%)',
              'GDPR and SOC 2 compliant',
              'Dedicated 24/7 support team',
              'API access for custom integrations',
              'White-label options available',
              'Seamless migration from legacy systems',
              'Regular feature updates and improvements',
              'Free training and onboarding',
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-secondary/30"
              >
                <CheckCircle className="text-accent flex-shrink-0 mt-1" size={20} />
                <span className="text-foreground/80">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
