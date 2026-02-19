"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Headphones,
  BarChart3,
  Users,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── MAGNETIC BUTTON ───────────────────────────────────────────────────── */
function MagneticButton({ children, className, onClick }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/* ─── TEXT SCRAMBLE ─────────────────────────────────────────────────────── */
function ScrambleText({ text, className, style }: any) {
  const [display, setDisplay] = useState(text);
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const raf = useRef<number>(0);
  const scramble = useCallback(() => {
    let iter = 0;
    cancelAnimationFrame(raf.current);
    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((c: string, i: number) =>
            i < iter / 3 ? c : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      iter++;
      if (iter < text.length * 3) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);
  return (
    <span className={className} style={style} onMouseEnter={scramble}>
      {display}
    </span>
  );
}

/* ─── ANIMATED COUNTER ──────────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          let v = 0;
          const step = to / 60;
          const go = () => {
            v = Math.min(v + step, to);
            setVal(Math.floor(v));
            if (v < to) requestAnimationFrame(go);
          };
          requestAnimationFrame(go);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ─── LIQUID CURSOR ─────────────────────────────────────────────────────── */
function LiquidCursor({ dark }: { dark: boolean }) {
  const cx = useMotionValue(-100),
    cy = useMotionValue(-100);
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
            "width 0.4s cubic-bezier(0.23,1,0.32,1), height 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      />
    </>
  );
}

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    label: "Grand Lobby",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    label: "Royal Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    label: "Fine Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    label: "Infinity Pool",
  },
  {
    src: "https://images.unsplash.com/photo-1520260497591-112f2f40a3f4?w=800&q=80",
    label: "Ocean View",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c4fe799f?w=800&q=80",
    label: "Penthouse",
  },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: "Neural Analytics",
    desc: "Predictive intelligence and real-time operational insights across every guest touchpoint.",
  },
  {
    icon: Shield,
    title: "Vault Security",
    desc: "Military-grade encryption with global hospitality compliance certification.",
  },
  {
    icon: Zap,
    title: "Instant Response",
    desc: "Sub-100ms architecture with zero-downtime deployments worldwide.",
  },
  {
    icon: Headphones,
    title: "AI Concierge",
    desc: "GPT-powered voice agents delivering 24/7 white-glove guest service.",
  },
  {
    icon: Users,
    title: "Unified Teams",
    desc: "Collaborative workflows uniting every department in seamless harmony.",
  },
  {
    icon: Sparkles,
    title: "Smart Flows",
    desc: "Automate 80% of repetitive operations so your team crafts unforgettable moments.",
  },
];

