"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader, ArrowRight } from "lucide-react";
import { ROYAL_CSS } from "@/components/shared-styles";
import {
  LiquidCursor,
  NoiseOverlay,
  SectionTag,
} from "@/components/shared-components";
import { useTheme } from "@/components/ThemeContext";

export default function LoginPage() {
  const { isDark, toggleTheme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams?.get("message");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (err) setError(err.message);
      else if (data?.user) router.push("/dashboard");
    } catch {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            ROYAL_CSS +
            `@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`,
        }}
      />
      <div className={isDark ? "dk" : "lk"}>
        <NoiseOverlay />
        <LiquidCursor />
        <main className="auth-wrap" style={{ background: "var(--bg)" }}>
          {/* LEFT VISUAL */}
          <div className="auth-left">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80"
              alt="Dashboard"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(.3) saturate(.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right,transparent,var(--bg))",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "clamp(32px,5vw,60px)",
                left: "clamp(32px,5vw,60px)",
                right: "clamp(32px,5vw,60px)",
              }}
            >
              <p
                className="dp italic"
                style={{
                  fontSize: "clamp(18px,2.2vw,28px)",
                  color: "var(--fg)",
                  opacity: 0.8,
                  lineHeight: 1.5,
                  marginBottom: 20,
                }}
              >
                "Suulp replaced 6 different tools for us. We launched our site,
                CRM, and AI support in one afternoon."
              </p>
              <p
                style={{
                  fontSize: ".7rem",
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "var(--cg)",
                }}
              >
                — Priya R., Founder, StyleHive
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="auth-right">
            {/* Top nav */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "clamp(32px,5vw,60px)",
              }}
            >
              <Link href="/">
                <span
                  className="dp gg"
                  style={{
                    fontSize: 20,
                    letterSpacing: ".32em",
                    fontWeight: 600,
                  }}
                >
                  SUULP
                </span>
              </Link>
              <button
                data-hover="true"
                onClick={toggleTheme}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid var(--brd)",
                  background: "var(--cbg)",
                  fontSize: ".6rem",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--fg2)",
                }}
              >
                {isDark ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "14px 18px",
                    border: "1px solid rgba(191,160,106,.3)",
                    background: "rgba(191,160,106,.07)",
                    borderRadius: 3,
                    fontSize: ".82rem",
                    color: "var(--cg)",
                    marginBottom: 24,
                  }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <SectionTag label="Welcome Back" />
              <h1
                className="dp"
                style={{
                  fontSize: "clamp(1.8rem,4vw,48px)",
                  lineHeight: 1.05,
                  color: "var(--fg)",
                  marginBottom: 8,
                }}
              >
                Sign in to your <span className="gg">empire.</span>
              </h1>
              <p
                style={{
                  color: "var(--fg2)",
                  fontSize: ".87rem",
                  marginBottom: 40,
                  lineHeight: 1.7,
                }}
              >
                Continue building. Your workspace is waiting.
              </p>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div>
                  <label className="royal-label">Email Address</label>
                  <input
                    type="email"
                    className="royal-input"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@yourbusiness.com"
                    required
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <label className="royal-label" style={{ margin: 0 }}>
                      Password
                    </label>
                    <Link
                      href="#"
                      style={{
                        fontSize: ".6rem",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "var(--cg)",
                        textDecoration: "none",
                      }}
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPass ? "text" : "password"}
                      className="royal-input"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      data-hover="true"
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--fg3)",
                        fontSize: ".65rem",
                        letterSpacing: ".15em",
                      }}
                    >
                      {showPass ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        padding: "14px 18px",
                        border: "1px solid rgba(239,68,68,.3)",
                        background: "rgba(239,68,68,.06)",
                        borderRadius: 3,
                        fontSize: ".82rem",
                        color: "#f87171",
                      }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-btn"
                  style={{
                    padding: "16px 36px",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 8,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader
                        size={14}
                        style={{ animation: "spin 1s linear infinite" }}
                      />{" "}
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              <p
                style={{
                  textAlign: "center",
                  fontSize: ".78rem",
                  color: "var(--fg3)",
                  marginTop: 28,
                }}
              >
                No account yet?{" "}
                <Link
                  href="/signup"
                  style={{ color: "var(--cg)", textDecoration: "none" }}
                >
                  Start your free trial →
                </Link>
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 40,
                }}
              >
                <div style={{ flex: 1, height: 1, background: "var(--brd)" }} />
                <span
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".3em",
                    color: "var(--fg3)",
                    textTransform: "uppercase",
                  }}
                >
                  🔒 Encrypted & Secure
                </span>
                <div style={{ flex: 1, height: 1, background: "var(--brd)" }} />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
