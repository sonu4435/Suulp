"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useScroll, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Globe,
  Cpu,
  Zap,
  Shield,
  Headphones,
  Users,
  Paintbrush,
  Database,
  Smartphone,
  ArrowRight,
  Layers,
  Bot,
  Mic,
  BarChart3,
  Puzzle,
  Download,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function LiquidCursor({ dark }: { dark: boolean }) {
  const cx = useMotionValue(-100),
    cy = useMotionValue(-100);
  const { useSpring: s } = require("framer-motion");
  const fx = useSpring(cx, { stiffness: 55, damping: 18 });
  const fy = useSpring(cy, { stiffness: 55, damping: 18 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    const enter = (e: Event) => {
      if ((e.target as HTMLElement).closest("button,a,[data-hover]"))
        setHov(true);
    };
    const leave = () => setHov(false);
    window.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);
  const gold = dark ? "#BFA06A" : "#7A5C2A";
  return (
    <>
      <motion.div
        style={{
          x: cx,
          y: cy,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          background: gold,
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          x: fx,
          y: fy,
          translateX: "-50%",
          translateY: "-50%",
          width: hov ? 50 : 34,
          height: hov ? 50 : 34,
          border: `1px solid ${gold}`,
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: hov ? 0.6 : 0.3,
          transition:
            "width 0.4s cubic-bezier(0.23,1,0.32,1),height 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      />
    </>
  );
}

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

export default function FeaturesPage() {
  const { isDark: dark, toggleTheme: setDark } = useTheme();
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
      gsap.to(".marquee-track", {
        x: "-50%",
        duration: 28,
        repeat: -1,
        ease: "linear",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&display=swap');
    *{cursor:none;box-sizing:border-box;margin:0;padding:0}
    :root{--gold:#BFA06A;--gold-l:#E2C98A;--gold-d:#7A5C2A}
    .dk{--bg:#070708;--bg2:#0D0D0F;--bg3:#131315;--fg:#F3EEE5;--fg2:rgba(243,238,229,.52);--fg3:rgba(243,238,229,.18);--brd:rgba(191,160,106,.1);--cbg:rgba(255,255,255,.016);--cg:#BFA06A;}
    .lk{--bg:#F6F3ED;--bg2:#EDE9DF;--bg3:#E2DDD1;--fg:#19150E;--fg2:rgba(25,21,14,.52);--fg3:rgba(25,21,14,.2);--brd:rgba(191,160,106,.22);--cbg:rgba(255,255,255,.55);--cg:#7A5C2A;}
    body{background:var(--bg);color:var(--fg);font-family:'DM Sans',sans-serif;font-weight:300;transition:background .5s,color .5s;overflow-x:hidden;}
    .dp{font-family:'Playfair Display',serif;}
    .gg{background:linear-gradient(135deg,#BFA06A 0%,#E2C98A 45%,#BFA06A 75%,#7A5C2A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .glass{background:var(--cbg);backdrop-filter:blur(24px) saturate(1.4);border:1px solid var(--brd);}
    .noise-ov{position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
    .bg-btn{background:linear-gradient(120deg,#BFA06A,#E2C98A,#BFA06A);background-size:200% auto;color:#08070A;font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.12em;text-transform:uppercase;font-size:.7rem;transition:background-position .6s,box-shadow .3s;}
    .bg-btn:hover{background-position:right center;box-shadow:0 12px 50px rgba(191,160,106,.42);}
    .bo-btn{border:1px solid var(--brd);color:var(--cg);font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.12em;text-transform:uppercase;font-size:.7rem;transition:all .4s;position:relative;overflow:hidden;}
    .bo-btn::after{content:'';position:absolute;inset:0;background:rgba(191,160,106,.07);transform:translateX(-100%);transition:transform .4s;}
    .bo-btn:hover::after{transform:translateX(0);}
    .bo-btn:hover{border-color:rgba(191,160,106,.45);}
    .na{font-family:'DM Sans',sans-serif;font-size:.65rem;letter-spacing:.22em;text-transform:uppercase;color:var(--fg2);transition:color .3s;position:relative;}
    .na::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--cg);transition:width .35s;}
    .na:hover{color:var(--cg);}.na:hover::after{width:100%;}
    .gold-ln{display:block;height:1px;background:linear-gradient(90deg,transparent,#BFA06A,transparent);}
    .prog{position:fixed;top:0;left:0;right:0;height:2px;background:var(--bg3);z-index:1000;}
    .img-scale img{transition:transform .7s cubic-bezier(.23,1,.32,1);}
    .img-scale:hover img{transform:scale(1.05);}
    @keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
    @keyframes rslow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .fl1{animation:f1 7s ease-in-out infinite;}
    .rs{animation:rslow 25s linear infinite;}
    .extra-card{background:var(--bg);transition:border-color .4s,background .4s;}
    .extra-card:hover{border-color:rgba(191,160,106,.3);background:var(--bg2);}
    .marquee-track{display:flex;width:max-content;}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={dark ? "dk" : "lk"}>
        <div className="noise-ov" />
        <LiquidCursor dark={dark} />
        <div className="prog">
          <motion.div
            style={{
              scaleX,
              transformOrigin: "left",
              height: "100%",
              background: "linear-gradient(90deg,#7A5C2A,#BFA06A,#E2C98A)",
            }}
          />
        </div>

        <main
          ref={containerRef}
          style={{ background: "var(--bg)", overflowX: "hidden" }}
        >
          {/* ── NAV ── */}
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 40px",
              borderBottom: "1px solid var(--brd)",
              backdropFilter: "blur(22px)",
              background: dark ? "rgba(7,7,8,0.72)" : "rgba(246,243,237,0.72)",
            }}
          >
            <Link href="/">
              <span
                className="dp gg"
                style={{
                  fontSize: 20,
                  letterSpacing: "0.32em",
                  fontWeight: 600,
                }}
              >
                SUULP
              </span>
            </Link>
            <div style={{ display: "flex", gap: 36 }}>
              {["Features", "Pricing", "About", "Contact"].map((l) => (
                <Link
                  key={l}
                  href={`/${l.toLowerCase()}`}
                  className="na"
                  style={l === "Features" ? { color: "var(--cg)" } : {}}
                >
                  {l}
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <button
                data-hover="true"
                onClick={() => setDark()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: "1px solid var(--brd)",
                  background: "var(--cbg)",
                }}
              >
                <motion.div
                  animate={{ rotate: dark ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {dark ? (
                    <span style={{ fontSize: 12 }}>🌙</span>
                  ) : (
                    <span style={{ fontSize: 12 }}>☀️</span>
                  )}
                </motion.div>
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--fg2)",
                  }}
                >
                  {dark ? "Dark" : "Light"}
                </span>
              </button>
              <Link href="/signup">
                <button
                  className="bg-btn"
                  style={{ padding: "10px 24px", borderRadius: 3 }}
                >
                  Start Free
                </button>
              </Link>
            </div>
          </motion.nav>

          {/* ── HERO ── */}
          <section
            style={{
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "140px 40px 80px",
              maxWidth: 1600,
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/* Floating ring */}
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
                  width: 300,
                  height: 300,
                  border: "1px solid var(--cg)",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: "12%",
                top: "25%",
                opacity: 0.04,
              }}
              className="fl1"
            >
              <div
                style={{
                  width: 160,
                  height: 160,
                  border: "1px solid var(--cg)",
                  borderRadius: "50%",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 32,
              }}
            >
              <div style={{ height: 1, width: 32, background: "var(--cg)" }} />
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "var(--cg)",
                }}
              >
                Platform Capabilities
              </span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h1
                className="dp gg"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 120px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                Everything
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                className="dp"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 120px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                  color: "rgba(225, 206, 172, 0.88)",
                  marginBottom: 4,
                }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.65,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                You Need to
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                className="dp"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 120px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                  fontStyle: "italic",
                  color: "rgba(82, 72, 55, 0.22)",
                }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                Build & Grow.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1 }}
              style={{
                fontSize: "0.9rem",
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

          {/* ── MARQUEE ── */}
          <div
            style={{
              borderTop: "1px solid var(--brd)",
              borderBottom: "1px solid var(--brd)",
              padding: "12px 0",
              overflow: "hidden",
            }}
          >
            <div className="marquee-track">
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
                        fontSize: "0.6rem",
                        letterSpacing: "0.42em",
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
                        opacity="0.35"
                      />
                    </svg>
                  </div>
                )),
              )}
            </div>
          </div>

          {/* ── FEATURE PILLARS ── */}
          <section
            style={{ padding: "80px 40px", maxWidth: 1600, margin: "0 auto" }}
          >
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              const isOdd = i % 2 !== 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                    gap: 64,
                    alignItems: "center",
                    marginBottom: 120,
                    direction: isOdd ? "rtl" : "ltr",
                  }}
                >
                  {/* Text */}
                  <div style={{ direction: "ltr" }}>
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
                          fontSize: "0.6rem",
                          letterSpacing: "0.42em",
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
                        fontSize: "clamp(1.8rem, 3.5vw, 48px)",
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
                        fontSize: "0.87rem",
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
                            style={{ fontSize: "0.82rem", color: "var(--fg2)" }}
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

                  {/* Image */}
                  <div
                    className="img-scale"
                    style={{
                      direction: "ltr",
                      borderRadius: 4,
                      overflow: "hidden",
                      border: "1px solid var(--brd)",
                      position: "relative",
                      height: 380,
                    }}
                  >
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
                          "linear-gradient(to top, var(--bg) 0%, transparent 60%)",
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
                          fontSize: "0.6rem",
                          letterSpacing: "0.3em",
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

          {/* ── EXTRAS GRID ── */}
          <section style={{ padding: "80px 40px", background: "var(--bg2)" }}>
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{ height: 1, width: 28, background: "var(--cg)" }}
                    />
                    <span
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.42em",
                        textTransform: "uppercase",
                        color: "var(--cg)",
                      }}
                    >
                      And More
                    </span>
                  </div>
                  <motion.h2
                    className="dp"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 56px)",
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
                    fontSize: "0.87rem",
                    lineHeight: 1.85,
                    maxWidth: 360,
                  }}
                >
                  Every piece of infrastructure your business needs — included,
                  configured, and ready to use on day one.
                </p>
              </div>

              <div
                className="extras-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                  gap: 1,
                  background: "var(--brd)",
                }}
              >
                {EXTRAS.map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <div
                      key={i}
                      className="extra-card"
                      style={{
                        padding: "36px 32px",
                        border: "1px solid transparent",
                        borderRadius: 0,
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
                          fontSize: "0.8rem",
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

          {/* ── CTA ── */}
          <section
            style={{
              padding: "100px 40px",
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
                  fontSize: "clamp(2rem, 4.5vw, 60px)",
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
                  fontSize: "0.87rem",
                  marginBottom: 36,
                  lineHeight: 1.85,
                }}
              >
                Start with a 14-day free trial. No credit card. No setup fees.
              </p>
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
            </motion.div>
          </section>

          {/* ── FOOTER ── */}
          <footer
            style={{
              borderTop: "1px solid var(--brd)",
              padding: "36px 40px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <span
              className="dp gg"
              style={{ fontSize: 18, letterSpacing: "0.35em", fontWeight: 600 }}
            >
              SUULP
            </span>
            <div style={{ display: "flex", gap: 36 }}>
              {[
                "Features",
                "Pricing",
                "About",
                "Contact",
                "Privacy",
                "Terms",
              ].map((l) => (
                <Link key={l} href={`/${l.toLowerCase()}`} className="na">
                  {l}
                </Link>
              ))}
            </div>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fg3)",
              }}
            >
              © 2026 Suulp
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