const PLANS = [
  {
    name: "Sovereign",
    price: "$99",
    period: "/mo",
    desc: "Boutique properties",
    features: ["50 rooms", "Core CMS & CRM", "Analytics", "Email support"],
    cta: "Begin Journey",
    hi: false,
  },
  {
    name: "Imperial",
    price: "$299",
    period: "/mo",
    desc: "Growing portfolios",
    features: [
      "500 rooms",
      "Advanced suite",
      "AI agents",
      "5 team seats",
      "API access",
      "Priority support",
    ],
    cta: "Claim Your Throne",
    hi: true,
  },
  {
    name: "Dynasty",
    price: "Custom",
    period: "",
    desc: "Luxury hotel chains",
    features: [
      "Unlimited rooms",
      "White-label",
      "Custom AI",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    cta: "Contact Court",
    hi: false,
  },
];

/* ─── MAIN ──────────────────────────────────────────────────────────────── */
export default function Home() {
  const [dark, setDark] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScroll = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOp = useTransform(heroScroll.scrollYProgress, [0, 0.7], [1, 0]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  /* horizontal gallery */
  useEffect(() => {
    if (!loaded || !galleryRef.current || !galleryTrackRef.current) return;
    const track = galleryTrackRef.current;
    const ctx = gsap.context(() => {
      const sw = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -sw,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top top",
          end: () => `+=${sw}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });
    return () => ctx.revert();
  }, [loaded]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feat-card",
        { opacity: 0, y: 70, rotateX: 12 },
        {
          scrollTrigger: {
            trigger: ".feat-grid",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1.2,
          },
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.07,
        },
      );
      gsap.fromTo(
        ".price-card",
        { opacity: 0, y: 90, scale: 0.93 },
        {
          scrollTrigger: {
            trigger: ".price-grid",
            start: "top 80%",
            end: "top 25%",
            scrub: 1,
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

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  /* ─── CSS ─────────────────────────────────────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&display=swap');

    *{cursor:none;box-sizing:border-box;margin:0;padding:0}
    :root{--gold:#BFA06A;--gold-l:#E2C98A;--gold-d:#7A5C2A}

    .dk{--bg:#070708;--bg2:#0D0D0F;--bg3:#131315;--fg:#F3EEE5;--fg2:rgba(243,238,229,.52);--fg3:rgba(243,238,229,.18);--brd:rgba(191,160,106,.1);--cbg:rgba(255,255,255,.016);--cg:#BFA06A;--cr:#BFA06A}
    .lk{--bg:#F6F3ED;--bg2:#EDE9DF;--bg3:#E2DDD1;--fg:#19150E;--fg2:rgba(25,21,14,.52);--fg3:rgba(25,21,14,.2);--brd:rgba(191,160,106,.22);--cbg:rgba(255,255,255,.55);--cg:#7A5C2A;--cr:#7A5C2A}

    body{background:var(--bg);color:var(--fg);font-family:'DM Sans',sans-serif;font-weight:300;transition:background .5s,color .5s}
    .dp{font-family:'Playfair Display',serif}
    .gg{background:linear-gradient(135deg,#BFA06A 0%,#E2C98A 45%,#BFA06A 75%,#7A5C2A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .ggl{background:linear-gradient(135deg,#7A5C2A 0%,#BFA06A 45%,#7A5C2A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    .glass{background:var(--cbg);backdrop-filter:blur(24px) saturate(1.4);border:1px solid var(--brd)}
    .noise-ov{position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

    .bg{background:linear-gradient(120deg,#BFA06A,#E2C98A,#BFA06A);background-size:200% auto;color:#08070A;font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.12em;text-transform:uppercase;font-size:.7rem;transition:background-position .6s,box-shadow .3s}
    .bg:hover{background-position:right center;box-shadow:0 12px 50px rgba(191,160,106,.42)}
    .bo{border:1px solid var(--brd);color:var(--cg);font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.12em;text-transform:uppercase;font-size:.7rem;transition:all .4s;position:relative;overflow:hidden}
    .bo::after{content:'';position:absolute;inset:0;background:rgba(191,160,106,.07);transform:translateX(-100%);transition:transform .4s}
    .bo:hover::after{transform:translateX(0)}
    .bo:hover{border-color:rgba(191,160,106,.45)}

    .na{font-family:'DM Sans',sans-serif;font-size:.65rem;letter-spacing:.22em;text-transform:uppercase;color:var(--fg2);transition:color .3s;position:relative}
    .na::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--cg);transition:width .35s}
    .na:hover{color:var(--cg)}.na:hover::after{width:100%}

    .gold-ln{display:block;height:1px;background:linear-gradient(90deg,transparent,#BFA06A,transparent);transform-origin:left}
    .lo{overflow:hidden}

    .card-wrap{perspective:900px}
    .card-inner{transform-style:preserve-3d;transition:transform .15s ease}

    .gal-track{will-change:transform;display:flex;align-items:center}

    @keyframes f1{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-18px) rotate(2deg)}}
    @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px) rotate(-1.5deg)}}
    @keyframes rslow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes rslow-r{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}

    .fl1{animation:f1 7s ease-in-out infinite}
    .fl2{animation:f2 9s ease-in-out infinite}
    .rs{animation:rslow 22s linear infinite}
    .rsr{animation:rslow-r 30s linear infinite}

    .img-scale img{transition:transform .6s cubic-bezier(.23,1,.32,1)}
    .img-scale:hover img{transform:scale(1.06)}

    .shimmer-hover::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 30%,rgba(191,160,106,.06) 50%,transparent 70%);background-size:200% auto;opacity:0;transition:opacity .3s}
    .shimmer-hover:hover::before{opacity:1;animation:shimmer 2s linear infinite}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

    .prog{position:fixed;top:0;left:0;right:0;height:2px;background:var(--bg3);z-index:1000}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className={dark ? "dk" : "lk"}>
        <div className="noise-ov" />
        <LiquidCursor dark={dark} />

        {/* Progress bar */}
        <div className="prog">
          <motion.div
            style={{
              scaleX,
              transformOrigin: "left",
              height: "100%",
              background: "linear-gradient(90deg, #7A5C2A, #BFA06A, #E2C98A)",
            }}
          />
        </div>

        {/* ── LOADER ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              className="fixed inset-0 z-[500] flex items-center justify-center"
              style={{ background: "var(--bg)" }}
              exit={{
                opacity: 0,
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
              }}
            >
              <div style={{ textAlign: "center", position: "relative" }}>
                {[200, 260, 320].map((sz, ri) => (
                  <motion.div
                    key={ri}
                    style={{
                      position: "absolute",
                      width: sz,
                      height: sz,
                      border: `1px solid rgba(191,160,106,${0.06 + ri * 0.03})`,
                      borderRadius: "50%",
                      top: "50%",
                      left: "50%",
                      marginLeft: -sz / 2,
                      marginTop: -sz / 2,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: ri % 2 === 0 ? 360 : -360,
                    }}
                    transition={{
                      scale: { duration: 0.8, delay: ri * 0.1 },
                      opacity: { duration: 0.5, delay: ri * 0.1 },
                      rotate: {
                        duration: 20 + ri * 5,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />
                ))}
                <motion.p
                  className="dp gg"
                  style={{
                    fontSize: 52,
                    letterSpacing: "0.4em",
                    fontWeight: 600,
                    position: "relative",
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  SUULP
                </motion.p>
                <motion.div
                  className="gold-ln mx-auto mt-3"
                  style={{ maxWidth: 200 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.5 }}
                />
                <motion.p
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    marginTop: 12,
                    position: "relative",
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Loading Excellence
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main
          ref={containerRef}
          style={{
            background: "var(--bg)",
            overflowX: "hidden",
            minHeight: "100vh",
          }}
        >
          {/* ── NAV ─────────────────────────────────────────────────────── */}
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.76, 0, 0.24, 1] }}
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
            <ScrambleText
              text="SUULP"
              className="dp gg"
              style={{ fontSize: 20, letterSpacing: "0.32em", fontWeight: 600 }}
            />

            <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {["Features", "Pricing", "About", "Contact"].map((l) => (
                <Link key={l} href={`/${l.toLowerCase()}`} className="na">
                  {l}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {/* Theme toggle */}
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
                  backdropFilter: "blur(10px)",
                  transition: "all 0.4s",
                }}
              >
                <motion.div
                  animate={{ rotate: dark ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {dark ? (
                    <Moon size={12} color="var(--cg)" />
                  ) : (
                    <Sun size={12} color="var(--cg)" />
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
                {/* Pill indicator */}
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: dark ? "#BFA06A" : "#7A5C2A",
                    transition: "background 0.4s",
                  }}
                />
              </button>

              <MagneticButton>
                <Link href="/signup">
                  <button
                    className="bg"
                    style={{ padding: "10px 24px", borderRadius: 3 }}
                  >
                    Begin
                  </button>
                </Link>
              </MagneticButton>
            </div>
          </motion.nav>

          {/* ── HERO ────────────────────────────────────────────────────── */}
          <section
            ref={heroRef}
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflow: "hidden",
              paddingBottom: "5vh",
            }}
          >
            {/* BG */}
            <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=80"
                alt="Hotel"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: dark
                    ? "brightness(0.25) saturate(0.35)"
                    : "brightness(0.15) saturate(0.25)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: dark
                    ? "linear-gradient(135deg, var(--bg) 30%, rgba(7,7,8,0.5) 65%, transparent 100%)"
                    : "linear-gradient(135deg, var(--bg) 30%, rgba(246,243,237,0.4) 65%, transparent 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, var(--bg) 8%, transparent 55%)",
                }}
              />
            </motion.div>

            {/* Decorative rings */}
            <div
              style={{
                position: "absolute",
                right: "6%",
                top: "18%",
                pointerEvents: "none",
                opacity: 0.1,
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
            <div
              style={{
                position: "absolute",
                right: "10%",
                top: "22%",
                pointerEvents: "none",
                opacity: 0.05,
              }}
              className="fl2"
            >
              <div
                style={{
                  width: 180,
                  height: 180,
                  border: "1px solid var(--cg)",
                  borderRadius: "50%",
                }}
              />
            </div>

            {/* Vertical side text */}
            <div
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                writingMode: "vertical-rl",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                opacity: 0.4,
              }}
            >
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                }}
              >
                Luxury Platform
              </span>
              <div style={{ width: 1, height: 60, background: "var(--cg)" }} />
            </div>

            <motion.div
              style={{
                position: "relative",
                zIndex: 10,
                padding: "0 40px",
                maxWidth: 1600,
                margin: "0 auto",
                width: "100%",
                opacity: heroOp,
              }}
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 36,
                  paddingTop: 100,
                }}
              >
                <div
                  style={{ height: 1, width: 36, background: "var(--cg)" }}
                />
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "var(--cg)",
                  }}
                >
                  Est. 2026 — The Future of Hospitality
                </span>
              </motion.div>

              {/* Headline */}
              {[
                { t: "Hotel", cls: "dp gg", italic: false, op: 1, delay: 1.2 },
                {
                  t: "Management",
                  cls: "dp",
                  italic: false,
                  op: 0.88,
                  delay: 1.35,
                },
                {
                  t: "Reimagined.",
                  cls: "dp",
                  italic: true,
                  op: 0.25,
                  delay: 1.5,
                },
              ].map(({ t, cls, italic, op, delay }) => (
                <div key={t} className="lo">
                  <motion.h1
                    className={cls}
                    style={{
                      fontSize: "clamp(3.8rem, 10.5vw, 138px)",
                      lineHeight: 0.92,
                      letterSpacing: "-0.02em",
                      fontStyle: italic ? "italic" : "normal",
                      color:
                        cls === "dp gg"
                          ? undefined
                          : `rgba(${dark ? "243,238,229" : "25,21,14"},${op})`,
                      marginBottom: 4,
                    }}
                    initial={{ y: 140, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1.2,
                      delay,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <ScrambleText text={t} />
                  </motion.h1>
                </div>
              ))}

              {/* Bottom row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.7 }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 32,
                  marginTop: 40,
                }}
              >
                <p
                  style={{
                    fontSize: "0.87rem",
                    color: "var(--fg2)",
                    lineHeight: 1.85,
                    maxWidth: 380,
                  }}
                >
                  All-in-one SaaS platform combining CMS, CRM, and AI-powered
                  concierge agents. Elevate operations. Delight guests.
                </p>
                <div style={{ display: "flex", gap: 16 }}>
                  <MagneticButton>
                    <Link href="/signup">
                      <button
                        className="bg"
                        style={{
                          padding: "16px 40px",
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        Get Started <ArrowRight size={13} />
                      </button>
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href="/features">
                      <button
                        className="bo"
                        style={{ padding: "16px 40px", borderRadius: 3 }}
                      >
                        Explore
                      </button>
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 48,
                  marginTop: 56,
                }}
              >
                {[
                  { v: 100, s: "+", l: "Hotels" },
                  { v: 50000, s: "+", l: "Guests Served" },
                  { v: 99, s: ".9%", l: "Uptime SLA" },
                ].map(({ v, s, l }) => (
                  <div key={l}>
                    <p
                      className="dp gg"
                      style={{ fontSize: 36, fontWeight: 600 }}
                    >
                      <Counter to={v} suffix={s} />
                    </p>
                    <p
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        color: "var(--fg3)",
                        marginTop: 5,
                      }}
                    >
                      {l}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              style={{
                position: "absolute",
                bottom: 36,
                right: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div
                style={{
                  width: 1,
                  height: 56,
                  background:
                    "linear-gradient(to bottom, var(--cg), transparent)",
                  opacity: 0.45,
                }}
              />
              <span
                style={{
                  fontSize: "0.52rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                }}
              >
                Scroll
              </span>
            </motion.div>
          </section>

          {/* ── MARQUEE ─────────────────────────────────────────────────── */}
          <div
            style={{
              borderTop: "1px solid var(--brd)",
              borderBottom: "1px solid var(--brd)",
              padding: "12px 0",
              overflow: "hidden",
            }}
          >
            <div
              className="marquee-track"
              style={{ display: "flex", width: "max-content" }}
            >
              {[...Array(8)].flatMap((_, ri) =>
                [
                  "AI Concierge",
                  "Neural Analytics",
                  "Vault Security",
                  "Smart Automation",
                  "Team Workflows",
                  "White-label Platform",
                  "API Access",
                  "AI Agents",
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

          {/* ── SPLIT INTRO ─────────────────────────────────────────────── */}
          <section
            style={{ padding: "96px 40px", maxWidth: 1600, margin: "0 auto" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 64,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 28,
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
                    Platform
                  </span>
                </div>
                <motion.h2
                  className="dp"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 58px)",
                    lineHeight: 1.1,
                    color: "var(--fg)",
                    marginBottom: 24,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  Built for those who demand
                  <span className="italic gg"> nothing less</span> than
                  excellence.
                </motion.h2>
                <p
                  style={{
                    color: "var(--fg2)",
                    lineHeight: 1.9,
                    fontSize: "0.87rem",
                    maxWidth: 420,
                  }}
                >
                  Suulp unifies guest acquisition, operations, and post-stay
                  engagement into one beautifully crafted platform.
                </p>
                <div
                  style={{
                    marginTop: 36,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                  }}
                >
                  {[
                    "Unified real-time operations dashboard",
                    "AI-driven guest personalization engine",
                    "Dynamic revenue optimization",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: 14 }}
                    >
                      <div
                        style={{
                          height: 1,
                          width: 24,
                          background: "var(--cg)",
                          opacity: 0.55,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{ fontSize: "0.82rem", color: "var(--fg2)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collage */}
              <div style={{ position: "relative", height: 480 }}>
                <motion.div
                  style={{
                    position: "absolute",
                    width: "63%",
                    height: "68%",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                  initial={{ opacity: 0, x: -40, rotate: -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                  className="img-scale"
                >
                  <img
                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80"
                    alt="Suite"
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
                        "linear-gradient(to top, var(--bg) 0%, transparent 55%)",
                    }}
                  />
                </motion.div>

                <motion.div
                  style={{
                    position: "absolute",
                    width: "58%",
                    height: "60%",
                    bottom: 0,
                    right: 0,
                    zIndex: 3,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                  initial={{ opacity: 0, x: 40, rotate: 3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="img-scale"
                >
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80"
                    alt="Dining"
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
                        "linear-gradient(to top, var(--bg) 0%, transparent 55%)",
                    }}
                  />
                </motion.div>

                {/* Float badge */}
                <motion.div
                  className="glass"
                  style={{
                    position: "absolute",
                    bottom: "32%",
                    left: "26%",
                    zIndex: 10,
                    padding: "16px 22px",
                    borderRadius: 4,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -9, 0] }}
                >
                  <p
                    className="dp gg"
                    style={{ fontSize: 28, fontWeight: 600 }}
                  >
                    98%
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
                    Guest Satisfaction
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── HORIZONTAL GALLERY ─────────────────────────────────────── */}
          <section
            ref={galleryRef}
            style={{
              height: "100vh",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              ref={galleryTrackRef}
              className="gal-track"
              style={{ height: "100%", paddingTop: 70, gap: 0 }}
            >
              {/* Title card */}
              <div
                style={{
                  width: "42vw",
                  minWidth: 340,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 40px 0 60px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 24,
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
                    Gallery
                  </span>
                </div>
                <h2
                  className="dp"
                  style={{
                    fontSize: "clamp(2.5rem, 4.5vw, 64px)",
                    lineHeight: 1.05,
                    color: "var(--fg)",
                  }}
                >
                  World-class
                  <br />
                  <span className="italic gg">Properties</span>
                  <br />
                  Trust Suulp
                </h2>
                <p
                  style={{
                    color: "var(--fg3)",
                    fontSize: "0.72rem",
                    marginTop: 20,
                  }}
                >
                  Scroll to explore →
                </p>
              </div>

              {/* Cards */}
              {GALLERY.map((img, i) => (
                <div
                  key={i}
                  className="img-scale"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 4,
                    flexShrink: 0,
                    width: i % 2 === 0 ? "28vw" : "23vw",
                    minWidth: 240,
                    height: i % 2 === 0 ? "64vh" : "54vh",
                    marginRight: 12,
                    marginTop: i % 2 === 0 ? "8vh" : "18vh",
                    border: "1px solid var(--brd)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
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
                        "linear-gradient(to top, rgba(7,7,8,0.72) 0%, transparent 55%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 22, left: 22 }}>
                    <p
                      className="dp"
                      style={{ fontSize: 20, color: "rgba(243,238,229,0.9)" }}
                    >
                      {img.label}
                    </p>
                    <div
                      style={{
                        height: 1,
                        width: 28,
                        background: "var(--cg)",
                        opacity: 0.55,
                        marginTop: 8,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div style={{ width: "8vw", flexShrink: 0 }} />
            </div>
          </section>

          {/* ── FEATURES ────────────────────────────────────────────────── */}
          <section
            style={{ padding: "96px 40px", maxWidth: 1600, margin: "0 auto" }}
          >
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
                    Features
                  </span>
                </div>
                <motion.h2
                  className="dp"
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 62px)",
                    lineHeight: 1.05,
                    color: "var(--fg)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  Crafted for <span className="italic gg">Excellence</span>
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
                Every feature engineered to the standard of the world's finest
                hospitality operations.
              </p>
            </div>

            <div
              className="feat-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 1,
                background: "var(--brd)",
              }}
            >
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    className="feat-card shimmer-hover card-wrap"
                    style={{
                      background: "var(--bg)",
                      padding: "40px 36px",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "none",
                    }}
                    whileHover={{
                      rotateX: -5,
                      rotateY: 5,
                      scale: 1.01,
                      zIndex: 10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 32,
                      }}
                    >
                      <Icon size={20} color="var(--cg)" strokeWidth={1.5} />
                      <span
                        className="dp"
                        style={{
                          fontSize: 44,
                          fontWeight: 700,
                          color: "var(--brd)",
                          lineHeight: 1,
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 1,
                        width: 24,
                        background: "var(--cg)",
                        marginBottom: 20,
                        transition: "width 0.4s",
                        opacity: 0.6,
                      }}
                    />
                    <h3
                      className="dp"
                      style={{
                        fontSize: 20,
                        color: "var(--fg)",
                        marginBottom: 12,
                        transition: "color 0.3s",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        color: "var(--fg2)",
                        fontSize: "0.82rem",
                        lineHeight: 1.82,
                      }}
                    >
                      {f.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── QUOTE ───────────────────────────────────────────────────── */}
          <section
            style={{
              padding: "80px 40px",
              background: "var(--bg2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Spinning rings */}
            {[500, 650].map((sz, ri) => (
              <div
                key={ri}
                style={{
                  position: "absolute",
                  width: sz,
                  height: sz,
                  border: `1px solid rgba(191,160,106,${0.04 + ri * 0.02})`,
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  marginLeft: -sz / 2,
                  marginTop: -sz / 2,
                }}
                className={ri === 0 ? "rs" : "rsr"}
              />
            ))}
            <div
              style={{
                maxWidth: 760,
                margin: "0 auto",
                textAlign: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              <motion.div
                style={{
                  width: 1,
                  height: 60,
                  background:
                    "linear-gradient(to bottom, transparent, var(--cg))",
                  opacity: 0.35,
                  margin: "0 auto 36px",
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.blockquote
                className="dp italic"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 38px)",
                  lineHeight: 1.55,
                  color: "var(--fg)",
                  opacity: 0.84,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.84, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
              >
                "The art of hospitality is not a service — it is a{" "}
                <span
                  className="gg not-italic"
                  style={{ fontStyle: "normal", fontWeight: 600 }}
                >
                  profound expression
                </span>{" "}
                of human connection."
              </motion.blockquote>
              <motion.div
                style={{
                  width: 1,
                  height: 60,
                  background: "linear-gradient(to top, transparent, var(--cg))",
                  opacity: 0.35,
                  margin: "36px auto 0",
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>
          </section>

          {/* ── PRICING ─────────────────────────────────────────────────── */}
          <section
            style={{ padding: "96px 40px", maxWidth: 1600, margin: "0 auto" }}
          >
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  Investment
                </span>
                <div
                  style={{ height: 1, width: 28, background: "var(--cg)" }}
                />
              </div>
              <motion.h2
                className="dp"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 62px)",
                  lineHeight: 1.05,
                  color: "var(--fg)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                Choose Your <span className="italic gg">Reign</span>
              </motion.h2>
            </div>

            <div
              className="price-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                border: "1px solid var(--brd)",
                borderRadius: 4,
                overflow: "hidden",
                gap: 1,
                background: "var(--brd)",
              }}
            >
              {PLANS.map((plan, i) => (
                <div
                  key={i}
                  className="price-card"
                  style={{
                    padding: "40px 36px",
                    background: plan.hi
                      ? "linear-gradient(160deg, var(--bg2), var(--bg))"
                      : "var(--bg)",
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
                          "linear-gradient(90deg, transparent, var(--cg), transparent)",
                      }}
                    />
                  )}
                  {plan.hi && (
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
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3
                    className="dp"
                    style={{
                      fontSize: 18,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--fg)",
                      opacity: 0.65,
                      marginBottom: 8,
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--fg3)",
                      marginBottom: 24,
                    }}
                  >
                    {plan.desc}
                  </p>
                  <div style={{ marginBottom: 28 }}>
                    <span
                      className="dp gg"
                      style={{ fontSize: 48, fontWeight: 600 }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--fg3)",
                          marginLeft: 6,
                        }}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <MagneticButton style={{ width: "100%", marginBottom: 28 }}>
                    <button
                      className={plan.hi ? "bg" : "bo"}
                      style={{
                        width: "100%",
                        padding: "14px 0",
                        borderRadius: 3,
                      }}
                    >
                      {plan.cta}
                    </button>
                  </MagneticButton>
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
                      gap: 14,
                    }}
                  >
                    {plan.features.map((ft, fi) => (
                      <li
                        key={fi}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            height: 1,
                            width: 18,
                            flexShrink: 0,
                            background: "var(--cg)",
                            opacity: 0.5,
                          }}
                        />
                        <span
                          style={{ fontSize: "0.8rem", color: "var(--fg2)" }}
                        >
                          {ft}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <section
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "120px 40px",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80"
              alt="Pool"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: dark
                  ? "brightness(0.11) saturate(0.25)"
                  : "brightness(0.07) saturate(0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: dark
                  ? "rgba(7,7,8,0.72)"
                  : "rgba(246,243,237,0.82)",
              }}
            />
            {[380, 520, 660].map((sz, ri) => (
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
                className={ri % 2 === 0 ? "rs" : "rsr"}
              />
            ))}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                maxWidth: 680,
                margin: "0 auto",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                    marginBottom: 36,
                  }}
                >
                  <div
                    style={{
                      height: 1,
                      width: 60,
                      background:
                        "linear-gradient(to right, transparent, var(--cg))",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.42em",
                      textTransform: "uppercase",
                      color: "var(--cg)",
                    }}
                  >
                    Begin
                  </span>
                  <div
                    style={{
                      height: 1,
                      width: 60,
                      background:
                        "linear-gradient(to left, transparent, var(--cg))",
                    }}
                  />
                </div>
                <h2
                  className="dp"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 72px)",
                    lineHeight: 1.1,
                    color: "var(--fg)",
                    marginBottom: 24,
                  }}
                >
                  Ready to
                  <br />
                  <span className="italic gg">Transform</span>
                  <br />
                  Your Hotel?
                </h2>
                <p
                  style={{
                    color: "var(--fg2)",
                    fontSize: "0.87rem",
                    marginBottom: 40,
                    lineHeight: 1.85,
                  }}
                >
                  Join hundreds of luxury properties elevating every guest
                  experience with Suulp.
                </p>
                <MagneticButton style={{ display: "inline-block" }}>
                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="bg"
                      style={{
                        padding: "18px 60px",
                        borderRadius: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        fontSize: "0.72rem",
                      }}
                    >
                      Start Free Trial <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </section>

          {/* ── FOOTER ──────────────────────────────────────────────────── */}
          <footer
            style={{
              borderTop: "1px solid var(--brd)",
              padding: "40px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              maxWidth: 1600,
              margin: "0 auto",
            }}
          >
            <ScrambleText
              text="SUULP"
              className="dp gg"
              style={{ fontSize: 20, letterSpacing: "0.35em", fontWeight: 600 }}
            />
            <div style={{ display: "flex", gap: 36 }}>
              {["Privacy", "Terms", "Security", "Status"].map((l) => (
                <Link key={l} href={`/${l.toLowerCase()}`} className="na">
                  {l}
                </Link>
              ))}
            </div>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--fg3)",
              }}
            >
              © 2026 Suulp — All Rights Reserved
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
