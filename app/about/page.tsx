"use client";
// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeContext";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Heart,
  Code,
  Users,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHARED_CSS = `
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
  .prog{position:fixed;top:0;left:0;right:0;height:2px;background:var(--bg3);z-index:1000;}
  .royal-input{width:100%;padding:14px 18px;background:var(--cbg);border:1px solid var(--brd);color:var(--fg);font-family:'DM Sans',sans-serif;font-size:.87rem;font-weight:300;transition:border-color .3s,box-shadow .3s;outline:none;backdrop-filter:blur(10px);border-radius:3px;}
  .royal-input::placeholder{color:var(--fg3);}
  .royal-input:focus{border-color:rgba(191,160,106,.5);box-shadow:0 0 0 3px rgba(191,160,106,.06);}
  .royal-label{font-size:.58rem;letter-spacing:.3em;text-transform:uppercase;color:var(--fg3);margin-bottom:8px;display:block;}
  @keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
  @keyframes rslow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes rslow-r{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
  .fl1{animation:f1 7s ease-in-out infinite;}
  .rs{animation:rslow 22s linear infinite;}
  .rsr{animation:rslow-r 30s linear infinite;}
  .marquee-track{display:flex;width:max-content;}
  .img-scale img{transition:transform .7s cubic-bezier(.23,1,.32,1);}
  .img-scale:hover img{transform:scale(1.04);}
`;

function RoyalNav({
  dark,
  setDark,
  active,
}: {
  dark: boolean;
  setDark: () => void;
  active: string;
}) {
  return (
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
          style={{ fontSize: 20, letterSpacing: "0.32em", fontWeight: 600 }}
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
            style={l === active ? { color: "var(--cg)" } : {}}
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
  );
}

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

