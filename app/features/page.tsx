"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Zap,
  Shield,
  Database,
  Smartphone,
  ArrowRight,
  Layers,
  Users,
  Mic,
  Bot,
  BarChart3,
  Puzzle,
  Download,
  Paintbrush,
} from "lucide-react";
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

const PILLARS = [
  {
    icon: Paintbrush,
    title: "AI Website Builder",
    tag: "01 — Builder",
    desc: "Describe your vision in plain language. Our AI instantly generates a stunning, fully-structured website tailored to your business — complete with content, imagery placeholders, and code.",
    details: [
      "Natural language to live site",
      "Industry-specific templates",
      "Instant brand application",
      "Real-time collaborative editing",
    ],
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80",
  },
  {
    icon: Layers,
    title: "Visual Drag & Drop CMS",
    tag: "02 — CMS",
    desc: "A zero-code content management system so powerful it rivals enterprise solutions. Drag, drop, publish — your content team needs no developer, ever.",
    details: [
      "Visual page composer",
      "Multi-language content",
      "Media asset library",
      "Scheduled publishing & workflows",
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  },
  {
    icon: Users,
    title: "Intelligent CRM & CSM",
    tag: "03 — CRM / CSM",
    desc: "Know every customer deeply. Track interactions, automate follow-ups, manage support tickets, and deliver personalized experiences at scale — all from one unified interface.",
    details: [
      "360° customer profiles",
      "Automated pipeline flows",
      "Support ticket management",
      "Net Promoter Score tracking",
    ],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  },
  {
    icon: Bot,
    title: "AI Voice Concierge",
    tag: "04 — AI Support",
    desc: "Deploy a human-sounding AI customer support agent powered by ElevenLabs. Handles calls, chats, and queries 24/7 in any language — seamlessly escalating to your team when needed.",
    details: [
      "ElevenLabs voice synthesis",
      "Multi-language support",
      "Smart escalation routing",
      "Conversation analytics",
    ],
    img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=900&q=80",
  },
];

const EXTRAS = [
  {
    icon: Database,
    title: "Connected Database",
    desc: "Your website ships with a fully managed database. Build dynamic, data-driven pages without touching infrastructure.",
  },
  {
    icon: Smartphone,
    title: "Native Mobile Apps",
    desc: "Every site auto-generates companion iOS and Android apps — without writing a single line of mobile code.",
  },
  {
    icon: Globe,
    title: "Custom Domain & Hosting",
    desc: "Connect your domain in seconds. We handle SSL, CDN, scaling, and 99.9% uptime — you focus on your business.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "SOC 2 Type II certified. GDPR compliant. Bank-grade encryption across every layer of your stack.",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    desc: "Real-time dashboards tracking visitor behavior, conversions, and revenue. Predictive insights powered by ML.",
  },
  {
    icon: Puzzle,
    title: "Third-party Integrations",
    desc: "Connect Stripe, Zapier, Slack, HubSpot, and 200+ tools. Or build your own via our developer API.",
  },
  {
    icon: Download,
    title: "Export Your Code",
    desc: "Always own your work. Export clean, production-ready Next.js code at any time — no vendor lock-in, ever.",
  },
  {
    icon: Zap,
    title: "Instant Performance",
    desc: "Edge-deployed globally. Every site loads in under 500ms anywhere on earth, with automatic image optimization.",
  },
];

const PAGE_CSS = `
  .pillar-reverse{direction:rtl}
  .pillar-reverse>*{direction:ltr}
  @media(max-width:640px){.pillar-reverse{direction:ltr}}
  .extra-card{background:var(--bg);transition:border-color .4s,background .4s;}
  .extra-card:hover{border-color:rgba(191,160,106,.3);background:var(--bg2);}
  .marquee-track{display:flex;width:max-content;}
`;

export default function FeaturesPage() {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".extra-card",
        { opacity: 0, y: 60 },
        {
          scrollTrigger: {
            trigger: ".extras-grid",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1.2,
          },
          opacity: 1,
          y: 0,
          stagger: 0.07,
        },
      );
      gsap.to(".mq", { x: "-50%", duration: 28, repeat: -1, ease: "linear" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ROYAL_CSS + PAGE_CSS }} />
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
                right: "8%",
                top: "20%",
                opacity: 0.08,
              }}
              className="fl1"
            >
              <div
                style={{
                  width: "clamp(140px,22vw,300px)",
                  height: "clamp(140px,22vw,300px)",
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
              <SectionTag label="Platform Capabilities" />
            </motion.div>

            {["Everything", "You Need to", "Build & Grow."].map((line, i) => (
              <div key={i} className="lo">
                <motion.h1
                  className={
                    i === 0
                      ? "dp gg"
                      : i === 1
                        ? "dp"
                        : isDark
                          ? "dp text-amber-50 italic"
                          : "dp"
                  }
                  style={{
                    fontSize: "clamp(2.8rem,9vw,120px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                    color:
                      i === 1
                        ? `rgba(${isDark ? "242,237,227" : "23,18,10"},.87)`
                        : undefined,
                    fontStyle: i === 2 ? "italic" : undefined,
                    opacity: i === 2 ? 0.22 : undefined,
                  }}
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: i === 2 ? 0.22 : 1 }}
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
              transition={{ delay: 1.1, duration: 1 }}
              style={{
                fontSize: ".9rem",
                color: "var(--fg2)",
                lineHeight: 1.9,
                maxWidth: 500,
                marginTop: 36,
              }}
            >
              From AI website generation to voice-powered customer support —
              Suulp is the only platform your business will ever need.
            </motion.p>
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
                  "Drag & Drop CMS",
                  "CRM & CSM",
                  "Voice AI",
                  "Mobile Apps",
                  "Custom Domain",
                  "Connected DB",
                  "Code Export",
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

          {/* FEATURE PILLARS */}
          <section
            className="sec-pad"
            style={{ maxWidth: 1600, margin: "0 auto" }}
          >
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  className={`pillar-sec${i % 2 !== 0 ? " pillar-reverse" : ""}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 20,
                      }}
                    >
                      <Icon size={18} color="var(--cg)" strokeWidth={1.5} />
                      <span
                        style={{
                          fontSize: ".6rem",
                          letterSpacing: ".42em",
                          textTransform: "uppercase",
                          color: "var(--cg)",
                        }}
                      >
                        {pillar.tag}
                      </span>
                    </div>
                    <h2
                      className="dp"
                      style={{
                        fontSize: "clamp(1.6rem,3.5vw,48px)",
                        lineHeight: 1.1,
                        color: "var(--fg)",
                        marginBottom: 20,
                      }}
                    >
                      {pillar.title}
                    </h2>
                    <p
                      style={{
                        color: "var(--fg2)",
                        fontSize: ".87rem",
                        lineHeight: 1.9,
                        marginBottom: 32,
                        maxWidth: 460,
                      }}
                    >
                      {pillar.desc}
                    </p>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      {pillar.details.map((d, di) => (
                        <li
                          key={di}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                          }}
                        >
                          <div
                            style={{
                              height: 1,
                              width: 20,
                              background: "var(--cg)",
                              opacity: 0.55,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{ fontSize: ".82rem", color: "var(--fg2)" }}
                          >
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/signup"
                      style={{ display: "inline-block", marginTop: 36 }}
                    >
                      <button
                        className="bg-btn"
                        style={{
                          padding: "14px 36px",
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        Try It Free <ArrowRight size={13} />
                      </button>
                    </Link>
                  </div>
                  <div className="pillar-img img-scale">
                    <img
                      src={pillar.img}
                      alt={pillar.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top,var(--bg) 0%,transparent 60%)",
                      }}
                    />
                    <div
                      className="glass"
                      style={{
                        position: "absolute",
                        bottom: 24,
                        left: 24,
                        padding: "10px 16px",
                        borderRadius: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: ".6rem",
                          letterSpacing: ".3em",
                          textTransform: "uppercase",
                          color: "var(--cg)",
                        }}
                      >
                        {pillar.tag}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </section>

          {/* EXTRAS GRID */}
          <section className="sec-pad" style={{ background: "var(--bg2)" }}>
            <div style={{ maxWidth: 1600, margin: "0 auto" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 32,
                  marginBottom: 56,
                }}
              >
                <div>
                  <SectionTag label="And More" />
                  <motion.h2
                    className="dp"
                    style={{
                      fontSize: "clamp(2rem,4vw,56px)",
                      lineHeight: 1.05,
                      color: "var(--fg)",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    The Complete <span className="italic gg">Stack</span>
                  </motion.h2>
                </div>
                <p
                  style={{
                    color: "var(--fg2)",
                    fontSize: ".87rem",
                    lineHeight: 1.85,
                    maxWidth: 360,
                  }}
                >
                  Every piece of infrastructure your business needs — included,
                  configured, and ready to use on day one.
                </p>
              </div>
              <div
                className="extras-grid grid-3"
                style={{ background: "var(--brd)" }}
              >
                {EXTRAS.map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <div
                      key={i}
                      className="extra-card"
                      style={{
                        padding: "clamp(24px,4vw,36px) clamp(20px,3vw,32px)",
                      }}
                    >
                      <Icon
                        size={20}
                        color="var(--cg)"
                        strokeWidth={1.5}
                        style={{ marginBottom: 20 }}
                      />
                      <h3
                        className="dp"
                        style={{
                          fontSize: 18,
                          color: "var(--fg)",
                          marginBottom: 12,
                        }}
                      >
                        {e.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--fg2)",
                          fontSize: ".8rem",
                          lineHeight: 1.8,
                        }}
                      >
                        {e.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section
            className="sec-pad"
            style={{
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {[300, 450, 600].map((sz, ri) => (
              <div
                key={ri}
                style={{
                  position: "absolute",
                  width: sz,
                  height: sz,
                  border: `1px solid rgba(191,160,106,${0.04 + ri * 0.015})`,
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  marginLeft: -sz / 2,
                  marginTop: -sz / 2,
                }}
                className={ri % 2 === 0 ? "rs" : ""}
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
                  fontSize: "clamp(2rem,4.5vw,60px)",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  marginBottom: 20,
                }}
              >
                Ready to Build <span className="italic gg">Something</span>
                <br />
                Extraordinary?
              </h2>
              <p
                style={{
                  color: "var(--fg2)",
                  fontSize: ".87rem",
                  marginBottom: 36,
                  lineHeight: 1.85,
                }}
              >
                Start with a 14-day free trial. No credit card. No setup fees.
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
                      Start Building Free <ArrowRight size={14} />
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
