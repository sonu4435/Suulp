"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROYAL_CSS } from "@/components/shared-styles";
import {
  LiquidCursor,
  NoiseOverlay,
  Mag,
  RoyalNav,
  RoyalFooter,
} from "@/components/shared-components";
import { useTheme } from "@/components/ThemeContext";

/** Animated glitch text — flashes between "404" and random chars */
function GlitchText({ text }: { text: string }) {
  const [disp, setDisp] = useState(text);
  const CHARS = "0123456789!@#$%X?—";
  const raf = useRef<number>(0);
  const glitchRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Occasional random glitch
    glitchRef.current = setInterval(() => {
      if (Math.random() > 0.72) {
        let it = 0;
        const tick = () => {
          setDisp(
            text
              .split("")
              .map((c, i) =>
                i < it / 1.5
                  ? c
                  : CHARS[Math.floor(Math.random() * CHARS.length)],
              )
              .join(""),
          );
          it++;
          if (it < text.length * 2) raf.current = requestAnimationFrame(tick);
          else setDisp(text);
        };
        raf.current = requestAnimationFrame(tick);
      }
    }, 2800);
    return () => {
      if (glitchRef.current) clearInterval(glitchRef.current);
      cancelAnimationFrame(raf.current);
    };
  }, [text]);

  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{disp}</span>;
}

const EXTRA_CSS = `
  .glitch-wrap{
    position:relative;
    font-size:clamp(120px,28vw,320px);
    line-height:1;
    font-weight:700;
    letter-spacing:-0.04em;
  }
  .glitch-shadow{
    position:absolute;inset:0;
    background:linear-gradient(135deg,#BFA06A 0%,#E2C98A 45%,#BFA06A 75%,#7A5C2A 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    filter:blur(28px);opacity:0.22;pointer-events:none;user-select:none;
  }
  .rings-wrap{
    position:absolute;inset:0;display:flex;
    align-items:center;justify-content:center;
    pointer-events:none;
  }
  @keyframes ring-pulse{0%,100%{opacity:.06}50%{opacity:.14}}
`;

export default function NotFound() {
  const { isDark } = useTheme();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ROYAL_CSS + EXTRA_CSS }} />
      <div className={isDark ? "dk" : "lk"}>
        <NoiseOverlay />
        <LiquidCursor />
        <RoyalNav />

        <main
          style={{
            background: "var(--bg)",
            minHeight: "100vh",
            overflowX: "hidden",
          }}
        >
          <section className="not-found-wrap">
            {/* Decorative concentric rings */}
            <div className="rings-wrap">
              {[360, 500, 640, 800].map((sz, ri) => (
                <motion.div
                  key={ri}
                  style={{
                    position: "absolute",
                    width: sz,
                    height: sz,
                    border: `1px solid rgba(191,160,106,${0.042 + ri * 0.016})`,
                    borderRadius: "50%",
                    animation: `${ri % 2 === 0 ? "rs" : "rsr"} ${22 + ri * 6}s linear infinite`,
                    animationDelay: `${ri * -3}s`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: ri * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                maxWidth: 700,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              {/* Section tag */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{ height: 1, width: 36, background: "var(--cg)" }}
                />
                <span
                  style={{
                    fontSize: ".56rem",
                    letterSpacing: ".52em",
                    textTransform: "uppercase",
                    color: "var(--cg)",
                  }}
                >
                  Lost in the Empire
                </span>
                <div
                  style={{ height: 1, width: 36, background: "var(--cg)" }}
                />
              </motion.div>

              {/* Giant 404 */}
              <motion.div
                className="dp glitch-wrap"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Shadow layer */}
                <div className="dp glitch-shadow" aria-hidden>
                  <GlitchText text="404" />
                </div>
                {/* Main gradient text */}
                <span className="gg">
                  <GlitchText text="404" />
                </span>
              </motion.div>

              {/* Gold divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.9 }}
                style={{
                  height: 1,
                  width: 220,
                  background:
                    "linear-gradient(90deg,transparent,var(--cg),transparent)",
                  margin: "28px 0",
                }}
              />

              {/* Headline */}
              <motion.h1
                className="dp"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.75 }}
                style={{
                  fontSize: "clamp(1.6rem,3.5vw,42px)",
                  lineHeight: 1.12,
                  color: "var(--fg)",
                  marginBottom: 16,
                }}
              >
                This page <span className="italic gg">doesn't exist.</span>
              </motion.h1>

              {/* Sub text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                style={{
                  color: "var(--fg2)",
                  fontSize: ".87rem",
                  lineHeight: 1.9,
                  maxWidth: 420,
                  marginBottom: 42,
                }}
              >
                The page you're looking for has been moved, deleted, or perhaps
                never existed. Let's get you back to building your empire.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="cta-btns"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                <Mag>
                  <Link href="/">
                    <button
                      className="bg-btn"
                      style={{
                        padding: "16px 48px",
                        borderRadius: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      Back to Home <ArrowRight size={14} />
                    </button>
                  </Link>
                </Mag>
                <Mag>
                  <Link href="/features">
                    <button
                      className="bo-btn"
                      style={{ padding: "16px 36px", borderRadius: 3 }}
                    >
                      Explore Features
                    </button>
                  </Link>
                </Mag>
              </motion.div>

              {/* Quick nav */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 28,
                  justifyContent: "center",
                  marginTop: 52,
                }}
              >
                {["Features", "Pricing", "About", "Contact", "Login"].map(
                  (l, i) => (
                    <motion.div
                      key={l}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + i * 0.06 }}
                    >
                      <Link href={`/${l.toLowerCase()}`} className="na">
                        {l}
                      </Link>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </div>
          </section>

          <RoyalFooter />
        </main>
      </div>
    </>
  );
}
