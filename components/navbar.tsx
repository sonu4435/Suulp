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

/* ─── LIQUID CURSOR ─── */
export function LiquidCursor({ dark }: { dark: boolean }) {
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
            "width 0.4s cubic-bezier(0.23,1,0.32,1),height 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      />
    </>
  );
}

/* ─── SCRAMBLE TEXT ─── */
export function ScrambleText({ text, className, style }: any) {
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

/* ─── MAGNETIC BUTTON ─── */
export function MagneticButton({ children, className, style }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── NOISE OVERLAY ─── */
export function NoiseOverlay() {
  return <div className="noise-ov" />;
}

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  dark: boolean;
  setDark: (v: boolean) => void;
}

export default function RoyalNavbar({ dark, setDark }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
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
        <ScrambleText
          text="SUULP"
          className="dp gg"
          style={{ fontSize: 20, letterSpacing: "0.32em", fontWeight: 600 }}
        />
      </Link>

      {/* Desktop nav */}
      <div
        style={{ display: "flex", gap: 36, alignItems: "center" }}
        className="hidden md:flex"
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="na"
            style={{ color: pathname === l.href ? "var(--cg)" : undefined }}
          >
            {l.label}
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

        <MagneticButton className="hidden md:block">
          <Link href="/signup">
            <button
              className="bg-btn"
              style={{ padding: "10px 24px", borderRadius: 3 }}
            >
              Start Free
            </button>
          </Link>
        </MagneticButton>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--cg)" }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: dark ? "rgba(7,7,8,0.97)" : "rgba(246,243,237,0.97)",
              borderBottom: "1px solid var(--brd)",
              backdropFilter: "blur(20px)",
              padding: "24px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
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

/* ─── ROYAL FOOTER ─── */
export function RoyalFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--brd)",
        padding: "40px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <div>
        <ScrambleText
          text="SUULP"
          className="dp gg"
          style={{ fontSize: 20, letterSpacing: "0.35em", fontWeight: 600 }}
        />
        <p
          style={{
            fontSize: "0.65rem",
            color: "var(--fg3)",
            marginTop: 8,
            letterSpacing: "0.1em",
          }}
        >
          Build the extraordinary.
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 36 }}>
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
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--fg3)",
        }}
      >
        © 2026 Suulp — All Rights Reserved
      </p>
    </footer>
  );
}

/* ─── PAGE WRAPPER ─── */
export function RoyalPageWrapper({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark: boolean;
}) {
  return (
    <div className={dark ? "dk" : "lk"}>
      <NoiseOverlay />
      <LiquidCursor dark={dark} />
      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
}

/* ─── SECTION HEADER ─── */
export function SectionHeader({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div className="sec-tag" style={{ marginBottom: 22 }}>
        <div className="sec-tag-line" />
        <span className="sec-tag-text">{tag}</span>
      </div>
      <motion.h2
        className="dp"
        style={{
          fontSize: "clamp(2rem, 4.5vw, 60px)",
          lineHeight: 1.05,
          color: "var(--fg)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {sub && (
        <p
          style={{
            color: "var(--fg2)",
            fontSize: "0.87rem",
            lineHeight: 1.85,
            maxWidth: 500,
            marginTop: 16,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
