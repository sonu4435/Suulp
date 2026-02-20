"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LiquidCursor({ dark }: { dark: boolean }) {
  const cx = useMotionValue(-100),
    cy = useMotionValue(-100);
  const fx = useSpring(cx, { stiffness: 55, damping: 18 }),
    fy = useSpring(cy, { stiffness: 55, damping: 18 });
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

const PLANS = [
  {
    name: "Spark",
    badge: null,
    monthlyPrice: 29,
    annualPrice: 290,
    desc: "For individuals & solo founders starting out.",
    features: [
      "1 website",
      "AI builder (3 generations/mo)",
      "Drag & drop CMS",
      "Basic CRM (500 contacts)",
      "Suulp subdomain",
      "5GB storage",
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
      "50GB storage",
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
  const [dark, setDark] = useState(true);
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
    @keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
    @keyframes rslow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes rslow-r{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
    .fl1{animation:f1 7s ease-in-out infinite;}
    .rs{animation:rslow 22s linear infinite;}
    .rsr{animation:rslow-r 30s linear infinite;}
    .marquee-track{display:flex;width:max-content;}
    .faq-item{border-bottom:1px solid var(--brd);transition:background .3s;}
    .plan-card{position:relative;}
    .compare-row:hover{background:rgba(191,160,106,0.03);}
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
          {/* NAV */}
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
                  style={l === "Pricing" ? { color: "var(--cg)" } : {}}
                >
                  {l}
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <button
                data-hover="true"
                onClick={() => setDark(!dark)}
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
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--fg2)",
                  }}
                >
                  {dark ? "🌙 Dark" : "☀️ Light"}
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

          {/* HERO */}
          <section
            style={{
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "140px 40px 60px",
              maxWidth: 1600,
              margin: "0 auto",
              position: "relative",
            }}
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
                  width: 280,
                  height: 280,
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
                marginBottom: 28,
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
                Simple Pricing
              </span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h1
                className="dp"
                style={{
                  fontSize: "clamp(3rem, 8vw, 110px)",
                  lineHeight: 0.9,
                  color: "var(--fg)",
                }}
                initial={{ y: 110, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                Invest in Your
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                className="dp gg"
                style={{ fontSize: "clamp(3rem, 8vw, 110px)", lineHeight: 0.9 }}
                initial={{ y: 110, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.65,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                Business Empire.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              style={{
                fontSize: "0.9rem",
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
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: !annual ? "var(--cg)" : "var(--fg3)",
                  letterSpacing: "0.1em",
                  transition: "color 0.3s",
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
                  transition: "all 0.4s",
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
                  fontSize: "0.75rem",
                  color: annual ? "var(--cg)" : "var(--fg3)",
                  letterSpacing: "0.1em",
                  transition: "color 0.3s",
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
            <div className="marquee-track">
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

          {/* PLANS */}
          <section
            style={{ padding: "80px 40px", maxWidth: 1600, margin: "0 auto" }}
          >
            <div
              className="plans-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 1,
                border: "1px solid var(--brd)",
                borderRadius: 4,
                overflow: "hidden",
                background: "var(--brd)",
              }}
            >
              {PLANS.map((plan, i) => (
                <div
                  key={i}
                  className="plan-card"
                  style={{
                    background: plan.hi
                      ? "linear-gradient(160deg,var(--bg2),var(--bg))"
                      : "var(--bg)",
                    padding: "40px 36px",
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
                          fontSize: "0.55rem",
                          letterSpacing: "0.32em",
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
                      letterSpacing: "0.15em",
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
                      fontSize: "0.72rem",
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
                            fontSize: "0.72rem",
                            color: "var(--fg3)",
                            marginLeft: 6,
                          }}
                        >
                          /mo
                        </span>
                        {annual && (
                          <p
                            style={{
                              fontSize: "0.65rem",
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
                            fontSize: "0.65rem",
                            color: "var(--fg3)",
                            marginTop: 4,
                          }}
                        >
                          Contact us for enterprise pricing
                        </p>
                      </>
                    )}
                  </div>

                  <Link
                    href={plan.monthlyPrice ? "/signup" : "/contact"}
                    style={{ display: "block", marginBottom: 32 }}
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

                  <div
                    style={{
                      height: 1,
                      background: "var(--brd)",
                      marginBottom: 28,
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
                          style={{ fontSize: "0.78rem", color: "var(--fg2)" }}
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
                            style={{ fontSize: "0.78rem", color: "var(--fg3)" }}
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

          {/* COMPARISON TABLE */}
          <section style={{ padding: "80px 40px", background: "var(--bg2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
                  Compare
                </span>
              </div>
              <motion.h2
                className="dp"
                style={{
                  fontSize: "clamp(2rem, 4vw, 52px)",
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

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--brd)" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "16px 20px",
                          fontFamily: "'DM Sans'",
                          fontSize: "0.7rem",
                          letterSpacing: "0.25em",
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
                            padding: "16px 20px",
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
                          borderBottom: "1px solid rgba(191,160,106,0.05)",
                          transition: "background 0.3s",
                        }}
                      >
                        <td
                          style={{
                            padding: "14px 20px",
                            fontSize: "0.82rem",
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
                                padding: "14px 20px",
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
                                    fontSize: "0.78rem",
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
            style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <div style={{ height: 1, width: 28, background: "var(--cg)" }} />
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "var(--cg)",
                }}
              >
                FAQ
              </span>
            </div>
            <motion.h2
              className="dp"
              style={{
                fontSize: "clamp(2rem, 4vw, 52px)",
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

            <div style={{ display: "flex", flexDirection: "column" }}>
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
                    }}
                  >
                    <span
                      className="dp"
                      style={{ fontSize: 18, color: "var(--fg)" }}
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
                        marginLeft: 16,
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
                            fontSize: "0.87rem",
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
            style={{
              padding: "100px 40px",
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
                  fontSize: "clamp(2rem, 4.5vw, 58px)",
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
                  fontSize: "0.87rem",
                  marginBottom: 36,
                  lineHeight: 1.85,
                }}
              >
                Start building your business empire today.
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
                  Start Free Trial <ArrowRight size={14} />
                </button>
              </Link>
            </motion.div>
          </section>

          {/* FOOTER */}
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
            <Link href="/">
              <span
                className="dp gg"
                style={{
                  fontSize: 18,
                  letterSpacing: "0.35em",
                  fontWeight: 600,
                }}
              >
                SUULP
              </span>
            </Link>
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
