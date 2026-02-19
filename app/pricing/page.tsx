'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small boutique hotels',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        'Up to 50 rooms',
        'Basic CMS features',
        'Simple CRM',
        'Email support',
        'Analytics dashboard',
        'Single user account',
        'Monthly reports',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'For growing hotel chains',
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        'Up to 500 rooms',
        'Advanced CMS features',
        'Full-featured CRM',
        'Priority support',
        'Advanced analytics',
        'Team accounts (5 users)',
        'API access',
        'AI support agents',
        'Weekly reports',
        'Custom integrations',
      ],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large international hotel chains',
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Unlimited rooms',
        'Full platform access',
        'Dedicated support team',
        'Custom integrations',
        'Unlimited users',
        'White-label options',
        'Advanced AI features',
        'SLA guarantee 99.99%',
        'Custom training programs',
        'Multi-region deployment',
      ],
      cta: 'Contact Sales',
      highlighted: false,
      custom: true,
    },
  ]

  const comparisonFeatures = [
    'Room Management',
    'Guest Profiles',
    'Booking Integration',
    'Email Marketing',
    'SMS Notifications',
    'Voice AI Support',
    'Multi-language Support',
    'Mobile Apps',
    'Advanced Reporting',
    'API Access',
    'White-label Option',
    'Dedicated Account Manager',
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
              Simple, <span className="text-accent">Transparent</span> Pricing
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Choose the perfect plan for your hotel. No hidden fees, no surprises.
            </motion.p>

            {/* Toggle */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center gap-4 mb-16"
            >
              <span className={`text-sm font-medium ${!isAnnual ? 'text-accent' : 'text-foreground/60'}`}>
                Monthly
              </span>
              <motion.button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-8 bg-secondary/40 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-accent rounded-full"
                  animate={{
                    x: isAnnual ? 24 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-accent' : 'text-foreground/60'}`}>
                Annual <span className="text-accent text-xs">(Save 17%)</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-accent/20 to-secondary/20 border-2 border-accent shadow-2xl md:scale-105'
                    : 'bg-card border border-secondary/30 hover:border-accent/50'
                }`}
                whileHover={{ y: -10 }}
              >
                {plan.highlighted && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-accent text-primary rounded-full text-sm font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    MOST POPULAR
                  </motion.div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-foreground/60 text-sm mb-8">{plan.description}</p>

                  {/* Pricing */}
                  <div className="mb-8">
                    {plan.custom ? (
                      <div>
                        <p className="text-4xl font-bold text-accent">Custom</p>
                        <p className="text-foreground/60 text-sm mt-2">Contact us for pricing</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-5xl font-bold text-accent">
                          ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-foreground/60 ml-2">
                          {isAnnual ? '/year' : '/month'}
                        </span>
                        {isAnnual && plan.annualPrice && (
                          <p className="text-sm text-accent/70 mt-2">
                            ${(plan.annualPrice / 12).toFixed(0)}/month billed annually
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link href="/signup" className="w-full mb-8">
                    <motion.button
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                        plan.highlighted
                          ? 'bg-accent text-primary hover:bg-accent/90'
                          : 'bg-secondary/30 text-foreground hover:bg-secondary/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </motion.button>
                  </Link>

                  {/* Features List */}
                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feature, fi) => (
                      <motion.li
                        key={fi}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: fi * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <Check className="text-accent flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 md:py-32 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-foreground/60">
              Compare plans side-by-side to find the right fit
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary/30">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-accent">Professional</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.03 }}
                    viewport={{ once: true }}
                    className="border-b border-secondary/20 hover:bg-card/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-foreground/80">{feature}</td>
                    <td className="py-4 px-4 text-center">
                      {['Room Management', 'Guest Profiles', 'Booking Integration', 'Email Marketing'].includes(feature) ? (
                        <Check className="text-accent mx-auto" size={20} />
                      ) : (
                        <span className="text-foreground/40">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {feature !== 'White-label Option' && feature !== 'Dedicated Account Manager' ? (
                        <Check className="text-accent mx-auto" size={20} />
                      ) : (
                        <span className="text-foreground/40">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="text-accent mx-auto" size={20} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Absolutely! All plans come with a 14-day free trial. No credit card required.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No, there are no setup fees. You only pay the monthly or annual subscription cost.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-card border border-secondary/30"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-foreground/70">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
