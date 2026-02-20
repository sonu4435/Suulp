"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader, ArrowRight } from "lucide-react";
import { LiquidCursor } from "@/components/navbar";
import { useTheme } from "@/components/ThemeContext";

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

/* ═══ LOGIN PAGE ═══ */
export function LoginPage() {
  const { isDark: dark, toggleTheme: setDark } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { useRouter, useSearchParams } = require("next/navigation");
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
      <style dangerouslySetInnerHTML={{ __html: SHARED_CSS }} />
      <div className={dark ? "dk" : "lk"}>
        <div className="noise-ov" />
        <LiquidCursor dark={dark} />

        <main
          style={{
            background: "var(--bg)",
            minHeight: "100vh",
            display: "flex",
            overflowX: "hidden",
          }}
        >
          {/* Left panel */}
          <div
            style={{
              flex: 1,
              display: "none",
              position: "relative",
              minHeight: "100vh",
            }}
            className="lg-panel"
          >
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80"
              alt="Dashboard"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.3) saturate(0.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, transparent, var(--bg))",
              }}
            />
            <div
              style={{ position: "absolute", bottom: 60, left: 60, right: 60 }}
            >
              <p
                className="dp italic"
                style={{
                  fontSize: 28,
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
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--cg)",
                }}
              >
                — Priya R., Founder, StyleHive
              </p>
            </div>
          </div>

          {/* Right panel — form */}
          <div
            style={{
              flex: "0 0 min(100%, 560px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 40px",
              minHeight: "100vh",
              position: "relative",
            }}
          >
            {/* Decorative rings */}
            <div
              style={{
                position: "absolute",
                right: -100,
                top: "30%",
                opacity: 0.06,
              }}
            >
              <div
                style={{
                  width: 300,
                  height: 300,
                  border: "1px solid var(--cg)",
                  borderRadius: "50%",
                }}
                className="rs"
              />
            </div>

            {/* Nav row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 60,
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
              <button
                data-hover="true"
                onClick={() => setDark()}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid var(--brd)",
                  background: "var(--cbg)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--fg2)",
                }}
              >
                {dark ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "14px 18px",
                    border: "1px solid rgba(191,160,106,0.3)",
                    background: "rgba(191,160,106,0.07)",
                    borderRadius: 3,
                    fontSize: "0.82rem",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{ height: 1, width: 24, background: "var(--cg)" }}
                />
                <span
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    color: "var(--cg)",
                  }}
                >
                  Welcome Back
                </span>
              </div>
              <h1
                className="dp"
                style={{
                  fontSize: "clamp(2rem, 4vw, 48px)",
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
                  fontSize: "0.87rem",
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
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
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
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
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
                        border: "1px solid rgba(239,68,68,0.3)",
                        background: "rgba(239,68,68,0.06)",
                        borderRadius: 3,
                        fontSize: "0.82rem",
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
                  fontSize: "0.78rem",
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

              {/* Trust line */}
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
                    fontSize: "0.58rem",
                    letterSpacing: "0.3em",
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
