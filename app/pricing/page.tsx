"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ROYAL_CSS } from "@/components/shared-styles";
import {
  LiquidCursor,
  NoiseOverlay,
  RoyalNav,
  RoyalFooter,
  ProgressBar,
  SectionTag,
  Mag,
} from "@/components/shared-components";
import { useTheme } from "@/components/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "Spark",
    badge: null,
    monthlyPrice: 29,
    annualPrice: 290,
    desc: "For individuals & solo founders starting out.",
    features: [
      "1 website",
      "AI builder (3/mo)",
      "Drag & drop CMS",
      "Basic CRM (500 contacts)",
      "Suulp subdomain",
      "5 GB storage",
      "Email support",
    ],
    notIncluded: [
      "Custom domain",
      "Mobile apps",
      "Voice AI",
      "White-label",
      "API access",
    ],
    cta: "Start Free Trial",
    hi: false,
  },
  {
    name: "Sovereign",
    badge: "Most Popular",
    monthlyPrice: 99,
    annualPrice: 990,
    desc: "For growing businesses that need the full stack.",
    features: [
      "5 websites",
      "AI builder (unlimited)",
      "Full CMS + media library",
      "Advanced CRM & CSM (10K contacts)",
      "Custom domain + SSL",
      "Connected database",
      "50 GB storage",
      "AI Voice Concierge (ElevenLabs)",
      "Mobile app generation",
      "Priority support",
      "API access",
    ],
    notIncluded: ["White-label", "Dedicated manager"],
    cta: "Claim Your Reign",
    hi: true,
  },
  {
    name: "Dynasty",
    badge: null,
    monthlyPrice: null,
    annualPrice: null,
    desc: "For agencies & enterprises building at scale.",
    features: [
      "Unlimited websites",
      "AI builder (unlimited)",
      "White-label platform",
      "Unlimited CRM contacts",
      "Unlimited custom domains",
      "Unlimited storage",
      "Multi-model AI concierge",
      "Native iOS & Android apps",
      "Custom integrations",
      "Dedicated account manager",
      "SLA 99.99% uptime",
      "24/7 phone support",
      "Custom feature requests",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    hi: false,
  },
];

const COMPARE_ROWS = [
  { feature: "Websites", spark: "1", sovereign: "5", dynasty: "Unlimited" },
  {
    feature: "AI Website Builder",
    spark: "3/mo",
    sovereign: "Unlimited",
    dynasty: "Unlimited",
  },
  {
    feature: "CMS",
    spark: "Basic",
    sovereign: "Advanced",
    dynasty: "Full + White-label",
  },
  {
    feature: "CRM Contacts",
    spark: "500",
    sovereign: "10,000",
    dynasty: "Unlimited",
  },
  { feature: "Custom Domain", spark: false, sovereign: true, dynasty: true },
  {
    feature: "Connected Database",
    spark: false,
    sovereign: true,
    dynasty: true,
  },
  {
    feature: "Mobile App Generation",
    spark: false,
    sovereign: true,
    dynasty: true,
  },
  {
    feature: "AI Voice Concierge",
    spark: false,
    sovereign: true,
    dynasty: true,
  },
  { feature: "Code Export", spark: true, sovereign: true, dynasty: true },
  { feature: "API Access", spark: false, sovereign: true, dynasty: true },
  { feature: "White-label", spark: false, sovereign: false, dynasty: true },
  {
    feature: "Dedicated Manager",
    spark: false,
    sovereign: false,
    dynasty: true,
  },
];

const FAQS = [
  {
    q: "Can I build any type of business website?",
    a: "Absolutely. From e-commerce stores to SaaS landing pages, restaurants, portfolios, agencies, and everything in between — Suulp's AI builder and CMS handle any industry or use case.",
  },
  {
    q: 'What does "code export" mean?',
    a: "You can export your entire site as clean, production-ready Next.js code at any time. We believe you should always own your work — no vendor lock-in, ever.",
  },
  {
    q: "How does the AI Voice Concierge work?",
    a: "We integrate with ElevenLabs to create a human-sounding AI agent trained on your business data. It handles customer queries via chat and voice, and intelligently escalates to your team when needed.",
  },
  {
    q: "Can I connect my own domain?",
    a: "Yes — from the Sovereign plan onwards. Point your DNS records to Suulp, and we handle SSL, CDN, and everything else automatically.",
  },
  {
    q: "What happens if I exceed my plan limits?",
    a: "You'll be notified before hitting any limits and given the option to upgrade. We never cut off your site — we just pause new AI generation requests until you upgrade.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan starts with a 14-day free trial. No credit card required. Full access to all features in your chosen plan.",
  },
];

