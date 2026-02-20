"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ArrowRight,
  Paintbrush,
  Layers,
  Users,
  Mic,
  Database,
  Smartphone,
  Globe,
  Shield,
  Download,
  BarChart3,
  Puzzle,
  Moon,
  Sun,
  Code,
} from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATION PRIMITIVES
═══════════════════════════════════════════════════════════════════════════ */

/** Dual-ring liquid cursor with click-squish + blend-mode difference */
function LiquidCursor({ isDark }: { isDark: boolean }) {
  const cx = useMotionValue(-200),
    cy = useMotionValue(-200);
  const fx = useSpring(cx, { stiffness: 52, damping: 16 });
  const fy = useSpring(cy, { stiffness: 52, damping: 16 });
  const [hov, setHov] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    const over = (e: Event) => {
      const el = (e.target as HTMLElement).closest("button,a,[data-hover]");
      setHov(!!el);
    };
    const dn = () => setClick(true);
    const up = () => setClick(false);
    window.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const gold = isDark ? "#BFA06A" : "#7A5C2A";
  const dotSize = click ? 4 : 8;
  const ringSize = hov ? 54 : click ? 26 : 34;

  return (
    <>
      <motion.div
        style={{
          x: cx,
          y: cy,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          background: gold,
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          transition: "width 0.12s, height 0.12s",
        }}
      />
      <motion.div
        style={{
          x: fx,
          y: fy,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          border: `1px solid ${gold}`,
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: hov ? 0.7 : 0.28,
          mixBlendMode: "difference",
          transition:
            "width 0.4s cubic-bezier(.23,1,.32,1),height 0.4s cubic-bezier(.23,1,.32,1)",
        }}
      />
      {/* Trailing trail dot */}
      <motion.div
        style={{
          x: useSpring(cx, { stiffness: 20, damping: 10 }),
          y: useSpring(cy, { stiffness: 20, damping: 10 }),
          translateX: "-50%",
          translateY: "-50%",
          width: 3,
          height: 3,
          background: gold,
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9997,
          pointerEvents: "none",
          opacity: 0.25,
        }}
      />
    </>
  );
}

/** Canvas particle field — reacts to mouse, draws constellation lines */
function ParticleField({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let W = (c.width = window.innerWidth);
    let H = (c.height = window.innerHeight);
    let mouse = { x: W / 2, y: H / 2 };
    const N = 90;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random() * 0.35 + 0.07,
    }));
    const onMv = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const onRz = () => {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    };
    window.addEventListener("mousemove", onMv);
    window.addEventListener("resize", onRz);
    const rgb = isDark ? "191,160,106" : "100,70,25";
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        const dx = mouse.x - p.x,
          dy = mouse.y - p.y,
          d = Math.hypot(dx, dy);
        if (d < 180) {
          p.vx += dx * 0.000065;
          p.vy += dy * 0.000065;
        }
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / 115) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMv);
      window.removeEventListener("resize", onRz);
    };
  }, [isDark]);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

