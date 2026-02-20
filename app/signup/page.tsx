"use client";

import { LiquidCursor } from "@/components/navbar";
import { supabase } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

/* ═══ SIGNUP PAGE ═══ */
export function SignupPage() {
  const [dark, setDark] = useState(true);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    industry: "",
    agreeToTerms: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { useRouter } = require("next/navigation");
  const router = useRouter();

  const INDUSTRIES = [
    "Technology / SaaS",
    "E-commerce / Retail",
    "Restaurant / Food",
    "Healthcare",
    "Education",
    "Real Estate",
    "Agency / Creative",
    "Finance",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setError("");
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }
    if (!form.agreeToTerms) {
      setError("Please agree to the Terms of Service.");
      setLoading(false);
      return;
    }

    try {
      const { error: err } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
            business_name: form.businessName,
            industry: form.industry,
          },
        },
      });
      if (err) setError(err.message);
      else
        router.push("/login?message=Check your email to confirm your account.");
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
            SHARED_CSS +
            `@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`,
        }}
      />
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
          {/* Left visual */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 60px",
              position: "relative",
              borderRight: "1px solid var(--brd)",
              minHeight: "100vh",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80"
              alt="Platform"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.15) saturate(0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, var(--bg) 40%, transparent)",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <Link href="/">
                <span
                  className="dp gg"
                  style={{
                    fontSize: 24,
                    letterSpacing: "0.35em",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 60,
                  }}
                >
                  SUULP
                </span>
              </Link>
              <h2
                className="dp"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 52px)",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  marginBottom: 32,
                }}
              >
                Your entire business.
                <br />
                <span className="italic gg">One platform.</span>
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {[
                  "AI builds your website in seconds",
                  "CMS, CRM, and CSM — unified",
                  "AI voice concierge (ElevenLabs)",
                  "Export your code. Always own it.",
                  "14-day free trial, no card needed",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 1,
                        background: "var(--cg)",
                        opacity: 0.6,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: "0.85rem", color: "var(--fg2)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step indicator */}
            <div style={{ position: "relative", zIndex: 2, marginTop: 60 }}>
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    style={{
                      height: 2,
                      flex: 1,
                      background: s <= step ? "var(--cg)" : "var(--brd)",
                      borderRadius: 1,
                      transition: "background 0.4s",
                    }}
                  />
                ))}
              </div>
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginTop: 10,
                }}
              >
                Step {step} of 2
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            style={{
              flex: "0 0 min(100%, 560px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 40px",
              minHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 40,
              }}
            >
              <button
                data-hover="true"
                onClick={() => setDark(!dark)}
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

            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                  {step === 1 ? "Your Account" : "Your Business"}
                </span>
              </div>

              <h1
                className="dp"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 42px)",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  marginBottom: 8,
                }}
              >
                {step === 1 ? (
                  <>
                    <span className="gg">Begin</span> your journey.
                  </>
                ) : (
                  <>
                    Tell us about your{" "}
                    <span className="gg italic">business.</span>
                  </>
                )}
              </h1>
              <p
                style={{
                  color: "var(--fg2)",
                  fontSize: "0.85rem",
                  marginBottom: 36,
                  lineHeight: 1.7,
                }}
              >
                {step === 1
                  ? "Create your account. 14 days free, no credit card."
                  : "Help us personalize your Suulp experience."}
              </p>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                {step === 1 ? (
                  <>
                    <div>
                      <label className="royal-label">Full Name</label>
                      <input
                        className="royal-input"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                        placeholder="Alex Johnson"
                        required
                      />
                    </div>
                    <div>
                      <label className="royal-label">Email Address</label>
                      <input
                        type="email"
                        className="royal-input"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="alex@business.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="royal-label">Password</label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPass ? "text" : "password"}
                          className="royal-input"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          placeholder="Min. 8 characters"
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
                            fontSize: "0.6rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                          }}
                        >
                          {showPass ? "HIDE" : "SHOW"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="royal-label">Confirm Password</label>
                      <input
                        type="password"
                        className="royal-input"
                        value={form.confirmPassword}
                        onChange={(e) =>
                          setForm({ ...form, confirmPassword: e.target.value })
                        }
                        placeholder="••••••••••••"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="royal-label">
                        Business / Brand Name
                      </label>
                      <input
                        className="royal-input"
                        value={form.businessName}
                        onChange={(e) =>
                          setForm({ ...form, businessName: e.target.value })
                        }
                        placeholder="e.g. Nova Ventures"
                        required
                      />
                    </div>
                    <div>
                      <label className="royal-label">Industry</label>
                      <select
                        className="royal-input"
                        value={form.industry}
                        onChange={(e) =>
                          setForm({ ...form, industry: e.target.value })
                        }
                        required
                        style={{ appearance: "none" }}
                      >
                        <option value="" disabled>
                          Select your industry...
                        </option>
                        {INDUSTRIES.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <input
                        type="checkbox"
                        id="terms"
                        checked={form.agreeToTerms}
                        onChange={(e) =>
                          setForm({ ...form, agreeToTerms: e.target.checked })
                        }
                        style={{
                          marginTop: 3,
                          accentColor: "var(--cg)",
                          width: 14,
                          height: 14,
                          flexShrink: 0,
                        }}
                        required
                      />
                      <label
                        htmlFor="terms"
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--fg2)",
                          lineHeight: 1.6,
                        }}
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          style={{ color: "var(--cg)", textDecoration: "none" }}
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          style={{ color: "var(--cg)", textDecoration: "none" }}
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </>
                )}

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

                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bo-btn"
                      style={{
                        padding: "16px 24px",
                        borderRadius: 3,
                        flexShrink: 0,
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-btn"
                    style={{
                      flex: 1,
                      padding: "16px 36px",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader
                          size={14}
                          style={{ animation: "spin 1s linear infinite" }}
                        />{" "}
                        Creating account...
                      </>
                    ) : step === 1 ? (
                      <>
                        Continue <ArrowRight size={14} />
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.78rem",
                  color: "var(--fg3)",
                  marginTop: 28,
                }}
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  style={{ color: "var(--cg)", textDecoration: "none" }}
                >
                  Sign in →
                </Link>
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignupPage;