export default function PricingPage() {
  const { isDark } = useTheme();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".plan-card",
        { opacity: 0, y: 80, scale: 0.94 },
        {
          scrollTrigger: {
            trigger: ".plans-grid",
            start: "top 80%",
            end: "top 30%",
            scrub: 0.8,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
        },
      );
      gsap.to(".mq", { x: "-50%", duration: 28, repeat: -1, ease: "linear" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ROYAL_CSS }} />
      <div className={isDark ? "dk" : "lk"}>
        <NoiseOverlay />
        <LiquidCursor />
        <ProgressBar scaleX={scaleX} />
        <RoyalNav />

        <main ref={containerRef} className="page-wrap">
          {/* HERO */}
          <section
            className="hero-pad"
            style={{ maxWidth: 1600, margin: "0 auto", position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                right: "6%",
                top: "20%",
                opacity: 0.07,
              }}
              className="fl1"
            >
              <div
                style={{
                  width: "clamp(160px,22vw,280px)",
                  height: "clamp(160px,22vw,280px)",
                  border: "1px solid var(--cg)",
                  borderRadius: "50%",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <SectionTag label="Simple Pricing" />
            </motion.div>

            {["Invest in Your", "Business Empire."].map((line, i) => (
              <div key={i} className="lo">
                <motion.h1
                  className={i === 1 ? "dp gg" : isDark ? "dp text-amber-50 italic" : "dp"}
                  style={{
                    fontSize: "clamp(2.5rem,8vw,110px)",
                    lineHeight: 0.9,
                  }}
                  initial={{ y: 110, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5 + i * 0.15,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              style={{
                fontSize: ".9rem",
                color: "var(--fg2)",
                lineHeight: 1.9,
                maxWidth: 440,
                marginTop: 28,
              }}
            >
              No hidden fees. No surprises. Every plan includes a 14-day free
              trial and full access to your chosen tier.
            </motion.p>

            {/* Annual toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: 40,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: ".75rem",
                  color: !annual ? "var(--cg)" : "var(--fg3)",
                  letterSpacing: ".1em",
                  transition: "color .3s",
                }}
              >
                Monthly
              </span>
              <button
                data-hover="true"
                onClick={() => setAnnual(!annual)}
                style={{
                  width: 52,
                  height: 28,
                  background: annual ? "rgba(191,160,106,0.25)" : "var(--cbg)",
                  border: "1px solid var(--brd)",
                  borderRadius: 14,
                  position: "relative",
                  transition: "all .4s",
                }}
              >
                <motion.div
                  animate={{ x: annual ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    position: "absolute",
                    top: 2,
                    width: 22,
                    height: 22,
                    background: "var(--cg)",
                    borderRadius: "50%",
                  }}
                />
              </button>
              <span
                style={{
                  fontSize: ".75rem",
                  color: annual ? "var(--cg)" : "var(--fg3)",
                  letterSpacing: ".1em",
                  transition: "color .3s",
                }}
              >
                Annual <span style={{ color: "var(--cg)" }}>— Save 17%</span>
              </span>
            </motion.div>
          </section>

          {/* MARQUEE */}
          <div
            style={{
              borderTop: "1px solid var(--brd)",
              borderBottom: "1px solid var(--brd)",
              padding: "12px 0",
              overflow: "hidden",
            }}
          >
            <div className="mq">
              {[...Array(6)].flatMap((_, ri) =>
                [
                  "AI Builder",
                  "Custom Domain",
                  "Voice AI",
                  "Mobile Apps",
                  "CMS",
                  "CRM",
                  "Code Export",
                  "Database",
                ].map((txt, i) => (
                  <div
                    key={`${ri}-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      padding: "0 28px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: ".6rem",
                        letterSpacing: ".42em",
                        textTransform: "uppercase",
                        color: "var(--fg3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {txt}
                    </span>
                    <svg width="4" height="4">
                      <circle
                        cx="2"
                        cy="2"
                        r="2"
                        fill="var(--cg)"
                        opacity=".35"
                      />
                    </svg>
                  </div>
                )),
              )}
            </div>
          </div>

          {/* PLANS */}
          <section
            className="sec-pad"
            style={{ maxWidth: 1600, margin: "0 auto" }}
          >
            <div className="plans-grid price-grid">
              {PLANS.map((plan, i) => (
                <div
                  key={i}
                  className="plan-card"
                  style={{
                    background: plan.hi
                      ? "linear-gradient(160deg,var(--bg2),var(--bg))"
                      : "var(--bg)",
                    padding: "clamp(28px,4vw,40px) clamp(22px,3.5vw,36px)",
                    position: "relative",
                  }}
                >
                  {plan.hi && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background:
                          "linear-gradient(90deg,transparent,var(--cg),transparent)",
                      }}
                    />
                  )}
                  {plan.badge && (
                    <div
                      style={{
                        display: "inline-block",
                        marginBottom: 20,
                        padding: "5px 12px",
                        border: "1px solid var(--brd)",
                        borderRadius: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: ".55rem",
                          letterSpacing: ".32em",
                          textTransform: "uppercase",
                          color: "var(--cg)",
                        }}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <h3
                    className="dp"
                    style={{
                      fontSize: 20,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "var(--fg)",
                      opacity: 0.7,
                      marginBottom: 8,
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontSize: ".72rem",
                      color: "var(--fg3)",
                      marginBottom: 28,
                      lineHeight: 1.6,
                    }}
                  >
                    {plan.desc}
                  </p>

                  <div style={{ marginBottom: 32 }}>
                    {plan.monthlyPrice ? (
                      <>
                        <span
                          className="dp gg"
                          style={{ fontSize: 52, fontWeight: 600 }}
                        >
                          $
                          {annual
                            ? Math.round((plan.annualPrice || 0) / 12)
                            : plan.monthlyPrice}
                        </span>
                        <span
                          style={{
                            fontSize: ".72rem",
                            color: "var(--fg3)",
                            marginLeft: 6,
                          }}
                        >
                          /mo
                        </span>
                        {annual && (
                          <p
                            style={{
                              fontSize: ".65rem",
                              color: "var(--cg)",
                              marginTop: 4,
                              opacity: 0.7,
                            }}
                          >
                            Billed ${plan.annualPrice}/year
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <span
                          className="dp gg"
                          style={{ fontSize: 52, fontWeight: 600 }}
                        >
                          Custom
                        </span>
                        <p
                          style={{
                            fontSize: ".65rem",
                            color: "var(--fg3)",
                            marginTop: 4,
                          }}
                        >
                          Contact us for enterprise pricing
                        </p>
                      </>
                    )}
                  </div>

                  <Mag style={{ display: "block", marginBottom: 28 }}>
                    <Link
                      href={plan.monthlyPrice ? "/signup" : "/contact"}
                      style={{ display: "block" }}
                    >
                      <button
                        className={plan.hi ? "bg-btn" : "bo-btn"}
                        style={{
                          width: "100%",
                          padding: "14px 0",
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        {plan.cta} <ArrowRight size={13} />
                      </button>
                    </Link>
                  </Mag>

                  <div
                    style={{
                      height: 1,
                      background: "var(--brd)",
                      marginBottom: 24,
                    }}
                  />

                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      marginBottom: plan.notIncluded.length ? 24 : 0,
                    }}
                  >
                    {plan.features.map((f, fi) => (
                      <li
                        key={fi}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Check
                          size={13}
                          color="var(--cg)"
                          strokeWidth={2}
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          style={{ fontSize: ".78rem", color: "var(--fg2)" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {plan.notIncluded.length > 0 && (
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {plan.notIncluded.map((f, fi) => (
                        <li
                          key={fi}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <X
                            size={13}
                            color="var(--fg3)"
                            strokeWidth={2}
                            style={{ flexShrink: 0 }}
                          />
                          <span
                            style={{ fontSize: ".78rem", color: "var(--fg3)" }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* COMPARISON */}
          <section className="sec-pad" style={{ background: "var(--bg2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <SectionTag label="Compare" />
              <motion.h2
                className="dp"
                style={{
                  fontSize: "clamp(2rem,4vw,52px)",
                  lineHeight: 1.05,
                  color: "var(--fg)",
                  marginBottom: 48,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                Side-by-Side <span className="italic gg">Comparison</span>
              </motion.h2>
              <div className="compare-wrap">
                <table>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--brd)" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "clamp(10px,2vw,16px) clamp(12px,2vw,20px)",
                          fontFamily: "'DM Sans'",
                          fontSize: ".7rem",
                          letterSpacing: ".25em",
                          textTransform: "uppercase",
                          color: "var(--fg3)",
                          fontWeight: 400,
                        }}
                      >
                        Feature
                      </th>
                      {["Spark", "Sovereign", "Dynasty"].map((n, i) => (
                        <th
                          key={i}
                          style={{
                            textAlign: "center",
                            padding:
                              "clamp(10px,2vw,16px) clamp(12px,2vw,20px)",
                            fontFamily: "'Playfair Display'",
                            fontSize: 16,
                            color: i === 1 ? "var(--cg)" : "var(--fg)",
                            fontWeight: 600,
                          }}
                        >
                          {n}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((row, i) => (
                      <tr
                        key={i}
                        className="compare-row"
                        style={{
                          borderBottom: "1px solid rgba(191,160,106,.05)",
                          transition: "background .3s",
                        }}
                      >
                        <td
                          style={{
                            padding: "14px clamp(12px,2vw,20px)",
                            fontSize: ".82rem",
                            color: "var(--fg2)",
                          }}
                        >
                          {row.feature}
                        </td>
                        {([row.spark, row.sovereign, row.dynasty] as any[]).map(
                          (val, ci) => (
                            <td
                              key={ci}
                              style={{
                                textAlign: "center",
                                padding: "14px clamp(12px,2vw,20px)",
                              }}
                            >
                              {typeof val === "boolean" ? (
                                val ? (
                                  <Check
                                    size={16}
                                    color="var(--cg)"
                                    strokeWidth={2}
                                    style={{ margin: "0 auto" }}
                                  />
                                ) : (
                                  <X
                                    size={16}
                                    color="var(--fg3)"
                                    strokeWidth={2}
                                    style={{ margin: "0 auto" }}
                                  />
                                )
                              ) : (
                                <span
                                  style={{
                                    fontSize: ".78rem",
                                    color:
                                      ci === 1 ? "var(--cg)" : "var(--fg2)",
                                  }}
                                >
                                  {val}
                                </span>
                              )}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section
            className="sec-pad"
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            <SectionTag label="FAQ" />
            <motion.h2
              className="dp"
              style={{
                fontSize: "clamp(2rem,4vw,52px)",
                lineHeight: 1.05,
                color: "var(--fg)",
                marginBottom: 48,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Questions <span className="italic gg">Answered</span>
            </motion.h2>
            <div>
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  className="faq-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    data-hover="true"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "22px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      textAlign: "left",
                      gap: 16,
                    }}
                  >
                    <span
                      className="dp"
                      style={{
                        fontSize: "clamp(15px,2vw,18px)",
                        color: "var(--fg)",
                      }}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        color: "var(--cg)",
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ overflow: "hidden", paddingBottom: 22 }}
                      >
                        <p
                          style={{
                            color: "var(--fg2)",
                            fontSize: ".87rem",
                            lineHeight: 1.9,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            className="sec-pad"
            style={{
              textAlign: "center",
              background: "var(--bg2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {[280, 420, 560].map((sz, ri) => (
              <div
                key={ri}
                style={{
                  position: "absolute",
                  width: sz,
                  height: sz,
                  border: `1px solid rgba(191,160,106,${0.05 + ri * 0.01})`,
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  marginLeft: -sz / 2,
                  marginTop: -sz / 2,
                }}
                className={ri % 2 === 0 ? "rs" : "rsr"}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <h2
                className="dp"
                style={{
                  fontSize: "clamp(2rem,4.5vw,58px)",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  marginBottom: 20,
                }}
              >
                14 Days Free. <span className="italic gg">No Card.</span> No
                Risk.
              </h2>
              <p
                style={{
                  color: "var(--fg2)",
                  fontSize: ".87rem",
                  marginBottom: 36,
                  lineHeight: 1.85,
                }}
              >
                Start building your business empire today.
              </p>
              <div className="cta-btns">
                <Mag>
                  <Link href="/signup">
                    <button
                      className="bg-btn"
                      style={{
                        padding: "16px 56px",
                        borderRadius: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      Start Free Trial <ArrowRight size={14} />
                    </button>
                  </Link>
                </Mag>
              </div>
            </motion.div>
          </section>

          <RoyalFooter />
        </main>
      </div>
    </>
  );
}