function RoyalFooter() {
  return (
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
      <div>
        <Link href="/">
          <span
            className="dp gg"
            style={{ fontSize: 18, letterSpacing: "0.35em", fontWeight: 600 }}
          >
            SUULP
          </span>
        </Link>
        <p style={{ fontSize: "0.62rem", color: "var(--fg3)", marginTop: 6 }}>
          Build the extraordinary.
        </p>
      </div>
      <div style={{ display: "flex", gap: 36 }}>
        {["Features", "Pricing", "About", "Contact", "Privacy", "Terms"].map(
          (l) => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="na">
              {l}
            </Link>
          ),
        )}
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
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ABOUT PAGE EXPORT                                       */
/* ═══════════════════════════════════════════════════════ */

const TIMELINE = [
  {
    year: "2022",
    event: "Suulp Founded",
    desc: "Two engineers frustrated with overpriced, fragmented SaaS tools decided to build the unified platform they always wanted.",
  },
  {
    year: "2023",
    event: "AI Builder Launched",
    desc: "First product shipped: an AI website generator that turns a business description into a live site in under 60 seconds.",
  },
  {
    year: "2024",
    event: "CMS + CRM Integrated",
    desc: "Full content management and customer relationship tools merged into one seamless workspace — no more app-switching.",
  },
  {
    year: "2025",
    event: "Voice AI Concierge",
    desc: "Partnered with ElevenLabs to deploy human-sounding AI support agents that handle customer queries 24/7 in any language.",
  },
  {
    year: "2026",
    event: "Code Export + Mobile",
    desc: "Introduced one-click code export and automatic mobile app generation — the only platform to offer true full-stack ownership.",
  },
];

const VALUES = [
  {
    icon: Globe,
    title: "Radical Ownership",
    desc: "We believe your business assets belong to you — always. Export your code, your data, your everything, anytime.",
  },
  {
    icon: Zap,
    title: "Speed as a Feature",
    desc: "Every second a user waits is a user we've failed. We obsess over performance from sub-second page loads to instant AI generation.",
  },
  {
    icon: Shield,
    title: "Trust by Default",
    desc: "Security and privacy are baked into every layer — not bolted on afterward. SOC 2 certified. GDPR compliant from day one.",
  },
  {
    icon: Heart,
    title: "Human at the Core",
    desc: "AI should amplify human creativity, not replace it. Every feature we build starts by asking: does this make people more capable?",
  },
  {
    icon: Code,
    title: "Open by Design",
    desc: "No black boxes. Our API is fully documented. Our roadmap is public. We build with our community, not just for them.",
  },
  {
    icon: Users,
    title: "Growth Partnership",
    desc: "When our users grow, we grow. That alignment shapes every pricing decision, feature priority, and support interaction.",
  },
];

const STATS = [
  { num: "12,000+", label: "Sites Built" },
  { num: "40+", label: "Countries" },
  { num: "99.9%", label: "Uptime SLA" },
  { num: "$2.4M+", label: "Revenue Generated for Users" },
];

export function AboutPage() {
  const { isDark: dark, toggleTheme: setDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".val-card",
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: ".vals-grid",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SHARED_CSS }} />
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
        <RoyalNav dark={dark} setDark={setDark} active="About" />

        <main
          ref={containerRef}
          style={{ background: "var(--bg)", overflowX: "hidden" }}
        >
          {/* HERO */}
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
            <div
              style={{
                position: "absolute",
                right: "6%",
                top: "15%",
                opacity: 0.07,
              }}
              className="fl1"
            >
              <div
                style={{
                  width: 320,
                  height: 320,
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
                Our Story
              </span>
            </motion.div>
            {[
              { t: "We Build", cls: "dp", op: 0.88 },
              { t: "Builders.", cls: "dp gg", op: 1 },
            ].map(({ t, cls, op }, i) => (
              <div key={t} style={{ overflow: "hidden" }}>
                <motion.h1
                  className={cls}
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 120px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                    color:
                      cls === "dp"
                        ? `rgba(${dark ? "243,238,229" : "25,21,14"},${op})`
                        : undefined,
                  }}
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5 + i * 0.15,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {t}
                </motion.h1>
              </div>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              style={{
                fontSize: "0.9rem",
                color: "var(--fg2)",
                lineHeight: 1.9,
                maxWidth: 500,
                marginTop: 36,
              }}
            >
              Suulp was born from one stubborn belief: that powerful,
              enterprise-grade software should be accessible to every business —
              not just the ones that can afford a dev team.
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
            <div className="marquee-track">
              {[...Array(6)].flatMap((_, ri) =>
                [
                  "AI Builder",
                  "No-Code CMS",
                  "CRM & CSM",
                  "Voice AI",
                  "Mobile Apps",
                  "Code Export",
                  "Real Ownership",
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

          {/* MISSION SPLIT */}
          <section
            style={{ padding: "80px 40px", maxWidth: 1600, margin: "0 auto" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                gap: 80,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 22,
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
                    Mission
                  </span>
                </div>
                <motion.h2
                  className="dp"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 52px)",
                    lineHeight: 1.1,
                    color: "var(--fg)",
                    marginBottom: 24,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  Every great business deserves a{" "}
                  <span className="italic gg">great platform.</span>
                </motion.h2>
                <p
                  style={{
                    color: "var(--fg2)",
                    fontSize: "0.87rem",
                    lineHeight: 1.9,
                    marginBottom: 20,
                  }}
                >
                  We started Suulp because we watched brilliant founders spend
                  more time managing their software stack than building their
                  actual businesses. Juggling a website builder here, a CRM
                  there, a customer support tool somewhere else — all expensive,
                  all disconnected.
                </p>
                <p
                  style={{
                    color: "var(--fg2)",
                    fontSize: "0.87rem",
                    lineHeight: 1.9,
                  }}
                >
                  Suulp collapses your entire digital infrastructure into one
                  beautiful, AI-powered workspace. Build your site, manage your
                  customers, deploy AI support, and own your code — all from one
                  place.
                </p>
              </div>

              {/* Image collage */}
              <div style={{ position: "relative", height: 460 }}>
                <motion.div
                  className="img-scale"
                  style={{
                    position: "absolute",
                    width: "62%",
                    height: "65%",
                    top: 0,
                    left: 0,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid var(--brd)",
                  }}
                  initial={{ opacity: 0, x: -40, rotate: -2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
                    alt="Team"
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
                </motion.div>
                <motion.div
                  className="img-scale"
                  style={{
                    position: "absolute",
                    width: "55%",
                    height: "58%",
                    bottom: 0,
                    right: 0,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid var(--brd)",
                  }}
                  initial={{ opacity: 0, x: 40, rotate: 2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=80"
                    alt="Building"
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
                </motion.div>
                {/* Float stat */}
                <motion.div
                  className="glass"
                  style={{
                    position: "absolute",
                    bottom: "33%",
                    left: "25%",
                    zIndex: 10,
                    padding: "14px 20px",
                    borderRadius: 3,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -8, 0] }}
                >
                  <p
                    className="dp gg"
                    style={{ fontSize: 26, fontWeight: 600 }}
                  >
                    2026
                  </p>
                  <p
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--fg3)",
                      marginTop: 3,
                    }}
                  >
                    Est. India 🇮🇳
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section style={{ padding: "60px 40px", background: "var(--bg2)" }}>
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 1,
                background: "var(--brd)",
              }}
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  style={{
                    padding: "40px 32px",
                    background: "var(--bg2)",
                    textAlign: "center",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p
                    className="dp gg"
                    style={{ fontSize: 40, fontWeight: 600 }}
                  >
                    {s.num}
                  </p>
                  <p
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--fg3)",
                      marginTop: 8,
                    }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* TIMELINE */}
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
                Journey
              </span>
            </div>
            <motion.h2
              className="dp"
              style={{
                fontSize: "clamp(2rem, 4vw, 52px)",
                lineHeight: 1.05,
                color: "var(--fg)",
                marginBottom: 56,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Built <span className="italic gg">Step by Step</span>
            </motion.h2>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background:
                    "linear-gradient(to bottom, var(--cg), transparent)",
                  opacity: 0.2,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      display: "flex",
                      gap: 40,
                      padding: "32px 0 32px 32px",
                      borderBottom: "1px solid var(--brd)",
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <div
                        style={{
                          position: "absolute",
                          left: -4,
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: "var(--cg)",
                          marginTop: 6,
                        }}
                      />
                      <span
                        className="dp gg"
                        style={{
                          fontSize: 28,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="dp"
                        style={{
                          fontSize: 20,
                          color: "var(--fg)",
                          marginBottom: 10,
                        }}
                      >
                        {item.event}
                      </h3>
                      <p
                        style={{
                          color: "var(--fg2)",
                          fontSize: "0.85rem",
                          lineHeight: 1.8,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* VALUES */}
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
                      Values
                    </span>
                  </div>
                  <motion.h2
                    className="dp"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 52px)",
                      lineHeight: 1.05,
                      color: "var(--fg)",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    What We <span className="italic gg">Stand For</span>
                  </motion.h2>
                </div>
              </div>
              <div
                className="vals-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                  gap: 1,
                  background: "var(--brd)",
                }}
              >
                {VALUES.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div
                      key={i}
                      className="val-card"
                      style={{
                        background: "var(--bg2)",
                        padding: "36px 32px",
                        transition: "background 0.3s",
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
                          fontSize: 20,
                          color: "var(--fg)",
                          marginBottom: 12,
                        }}
                      >
                        {v.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--fg2)",
                          fontSize: "0.82rem",
                          lineHeight: 1.8,
                        }}
                      >
                        {v.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section
            style={{
              padding: "100px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {[280, 420].map((sz, ri) => (
              <div
                key={ri}
                style={{
                  position: "absolute",
                  width: sz,
                  height: sz,
                  border: `1px solid rgba(191,160,106,${0.05 + ri * 0.02})`,
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
                Join the <span className="italic gg">Movement</span>
              </h2>
              <p
                style={{
                  color: "var(--fg2)",
                  fontSize: "0.87rem",
                  marginBottom: 36,
                  lineHeight: 1.85,
                  maxWidth: 460,
                  margin: "0 auto 36px",
                }}
              >
                Thousands of founders have already chosen Suulp to build their
                businesses. Your turn.
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

          <RoyalFooter />
        </main>
      </div>
    </>
  );
}

export default AboutPage;