/** SVG morphing blob — two paths that animate between keyframe shapes */
function MorphBlob({ isDark }: { isDark: boolean }) {
  const paths = [
    "M420,180 C490,95 590,120 615,228 C640,336 562,448 462,452 C362,456 285,378 272,282 C259,186 350,265 420,180Z",
    "M400,165 C475,85 580,108 608,218 C636,328 555,445 448,450 C341,455 270,368 262,268 C254,168 325,245 400,165Z",
    "M440,195 C508,108 598,138 622,242 C646,346 565,452 462,455 C359,458 282,382 276,284 C270,186 372,282 440,195Z",
    "M410,172 C482,90 588,115 614,224 C640,333 558,447 455,451 C352,455 278,373 268,276 C258,179 338,254 410,172Z",
  ];
  const stroke = isDark ? "#BFA06A" : "#7A5C2A";
  return (
    <svg
      viewBox="180 50 530 470"
      style={{
        position: "absolute",
        right: "-8%",
        top: "-12%",
        width: "58%",
        height: "120%",
        opacity: isDark ? 0.045 : 0.065,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <motion.path
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        d={paths[0]}
        animate={{ d: paths }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <motion.path
        fill="none"
        stroke={stroke}
        strokeWidth={0.5}
        opacity={0.5}
        d={paths[2]}
        animate={{ d: [...paths].reverse() }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/** Spring-powered magnetic button wrapper */
function Mag({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 175, damping: 18 });
  const sy = useSpring(y, { stiffness: 175, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block", ...style }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.32);
        y.set((e.clientY - r.top - r.height / 2) * 0.32);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Character scramble — fires on hover and on external `trigger` */
function Scramble({ text, className, style, trigger }: any) {
  const [disp, setDisp] = useState(text);
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%";
  const raf = useRef<number>(0);
  const run = useCallback(() => {
    let it = 0;
    cancelAnimationFrame(raf.current);
    const tick = () => {
      setDisp(
        text
          .split("")
          .map((c: string, i: number) =>
            i < it / 2.6 ? c : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      it++;
      if (it < text.length * 3) raf.current = requestAnimationFrame(tick);
      else setDisp(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);
  useEffect(() => {
    if (trigger) run();
  }, [trigger]);
  return (
    <span className={className} style={style} onMouseEnter={run}>
      {disp}
    </span>
  );
}

/** Typewriter with multi-phrase cycling + blinking caret */
function Typewriter({ phrases }: { phrases: string[] }) {
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [disp, setDisp] = useState("");
  useEffect(() => {
    const ph = phrases[pi];
    let t: ReturnType<typeof setTimeout>;
    if (!del && ci < ph.length)
      t = setTimeout(() => {
        setDisp(ph.slice(0, ci + 1));
        setCi(ci + 1);
      }, 58);
    else if (!del && ci === ph.length) t = setTimeout(() => setDel(true), 2400);
    else if (del && ci > 0)
      t = setTimeout(() => {
        setDisp(ph.slice(0, ci - 1));
        setCi(ci - 1);
      }, 26);
    else if (del && ci === 0) {
      setDel(false);
      setPi((pi + 1) % phrases.length);
    }
    return () => clearTimeout(t);
  }, [ci, del, pi, phrases]);
  return (
    <span>
      {disp}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.85, repeat: Infinity }}
        style={{
          display: "inline-block",
          width: 2,
          height: "1.1em",
          background: "var(--cg)",
          marginLeft: 3,
          verticalAlign: "middle",
        }}
      />
    </span>
  );
}

/** Odometer-style animated number using framer animate() */
function Odometer({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !fired.current) {
          fired.current = true;
          const ctrl = animate(0, to, {
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setVal(Math.floor(v)),
          });
          return ctrl.stop;
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Word-by-word stagger reveal from below */
function WordReveal({ children, delay = 0, className, style }: any) {
  const words = String(children).split(" ");
  return (
    <span className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: ".24em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.05,
              delay: delay + i * 0.075,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Character wave text — each char rises in sequence when inView */
function WaveChars({ text, className, style, inView }: any) {
  return (
    <span
      className={className}
      style={{ ...style, display: "inline-flex", flexWrap: "wrap" }}
    >
      {text.split("").map((ch: string, i: number) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ y: 22, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.55,
            delay: i * 0.028,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/** 3-D flip card — rotates on hover to reveal back content */
function FlipCard({
  tag,
  front,
  back,
}: {
  tag: string;
  front: string;
  back: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      data-hover="true"
      style={{ perspective: 1000, height: 180, cursor: "none" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.62, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "var(--cbg)",
            border: "1px solid var(--brd)",
            borderRadius: 4,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(14px)",
          }}
        >
          <span
            style={{
              fontSize: ".56rem",
              letterSpacing: ".38em",
              textTransform: "uppercase",
              color: "var(--cg)",
            }}
          >
            {tag}
          </span>
          <h3
            className="dp"
            style={{ fontSize: 19, color: "var(--fg)", lineHeight: 1.22 }}
          >
            {front}
          </h3>
        </div>
        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(135deg,rgba(191,160,106,.14),rgba(191,160,106,.04))",
            border: "1px solid rgba(191,160,106,.32)",
            borderRadius: 4,
            padding: "28px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotateY(180deg)",
            backdropFilter: "blur(14px)",
          }}
        >
          <p
            style={{
              fontSize: ".82rem",
              color: "var(--fg2)",
              lineHeight: 1.82,
              textAlign: "center",
            }}
          >
            {back}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/** SVG animated draw line — strokes from 0 to full width when inView */
function DrawLine({ inView }: { inView: boolean }) {
  return (
    <svg
      width="100%"
      height="2"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="gl1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#BFA06A" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <motion.line
        x1="0"
        y1="1"
        x2="100%"
        y2="1"
        stroke="url(#gl1)"
        strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════════════════════════ */

// All images are SaaS / tech / workspace / people building — relevant to platform
const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    label: "AI Builder",
    tag: "01",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    label: "Analytics",
    tag: "02",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
    label: "Team Collab",
    tag: "03",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    label: "Data Insights",
    tag: "04",
  },
  {
    src: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=900&q=80",
    label: "Development",
    tag: "05",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80",
    label: "Dashboards",
    tag: "06",
  },
];

const FEATURES = [
  {
    icon: Paintbrush,
    n: "01",
    title: "AI Website Builder",
    desc: "Describe your business in plain language. Our AI generates a complete, live, production-ready website in under 60 seconds — with copy, layout, and pages tailored to your industry.",
  },
  {
    icon: Layers,
    n: "02",
    title: "Drag & Drop CMS",
    desc: "Visual, no-code content management. Your team publishes pages, updates content, and manages media without raising a single developer ticket.",
  },
  {
    icon: Users,
    n: "03",
    title: "CRM & Customer Success",
    desc: "360° customer profiles, automated pipeline stages, support ticketing, NPS tracking, and churn prediction — unified in one intelligent workspace.",
  },
  {
    icon: Mic,
    n: "04",
    title: "ElevenLabs Voice AI",
    desc: "Deploy a human-sounding AI concierge powered by ElevenLabs. Handles calls, chats, and queries 24/7 in 30+ languages with smart escalation to your team.",
  },
  {
    icon: Database,
    n: "05",
    title: "Connected Database",
    desc: "Every site ships with a fully managed database. Build dynamic, data-driven experiences and apps without touching any infrastructure.",
  },
  {
    icon: Download,
    n: "06",
    title: "Export Your Code",
    desc: "Own your work forever. Export clean Next.js code at any time. No vendor lock-in. Your business, your codebase.",
  },
];

const FLIP_CARDS = [
  {
    tag: "AI Build",
    front: "Your site lives in 60 seconds",
    back: "Just describe your business — AI generates pages, copy, layout, and brand colors. Then edit with our visual composer.",
  },
  {
    tag: "CMS",
    front: "Content your team controls",
    back: "Drag, drop, publish. Schedule posts, manage media, support multi-language — all without touching code.",
  },
  {
    tag: "CRM",
    front: "Know every customer deeply",
    back: "Automated pipelines, 360° timelines, NPS alerts, and churn prediction built into every plan.",
  },
  {
    tag: "Voice AI",
    front: "AI answers while you sleep",
    back: "ElevenLabs voice synthesis handles support calls 24/7 in 30+ languages, escalating only when humans are truly needed.",
  },
  {
    tag: "Mobile",
    front: "iOS & Android auto-generated",
    back: "Every website automatically spawns a native mobile app. Zero extra development — it just appears.",
  },
  {
    tag: "Ownership",
    front: "Your code, always",
    back: "Export production-ready Next.js at any time. The only platform that hands you the keys instead of locking the door.",
  },
];

const PLANS = [
  {
    name: "Spark",
    price: "$29",
    period: "/mo",
    desc: "Solo founders",
    hi: false,
    features: [
      "1 website",
      "AI builder (3/mo)",
      "Basic CMS",
      "CRM – 500 contacts",
      "Suulp subdomain",
      "5 GB storage",
    ],
    cta: "Start Free",
  },
  {
    name: "Sovereign",
    price: "$99",
    period: "/mo",
    desc: "Growing businesses",
    hi: true,
    features: [
      "5 websites",
      "Unlimited AI builds",
      "Full CMS + CRM",
      "AI Voice Concierge",
      "Custom domain",
      "Mobile apps",
      "API access",
      "50 GB storage",
    ],
    cta: "Claim Your Reign",
  },
  {
    name: "Dynasty",
    price: "Custom",
    period: "",
    desc: "Agencies & enterprise",
    hi: false,
    features: [
      "Unlimited sites",
      "White-label platform",
      "Custom AI training",
      "Unlimited contacts",
      "Dedicated manager",
      "SLA 99.99%",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE CSS
═══════════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&display=swap');

/* ── Reset ── */
*{cursor:none;box-sizing:border-box;margin:0;padding:0}

/* ── Themes ── */
.dk{
  --bg:#07070A;--bg2:#0D0D11;--bg3:#131318;
  --fg:#F2EDE3;--fg2:rgba(242,237,227,.52);--fg3:rgba(242,237,227,.17);
  --brd:rgba(191,160,106,.1);--cbg:rgba(255,255,255,.013);--cg:#BFA06A;
}
.lk{
  --bg:#F3EFE8;--bg2:#EAE5DC;--bg3:#DDD7CC;
  --fg:#17120A;--fg2:rgba(23,18,10,.52);--fg3:rgba(23,18,10,.18);
  --brd:rgba(191,160,106,.2);--cbg:rgba(255,255,255,.55);--cg:#7A5C2A;
}

/* ── Base ── */
body{background:var(--bg);color:var(--fg);font-family:'DM Sans',sans-serif;font-weight:300;transition:background .5s,color .5s;overflow-x:hidden}
.dp{font-family:'Playfair Display',serif}
.gg{background:linear-gradient(135deg,#BFA06A 0%,#E2C98A 42%,#BFA06A 72%,#7A5C2A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.glass{background:var(--cbg);backdrop-filter:blur(22px) saturate(1.4);border:1px solid var(--brd)}

/* ── Noise overlay ── */
.noise{position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.018;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

/* ── Buttons ── */
.bg{background:linear-gradient(120deg,#BFA06A,#E2C98A,#BFA06A);background-size:200% auto;color:#07060A;font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.13em;text-transform:uppercase;font-size:.69rem;border:none;transition:background-position .6s,box-shadow .35s}
.bg:hover{background-position:right center;box-shadow:0 14px 50px rgba(191,160,106,.42)}
.bo{border:1px solid var(--brd);color:var(--cg);font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.13em;text-transform:uppercase;font-size:.69rem;background:none;position:relative;overflow:hidden;transition:border-color .4s}
.bo::after{content:'';position:absolute;inset:0;background:rgba(191,160,106,.07);transform:translateX(-101%);transition:transform .42s}
.bo:hover::after{transform:translateX(0)}.bo:hover{border-color:rgba(191,160,106,.42)}

/* ── Nav links ── */
.na{font-family:'DM Sans',sans-serif;font-size:.63rem;letter-spacing:.22em;text-transform:uppercase;color:var(--fg2);transition:color .3s;position:relative;text-decoration:none}
.na::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--cg);transition:width .34s}
.na:hover{color:var(--cg)}.na:hover::after{width:100%}

/* ── Utility ── */
.lo{overflow:hidden}
.gl{height:1px;background:linear-gradient(90deg,transparent,#BFA06A,transparent)}

/* ── Progress bar ── */
.prog{position:fixed;top:0;left:0;right:0;height:2px;background:var(--bg3);z-index:1000}

/* ── Gallery track ── */
.gal-t{will-change:transform;display:flex;align-items:center}

/* ── Image zoom ── */
.iz img{transition:transform .65s cubic-bezier(.23,1,.32,1)}
.iz:hover img{transform:scale(1.06)}

/* ── Feature card shimmer ── */
.fc{position:relative;overflow:hidden}
.fc::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 20%,rgba(191,160,106,.055) 50%,transparent 80%);background-size:200% auto;opacity:0;transition:opacity .3s}
.fc:hover::before{opacity:1;animation:shimmer 1.9s linear infinite}

/* ── Marquee ── */
.mq{display:flex;width:max-content}

/* ── Animations ── */
@keyframes f1{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-19px) rotate(2.2deg)}}
@keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px) rotate(-1.5deg)}}
@keyframes rs{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes rsr{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
@keyframes bth{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pls{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}

.fl1{animation:f1 7s ease-in-out infinite}
.fl2{animation:f2 9.5s ease-in-out infinite}
.rs{animation:rs 22s linear infinite}
.rsr{animation:rsr 29s linear infinite}
.bth{animation:bth 4s ease-in-out infinite}
.pls{animation:pls 2s ease-in-out infinite}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galRef = useRef<HTMLDivElement>(null);
  const galTrackRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresTitleRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<HTMLDivElement>(null);

  const statsInView = useInView(statsRef, { once: true });
  const ftInView = useInView(featuresTitleRef, { once: true });
  const drawInView = useInView(drawRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroScroll = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOp = useTransform(heroScroll.scrollYProgress, [0, 0.68], [1, 0]);

  /* ── GSAP effects ── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 980);

    const ctx = gsap.context(() => {
      /* Feature cards: 3-D tilt + fade */
      gsap.fromTo(
        ".feat-card",
        { opacity: 0, y: 76, rotateX: 14, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: ".feat-grid",
            start: "top 82%",
            end: "bottom 38%",
            scrub: 1.35,
          },
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          stagger: 0.075,
        },
      );

      /* Pricing cards: scale up */
      gsap.fromTo(
        ".price-card",
        { opacity: 0, y: 96, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: ".price-grid",
            start: "top 82%",
            end: "top 22%",
            scrub: 1.1,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.11,
        },
      );

      /* Flip cards: rotateY from side */
      gsap.fromTo(
        ".flip-item",
        { opacity: 0, y: 56, rotateY: -10 },
        {
          scrollTrigger: {
            trigger: ".flip-grid",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: 0.088,
        },
      );

      /* About image parallax */
      gsap.to(".ab-img1", {
        scrollTrigger: {
          trigger: ".about-sec",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -40,
      });
      gsap.to(".ab-img2", {
        scrollTrigger: {
          trigger: ".about-sec",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 40,
      });

      /* Marquee */
      gsap.to(".mq", { x: "-50%", duration: 32, repeat: -1, ease: "linear" });

      /* Horizontal gallery pin */
      if (galTrackRef.current && galRef.current) {
        const sw = galTrackRef.current.scrollWidth - window.innerWidth;
        gsap.to(galTrackRef.current, {
          x: () => -sw,
          ease: "none",
          scrollTrigger: {
            trigger: galRef.current,
            start: "top top",
            end: () => `+=${sw}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    }, containerRef);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [loaded]);

  /* ── RE-INIT GALLERY AFTER LOAD ── */
  useEffect(() => {
    if (!loaded) return;
    ScrollTrigger.refresh();
  }, [loaded]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="noise" />
      <LiquidCursor isDark={isDark} />

      {/* Progress bar */}
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

      {/* ──────────────────── LOADER ──────────────────── */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg)",
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <div style={{ textAlign: "center", position: "relative" }}>
              {/* Concentric spinning rings */}
              {[170, 240, 310, 390].map((sz, ri) => (
                <motion.div
                  key={ri}
                  style={{
                    position: "absolute",
                    width: sz,
                    height: sz,
                    border: `1px solid rgba(191,160,106,${0.055 + ri * 0.022})`,
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
                    scale: { duration: 0.85, delay: ri * 0.07 },
                    opacity: { duration: 0.55, delay: ri * 0.07 },
                    rotate: {
                      duration: 18 + ri * 5,
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
                  letterSpacing: ".4em",
                  fontWeight: 600,
                  position: "relative",
                  zIndex: 10,
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.85 }}
              >
                SUULP
              </motion.p>
              <motion.div
                className="gl"
                style={{ maxWidth: 210, margin: "10px auto 0" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.55 }}
              />
              <motion.p
                style={{
                  fontSize: ".54rem",
                  letterSpacing: ".5em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginTop: 14,
                  position: "relative",
                  zIndex: 10,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
              >
                Building Your Empire
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
        {/* ──────────────────── NAV ──────────────────── */}
        <motion.nav
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
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
            background: isDark ? "rgba(7,7,10,.74)" : "rgba(243,239,232,.8)",
          }}
        >
          <Scramble
            text="SUULP"
            className="dp gg"
            trigger={loaded}
            style={{ fontSize: 20, letterSpacing: ".34em", fontWeight: 600 }}
          />

          <div style={{ display: "flex", gap: 36 }}>
            {["Features", "Pricing", "About", "Contact"].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="na">
                {l}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* Theme toggle */}
            <button
              data-hover="true"
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                borderRadius: 20,
                border: "1px solid var(--brd)",
                background: "var(--cbg)",
                backdropFilter: "blur(10px)",
                transition: "all .4s",
              }}
            >
              <motion.div
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.5 }}
              >
                {isDark ? (
                  <Moon size={12} color="#BFA06A" />
                ) : (
                  <Sun size={12} color="#7A5C2A" />
                )}
              </motion.div>
              <span
                style={{
                  fontSize: ".58rem",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--fg2)",
                }}
              >
                {isDark ? "Dark" : "Light"}
              </span>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: isDark ? "#BFA06A" : "#7A5C2A",
                  transition: "background .4s",
                }}
              />
            </button>
            <Link href="/login" className="na">
              Sign in
            </Link>
            <Mag>
              <Link href="/signup">
                <button
                  className="bg"
                  style={{ padding: "10px 26px", borderRadius: 3 }}
                >
                  Start Free
                </button>
              </Link>
            </Mag>
          </div>
        </motion.nav>

        {/* ──────────────────── HERO ──────────────────── */}
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
          {/* Particle field */}
          <ParticleField isDark={isDark} />
          {/* Morphing blob */}
          <MorphBlob isDark={isDark} />

          {/* Parallax BG image — people working / tech context */}
          <motion.div
            style={{ position: "absolute", inset: 0, y: heroY, zIndex: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1900&q=80"
              alt="Team building products"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: isDark
                  ? "brightness(.16) saturate(.28)"
                  : "brightness(.1) saturate(.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isDark
                  ? "linear-gradient(135deg,var(--bg) 28%,rgba(7,7,10,.58) 62%,transparent)"
                  : "linear-gradient(135deg,var(--bg) 28%,rgba(243,239,232,.5) 62%,transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top,var(--bg) 7%,transparent 54%)",
              }}
            />
          </motion.div>

          {/* Decorative rings */}
          <div
            style={{
              position: "absolute",
              right: "5%",
              top: "14%",
              opacity: 0.1,
              pointerEvents: "none",
            }}
            className="fl1"
          >
            <div
              style={{
                width: 330,
                height: 330,
                border: "1px solid var(--cg)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: "9%",
              top: "20%",
              opacity: 0.04,
              pointerEvents: "none",
            }}
            className="fl2"
          >
            <div
              style={{
                width: 175,
                height: 175,
                border: "1px solid var(--cg)",
                borderRadius: "50%",
              }}
            />
          </div>

          {/* Vertical side label */}
          <div
            style={{
              position: "absolute",
              left: 16,
              top: "52%",
              transform: "translateY(-50%)",
              writingMode: "vertical-rl",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 11,
              opacity: 0.35,
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: ".52rem",
                letterSpacing: ".4em",
                textTransform: "uppercase",
                color: "var(--fg3)",
              }}
            >
              AI Platform Builder
            </span>
            <div style={{ width: 1, height: 58, background: "var(--cg)" }} />
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
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 36,
                paddingTop: 108,
              }}
            >
              <div style={{ height: 1, width: 36, background: "var(--cg)" }} />
              <span
                style={{
                  fontSize: ".58rem",
                  letterSpacing: ".46em",
                  textTransform: "uppercase",
                  color: "var(--cg)",
                }}
              >
                Est. 2026 — Build. Launch. Own.
              </span>
            </motion.div>

            {/* Giant headline — 3 lines, word-by-word */}
            <div className="lo">
              <h1
                className="dp gg"
                style={{
                  fontSize: "clamp(4rem,11vw,148px)",
                  lineHeight: 0.88,
                  letterSpacing: "-.022em",
                  marginBottom: 5,
                }}
              >
                <WordReveal delay={1.28}>Build</WordReveal>
              </h1>
            </div>
            <div className="lo">
              <h1
                className="dp"
                style={{
                  fontSize: "clamp(4rem,11vw,148px)",
                  lineHeight: 0.88,
                  letterSpacing: "-.022em",
                  color: `rgba(${isDark ? "242,237,227" : "23,18,10"},.87)`,
                  marginBottom: 5,
                }}
              >
                <WordReveal delay={1.42}>Your Entire</WordReveal>
              </h1>
            </div>
            <div className="lo">
              <h1
                className="dp"
                style={{
                  fontSize: "clamp(4rem,11vw,148px)",
                  lineHeight: 0.88,
                  letterSpacing: "-.022em",
                  fontStyle: "italic",
                  color: `rgba(${isDark ? "242,237,227" : "23,18,10"},.2)`,
                }}
              >
                <WordReveal delay={1.58}>Business.</WordReveal>
              </h1>
            </div>

            {/* Typewriter sub-headline + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.85 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 32,
                marginTop: 44,
              }}
            >
              <div style={{ maxWidth: 430 }}>
                <p
                  style={{
                    fontSize: ".87rem",
                    color: "var(--fg2)",
                    lineHeight: 1.9,
                    marginBottom: 12,
                  }}
                >
                  AI builds your website in 60 seconds. CMS manages your
                  content. CRM knows every customer. Voice AI handles support.
                  Mobile apps ship automatically.
                </p>
                <p
                  style={{
                    fontSize: ".84rem",
                    color: "var(--cg)",
                    fontFamily: "'DM Sans'",
                    fontWeight: 400,
                  }}
                >
                  <Typewriter
                    phrases={[
                      "Your website, live in 60 seconds.",
                      "ElevenLabs Voice AI for support.",
                      "Export clean Next.js code. Always.",
                      "CRM + CSM in one workspace.",
                      "iOS & Android apps. Auto-generated.",
                    ]}
                  />
                </p>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Mag>
                  <Link href="/signup">
                    <button
                      className="bg"
                      style={{
                        padding: "17px 46px",
                        borderRadius: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 11,
                      }}
                    >
                      Start Building Free <ArrowRight size={14} />
                    </button>
                  </Link>
                </Mag>
                <Mag>
                  <Link href="/features">
                    <button
                      className="bo"
                      style={{ padding: "17px 44px", borderRadius: 3 }}
                    >
                      How It Works
                    </button>
                  </Link>
                </Mag>
              </div>
            </motion.div>

            {/* Odometer stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 1 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 52,
                marginTop: 56,
              }}
            >
              {[
                { to: 12000, s: "+", l: "Sites Built", p: "" },
                { to: 40, s: "+", l: "Countries", p: "" },
                { to: 99, s: ".9%", l: "Uptime SLA", p: "" },
                { to: 2400000, s: "+", l: "Revenue Powered", p: "$" },
              ].map(({ to, s, l, p }) => (
                <div key={l}>
                  <p
                    className="dp gg"
                    style={{ fontSize: 36, fontWeight: 600 }}
                  >
                    {statsInView ? (
                      <Odometer to={to} suffix={s} prefix={p} />
                    ) : (
                      `${p}0${s}`
                    )}
                  </p>
                  <p
                    style={{
                      fontSize: ".56rem",
                      letterSpacing: ".33em",
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
              bottom: 34,
              right: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
            animate={{ y: [0, 13, 0] }}
            transition={{ duration: 2.6, repeat: Infinity }}
          >
            <div
              style={{
                width: 1,
                height: 58,
                background: "linear-gradient(to bottom,var(--cg),transparent)",
                opacity: 0.42,
              }}
            />
            <span
              style={{
                fontSize: ".5rem",
                letterSpacing: ".42em",
                textTransform: "uppercase",
                color: "var(--fg3)",
              }}
            >
              Scroll
            </span>
          </motion.div>
        </section>

        {/* ──────────────────── MARQUEE ──────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--brd)",
            borderBottom: "1px solid var(--brd)",
            padding: "12px 0",
            overflow: "hidden",
          }}
        >
          <div className="mq">
            {[...Array(8)].flatMap((_, ri) =>
              [
                "AI Website Builder",
                "Drag & Drop CMS",
                "CRM & Customer Success",
                "ElevenLabs Voice AI",
                "Custom Domain & SSL",
                "Connected Database",
                "iOS & Android Apps",
                "Export Next.js Code",
                "Community Plugins",
                "Revenue Analytics",
              ].map((t, i) => (
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
                      fontSize: ".58rem",
                      letterSpacing: ".42em",
                      textTransform: "uppercase",
                      color: "var(--fg3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t}
                  </span>
                  <svg width="3" height="3">
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      fill="var(--cg)"
                      opacity=".38"
                    />
                  </svg>
                </div>
              )),
            )}
          </div>
        </div>

        {/* ──────────────────── ABOUT / MISSION SPLIT ──────────────────── */}
        <section
          className="about-sec"
          style={{ padding: "96px 40px", maxWidth: 1600, margin: "0 auto" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: 72,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 26,
                }}
              >
                <div
                  style={{ height: 1, width: 28, background: "var(--cg)" }}
                />
                <span
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".44em",
                    textTransform: "uppercase",
                    color: "var(--cg)",
                  }}
                >
                  What Is Suulp
                </span>
              </div>
              <motion.h2
                className="dp"
                style={{
                  fontSize: "clamp(2rem,4.5vw,58px)",
                  lineHeight: 1.08,
                  color: "var(--fg)",
                  marginBottom: 26,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                The only platform your business will ever need.
                <span className="italic gg"> Build. Manage. Grow.</span>
              </motion.h2>

              <div ref={drawRef} style={{ marginBottom: 26 }}>
                <DrawLine inView={drawInView} />
              </div>

              <p
                style={{
                  color: "var(--fg2)",
                  lineHeight: 1.9,
                  fontSize: ".87rem",
                  maxWidth: 450,
                  marginBottom: 24,
                }}
              >
                Suulp is a royal SaaS platform builder — think Zoho meets
                Webflow meets ElevenLabs. One workspace: build your website with
                AI, manage customers with CRM & CSM, deploy a voice AI agent,
                publish native mobile apps, and export clean production code. No
                vendor lock-in. No 6-tool juggling act.
              </p>
              <p
                style={{
                  color: "var(--fg2)",
                  lineHeight: 1.9,
                  fontSize: ".87rem",
                  maxWidth: 450,
                  marginBottom: 30,
                }}
              >
                Founded in India 🇮🇳 by engineers who were tired of stitching 6
                different tools together just to run one business.
              </p>

              {[
                "Describe your business → AI builds your full site in 60s",
                "CMS, CRM, CSM, AI Voice — unified, not bolted together",
                "Export your Next.js code at any time — own it forever",
                "Community votes on what features get built next",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 14,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.09 }}
                  viewport={{ once: true }}
                >
                  <div
                    style={{
                      height: 1,
                      width: 22,
                      background: "var(--cg)",
                      opacity: 0.55,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: ".82rem", color: "var(--fg2)" }}>
                    {item}
                  </span>
                </motion.div>
              ))}

              <div style={{ marginTop: 36, display: "flex", gap: 14 }}>
                <Mag>
                  <Link href="/signup">
                    <button
                      className="bg"
                      style={{
                        padding: "14px 34px",
                        borderRadius: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      Start Free — 14 Days <ArrowRight size={13} />
                    </button>
                  </Link>
                </Mag>
                <Mag>
                  <Link href="/features">
                    <button
                      className="bo"
                      style={{ padding: "14px 26px", borderRadius: 3 }}
                    >
                      All Features
                    </button>
                  </Link>
                </Mag>
              </div>
            </div>

            {/* Image collage — SaaS/tech */}
            <div style={{ position: "relative", height: 500 }}>
              <motion.div
                className="iz ab-img1"
                style={{
                  position: "absolute",
                  width: "62%",
                  height: "66%",
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid var(--brd)",
                }}
                initial={{ opacity: 0, x: -40, rotate: -2.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: -1.4 }}
                transition={{ duration: 1.3 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80"
                  alt="Developer at work"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,var(--bg) 0%,transparent 58%)",
                  }}
                />
              </motion.div>

              <motion.div
                className="iz ab-img2"
                style={{
                  position: "absolute",
                  width: "56%",
                  height: "58%",
                  bottom: 0,
                  right: 0,
                  zIndex: 3,
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid var(--brd)",
                }}
                initial={{ opacity: 0, x: 40, rotate: 2.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 1.4 }}
                transition={{ duration: 1.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80"
                  alt="Analytics dashboard"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,var(--bg) 0%,transparent 58%)",
                  }}
                />
              </motion.div>

              {/* Floating stat badge */}
              <motion.div
                className="glass bth"
                style={{
                  position: "absolute",
                  bottom: "31%",
                  left: "22%",
                  zIndex: 10,
                  padding: "16px 22px",
                  borderRadius: 4,
                }}
                initial={{ opacity: 0, scale: 0.82 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="dp gg" style={{ fontSize: 30, fontWeight: 600 }}>
                  60s
                </p>
                <p
                  style={{
                    fontSize: ".54rem",
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    marginTop: 4,
                  }}
                >
                  AI Build Time
                </p>
              </motion.div>

              {/* Second float badge */}
              <motion.div
                className="glass"
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "4%",
                  zIndex: 10,
                  padding: "12px 18px",
                  borderRadius: 4,
                }}
                initial={{ opacity: 0, y: -18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0] }}
              >
                <p className="dp gg" style={{ fontSize: 22, fontWeight: 600 }}>
                  100%
                </p>
                <p
                  style={{
                    fontSize: ".52rem",
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    marginTop: 3,
                  }}
                >
                  Code Ownership
                </p>
              </motion.div>

              {/* Live indicator */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: "22%",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="pls"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#4ADE80",
                  }}
                />
                <span
                  style={{
                    fontSize: ".54rem",
                    letterSpacing: ".28em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                  }}
                >
                  12,000+ sites live now
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ──────────────────── HORIZONTAL GALLERY ──────────────────── */}
        <section
          ref={galRef}
          style={{ height: "100vh", overflow: "hidden", position: "relative" }}
        >
          <div
            ref={galTrackRef}
            className="gal-t"
            style={{ height: "100%", paddingTop: 70 }}
          >
            {/* Title panel */}
            <div
              style={{
                width: "40vw",
                minWidth: 320,
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
                    fontSize: ".58rem",
                    letterSpacing: ".42em",
                    textTransform: "uppercase",
                    color: "var(--cg)",
                  }}
                >
                  Platform
                </span>
              </div>
              <h2
                className="dp"
                style={{
                  fontSize: "clamp(2.5rem,4.5vw,64px)",
                  lineHeight: 1.05,
                  color: "var(--fg)",
                }}
              >
                Built for
                <br />
                <span className="italic gg">Builders</span>
                <br />
                Everywhere
              </h2>
              <p
                style={{
                  color: "var(--fg3)",
                  fontSize: ".72rem",
                  marginTop: 20,
                }}
              >
                Drag or scroll to explore →
              </p>
            </div>

            {/* Gallery cards — SaaS images only */}
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className="iz"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  flexShrink: 0,
                  width: i % 2 === 0 ? "28vw" : "23vw",
                  minWidth: 230,
                  height: i % 2 === 0 ? "64vh" : "54vh",
                  marginRight: 12,
                  marginTop: i % 2 === 0 ? "8vh" : "18vh",
                  border: "1px solid var(--brd)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,rgba(7,7,10,.76) 0%,transparent 55%)",
                  }}
                />
                <div style={{ position: "absolute", bottom: 22, left: 22 }}>
                  <span
                    style={{
                      fontSize: ".52rem",
                      letterSpacing: ".38em",
                      textTransform: "uppercase",
                      color: "var(--cg)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {img.tag}
                  </span>
                  <p
                    className="dp"
                    style={{ fontSize: 20, color: "rgba(242,237,227,.92)" }}
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

        {/* ──────────────────── FEATURES ──────────────────── */}
        <section
          style={{ padding: "96px 40px", maxWidth: 1600, margin: "0 auto" }}
        >
          <div
            ref={featuresTitleRef}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
              marginBottom: 54,
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
                    fontSize: ".58rem",
                    letterSpacing: ".42em",
                    textTransform: "uppercase",
                    color: "var(--cg)",
                  }}
                >
                  Features
                </span>
              </div>
              <h2
                className="dp"
                style={{
                  fontSize: "clamp(2.2rem,4.5vw,62px)",
                  lineHeight: 1.05,
                  color: "var(--fg)",
                }}
              >
                <WaveChars text="Crafted for Excellence" inView={ftInView} />
              </h2>
            </div>
            <p
              style={{
                color: "var(--fg2)",
                fontSize: ".87rem",
                lineHeight: 1.85,
                maxWidth: 360,
              }}
            >
              Every feature engineered to the standard of the world's most
              ambitious digital businesses — and priced so any founder can
              afford it from day one.
            </p>
          </div>

          <div
            className="feat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 1,
              background: "var(--brd)",
            }}
          >
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="feat-card fc"
                  style={{
                    background: "var(--bg)",
                    padding: "40px 36px",
                    cursor: "none",
                  }}
                  whileHover={{
                    rotateX: -4,
                    rotateY: 5,
                    scale: 1.012,
                    zIndex: 10,
                    background: "var(--bg2)",
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
                      {f.n}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 1,
                      width: 24,
                      background: "var(--cg)",
                      marginBottom: 20,
                      opacity: 0.6,
                    }}
                  />
                  <h3
                    className="dp"
                    style={{
                      fontSize: 20,
                      color: "var(--fg)",
                      marginBottom: 12,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--fg2)",
                      fontSize: ".82rem",
                      lineHeight: 1.84,
                    }}
                  >
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ──────────────────── 3D FLIP CARDS ──────────────────── */}
        <section style={{ padding: "80px 40px", background: "var(--bg2)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 28,
                marginBottom: 48,
              }}
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
                  <div
                    style={{ height: 1, width: 28, background: "var(--cg)" }}
                  />
                  <span
                    style={{
                      fontSize: ".58rem",
                      letterSpacing: ".42em",
                      textTransform: "uppercase",
                      color: "var(--cg)",
                    }}
                  >
                    How It Works
                  </span>
                </div>
                <motion.h2
                  className="dp"
                  style={{
                    fontSize: "clamp(2rem,4vw,54px)",
                    lineHeight: 1.06,
                    color: "var(--fg)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  Hover each card to
                  <br />
                  <span className="italic gg">reveal the magic.</span>
                </motion.h2>
              </div>
              <p
                style={{
                  color: "var(--fg2)",
                  fontSize: ".87rem",
                  lineHeight: 1.85,
                  maxWidth: 320,
                }}
              >
                Six core capabilities of Suulp. Hover any card to flip it and
                discover exactly what it does for your business.
              </p>
            </div>

            <div
              className="flip-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                gap: 16,
              }}
            >
              {FLIP_CARDS.map((card, i) => (
                <div key={i} className="flip-item" style={{ opacity: 0 }}>
                  <FlipCard
                    tag={card.tag}
                    front={card.front}
                    back={card.back}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────── QUOTE ──────────────────── */}
        <section
          style={{
            padding: "80px 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {[490, 640].map((sz, ri) => (
            <div
              key={ri}
              style={{
                position: "absolute",
                width: sz,
                height: sz,
                border: `1px solid rgba(191,160,106,${0.04 + ri * 0.018})`,
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
              maxWidth: 780,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <motion.div
              style={{
                width: 1,
                height: 62,
                background: "linear-gradient(to bottom,transparent,var(--cg))",
                opacity: 0.35,
                margin: "0 auto 36px",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.85 }}
              viewport={{ once: true }}
            />
            <motion.blockquote
              className="dp italic"
              style={{
                fontSize: "clamp(1.5rem,3vw,38px)",
                lineHeight: 1.56,
                color: "var(--fg)",
                opacity: 0.84,
              }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 0.84, y: 0 }}
              transition={{ duration: 1.3 }}
              viewport={{ once: true }}
            >
              "The best tools don't just solve problems — they{" "}
              <span
                className="gg"
                style={{ fontStyle: "normal", fontWeight: 600 }}
              >
                unlock ambitions
              </span>{" "}
              you didn't even know you had."
            </motion.blockquote>
            <motion.div
              style={{
                width: 1,
                height: 62,
                background: "linear-gradient(to top,transparent,var(--cg))",
                opacity: 0.35,
                margin: "36px auto 0",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.85, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        </section>

        {/* ──────────────────── PRICING ──────────────────── */}
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
              <div style={{ height: 1, width: 28, background: "var(--cg)" }} />
              <span
                style={{
                  fontSize: ".58rem",
                  letterSpacing: ".42em",
                  textTransform: "uppercase",
                  color: "var(--cg)",
                }}
              >
                Investment
              </span>
              <div style={{ height: 1, width: 28, background: "var(--cg)" }} />
            </div>
            <motion.h2
              className="dp"
              style={{
                fontSize: "clamp(2.2rem,4.5vw,62px)",
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
            <p
              style={{ color: "var(--fg2)", fontSize: ".84rem", marginTop: 14 }}
            >
              14-day free trial on all plans. No credit card required.
            </p>
          </div>

          <div
            className="price-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
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
                  position: "relative",
                  background: plan.hi
                    ? "linear-gradient(160deg,var(--bg2),var(--bg))"
                    : "var(--bg)",
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
                        fontSize: ".54rem",
                        letterSpacing: ".32em",
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
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    opacity: 0.65,
                    marginBottom: 7,
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontSize: ".7rem",
                    color: "var(--fg3)",
                    marginBottom: 24,
                  }}
                >
                  {plan.desc}
                </p>
                <div style={{ marginBottom: 28 }}>
                  <span
                    className="dp gg"
                    style={{ fontSize: 50, fontWeight: 600 }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      style={{
                        fontSize: ".7rem",
                        color: "var(--fg3)",
                        marginLeft: 6,
                      }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <Mag
                  style={{ width: "100%", marginBottom: 28, display: "block" }}
                >
                  <Link href={plan.price === "Custom" ? "/contact" : "/signup"}>
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
                  style={{ display: "flex", flexDirection: "column", gap: 13 }}
                >
                  {plan.features.map((ft, fi) => (
                    <li
                      key={fi}
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          height: 1,
                          width: 17,
                          flexShrink: 0,
                          background: "var(--cg)",
                          opacity: 0.5,
                        }}
                      />
                      <span style={{ fontSize: ".8rem", color: "var(--fg2)" }}>
                        {ft}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────── SOCIAL PROOF TICKER ──────────────────── */}
        <section
          style={{
            padding: "56px 40px",
            background: "var(--bg2)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: ".58rem",
                letterSpacing: ".42em",
                textTransform: "uppercase",
                color: "var(--fg3)",
              }}
            >
              Trusted by founders across
            </span>
            <span
              className="dp gg"
              style={{ fontSize: 18, marginLeft: 14, letterSpacing: ".1em" }}
            >
              40+ Countries
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: 1,
              background: "var(--brd)",
            }}
          >
            {[
              {
                name: "Priya R.",
                co: "StyleHive",
                quote:
                  "Suulp replaced 6 different tools. We launched our site in 60 seconds.",
              },
              {
                name: "Marcus T.",
                co: "FreightFlow",
                quote:
                  "The ElevenLabs voice AI handles 80% of our support calls. Unbelievable.",
              },
              {
                name: "Aiko S.",
                co: "NomadDesk",
                quote:
                  "Exported our Next.js code when we outgrew the platform. Zero lock-in.",
              },
              {
                name: "Lena M.",
                co: "ClearCo",
                quote:
                  "CRM + CSM in one place finally. Our sales pipeline has never been cleaner.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                style={{ background: "var(--bg)", padding: "36px 32px" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p
                  style={{
                    fontSize: ".84rem",
                    color: "var(--fg2)",
                    lineHeight: 1.82,
                    marginBottom: 22,
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 1,
                      background: "var(--cg)",
                      opacity: 0.5,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: ".72rem",
                        color: "var(--fg)",
                        fontWeight: 500,
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: ".62rem",
                        color: "var(--fg3)",
                        letterSpacing: ".1em",
                      }}
                    >
                      {t.co}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────────────────── CTA ──────────────────── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "120px 40px",
          }}
        >
          {/* BG image — SaaS team / startup */}
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1800&q=80"
            alt="Team collaborating"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: isDark
                ? "brightness(.09) saturate(.2)"
                : "brightness(.07) saturate(.17)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isDark ? "rgba(7,7,10,.77)" : "rgba(243,239,232,.9)",
            }}
          />
          {[370, 520, 660].map((sz, ri) => (
            <div
              key={ri}
              style={{
                position: "absolute",
                width: sz,
                height: sz,
                border: `1px solid rgba(191,160,106,${0.04 + ri * 0.014})`,
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
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 52 }}
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
                  marginBottom: 38,
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background:
                      "linear-gradient(to right,transparent,var(--cg))",
                  }}
                />
                <span
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".42em",
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
                      "linear-gradient(to left,transparent,var(--cg))",
                  }}
                />
              </div>
              <h2
                className="dp"
                style={{
                  fontSize: "clamp(2.5rem,6vw,78px)",
                  lineHeight: 1.07,
                  color: "var(--fg)",
                  marginBottom: 22,
                }}
              >
                Ready to Build
                <br />
                <span className="italic gg">Your Empire?</span>
              </h2>
              <p
                style={{
                  color: "var(--fg2)",
                  fontSize: ".87rem",
                  marginBottom: 42,
                  lineHeight: 1.9,
                }}
              >
                Join thousands of founders, agencies, and businesses building
                with Suulp. 14 days free. Full access. No card required.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Mag>
                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="bg"
                      style={{
                        padding: "18px 62px",
                        borderRadius: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        fontSize: ".72rem",
                      }}
                    >
                      Start Free Trial <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                </Mag>
                <Mag>
                  <Link href="/contact">
                    <button
                      className="bo"
                      style={{
                        padding: "18px 38px",
                        borderRadius: 3,
                        fontSize: ".72rem",
                      }}
                    >
                      Book a Demo
                    </button>
                  </Link>
                </Mag>
              </div>
              <p
                style={{
                  fontSize: ".64rem",
                  color: "var(--fg3)",
                  marginTop: 22,
                  letterSpacing: ".12em",
                }}
              >
                No credit card · Cancel anytime · Full access for 14 days
              </p>
            </motion.div>
          </div>
        </section>

        {/* ──────────────────── FOOTER ──────────────────── */}
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
          <div>
            <Scramble
              text="SUULP"
              className="dp gg"
              style={{ fontSize: 20, letterSpacing: ".36em", fontWeight: 600 }}
            />
            <p
              style={{
                fontSize: ".6rem",
                color: "var(--fg3)",
                marginTop: 6,
                letterSpacing: ".1em",
              }}
            >
              Build the extraordinary.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            {[
              "Features",
              "Pricing",
              "About",
              "Contact",
              "Privacy",
              "Terms",
              "Status",
            ].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="na">
                {l}
              </Link>
            ))}
          </div>
          <p
            style={{
              fontSize: ".58rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--fg3)",
            }}
          >
            © 2026 Suulp — All Rights Reserved
          </p>
        </footer>
      </main>
    </>
  );
}
