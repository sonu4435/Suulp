"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

/* ══════════════════════════════════════════════
   LIQUID CURSOR
══════════════════════════════════════════════ */
export function LiquidCursor() {
  const { isDark } = useTheme();
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

  // Only show on non-touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  if (isTouch) return null;

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
          transition: "width .12s,height .12s",
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
            "width .4s cubic-bezier(.23,1,.32,1),height .4s cubic-bezier(.23,1,.32,1)",
        }}
      />
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

/* ══════════════════════════════════════════════
   SCRAMBLE TEXT
══════════════════════════════════════════════ */
export function Scramble({
  text,
  className,
  style,
  trigger,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
}) {
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
          .map((c, i) =>
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

/* ══════════════════════════════════════════════
   MAGNETIC BUTTON WRAPPER
══════════════════════════════════════════════ */
export function Mag({
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

/* ══════════════════════════════════════════════
   SECTION TAG (gold line + uppercase label)
══════════════════════════════════════════════ */
export function SectionTag({
  label,
  center,
}: {
  label: string;
  center?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 22,
        justifyContent: center ? "center" : undefined,
      }}
    >
      {center && (
        <div style={{ height: 1, width: 28, background: "var(--cg)" }} />
      )}
      {!center && (
        <div style={{ height: 1, width: 28, background: "var(--cg)" }} />
      )}
      <span
        style={{
          fontSize: ".58rem",
          letterSpacing: ".44em",
          textTransform: "uppercase",
          color: "var(--cg)",
        }}
      >
        {label}
      </span>
      {center && (
        <div style={{ height: 1, width: 28, background: "var(--cg)" }} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════ */
export function ProgressBar({ scaleX }: { scaleX: any }) {
  return (
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
  );
}

/* ══════════════════════════════════════════════
   ROYAL NAV — fully responsive
══════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function RoyalNav({ loaded }: { loaded?: boolean }) {
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      className="nav-root"
      style={{
        background: isDark ? "rgba(7,7,10,.74)" : "rgba(243,239,232,.8)",
      }}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        delay: loaded !== undefined ? 1.1 : 0.2,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ flexShrink: 0 }}>
        <Scramble
          text="SUULP"
          trigger={loaded}
          className="dp gg"
          style={{ fontSize: 20, letterSpacing: ".34em", fontWeight: 600 }}
        />
      </Link>

      {/* Desktop links */}
      <div className="nav-links hide-mobile">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`na${pathname === l.href ? " na-active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Right actions */}
      <div className="nav-actions">
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
            className="hide-mobile"
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

        {/* Sign in — desktop only */}
        <Link href="/login" className="na hide-mobile">
          Sign in
        </Link>

        {/* CTA */}
        <Mag>
          <Link href="/signup">
            <button
              className="bg-btn hide-mobile"
              style={{ padding: "10px 26px", borderRadius: 3 }}
            >
              Start Free
            </button>
          </Link>
        </Mag>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--cg)", padding: "6px", flexShrink: 0 }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            style={{
              background: isDark ? "rgba(7,7,10,.97)" : "rgba(243,239,232,.97)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="na"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="na"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <button
                className="bg-btn"
                style={{ padding: "12px 32px", borderRadius: 3, width: "100%" }}
              >
                Start Free Trial
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════
   ROYAL FOOTER — responsive
══════════════════════════════════════════════ */
export function RoyalFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--brd)" }}>
      <div className="footer-inner">
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
        <div className="footer-links">
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
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   NOISE OVERLAY
══════════════════════════════════════════════ */
export function NoiseOverlay() {
  return <div className="noise-ov" />;
}
