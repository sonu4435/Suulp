"use client";

// ═══════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Loader,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
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
`;

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

function RoyalNav({ dark, setDark, active }: any) {
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

/* ═══ CONTACT PAGE ═══ */
export default function ContactPage() {
  const { isDark: dark, toggleTheme: setDark } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error: err } = await supabase
        .from("contact_messages")
        .insert([{ ...form, status: "new" }]);
      if (err) setError("Failed to send. Please try again.");
      else {
        setSent(true);
        setForm({ name: "", email: "", type: "", message: "" });
        setTimeout(() => setSent(false), 5000);
      }
    } catch {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const CONTACT_INFO = [
    {
      icon: Mail,
      label: "Email",
      val: "hello@suulp.com",
      href: "mailto:hello@suulp.com",
      desc: "Best for general inquiries",
    },
    {
      icon: Phone,
      label: "Sales",
      val: "+91 98765 43210",
      href: "tel:+919876543210",
      desc: "Talk to our growth team",
    },
    {
      icon: MapPin,
      label: "HQ",
      val: "Bengaluru, India",
      href: "#",
      desc: "Building for the world",
    },
    {
      icon: MessageSquare,
      label: "Live Chat",
      val: "Available in-app",
      href: "#",
      desc: "< 2 min avg response time",
    },
  ];

  const TYPES = [
    "General Enquiry",
    "Sales / Enterprise",
    "Custom Feature Request",
    "Partnership",
    "Press / Media",
    "Technical Support",
  ];

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
        <RoyalNav dark={dark} setDark={setDark} active="Contact" />

        <main
          ref={containerRef}
          style={{ background: "var(--bg)", overflowX: "hidden" }}
        >
          {/* HERO */}
          <section
            style={{
              minHeight: "55vh",
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
                top: "15%",
                opacity: 0.07,
              }}
              className="fl1"
            >
              <div
                style={{
                  width: 260,
                  height: 260,
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
                Get in Touch
              </span>
            </motion.div>
            {[
              { t: "Let's", cls: "dp", op: 0.85 },
              { t: "Talk.", cls: "dp gg", op: 1 },
            ].map(({ t, cls, op }, i) => (
              <div key={t} style={{ overflow: "hidden" }}>
                <motion.h1
                  className={cls}
                  style={{
                    fontSize: "clamp(3rem, 8vw, 110px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                    color:
                      cls === "dp"
                        ? `rgba(${dark ? "243,238,229" : "25,21,14"},${op})`
                        : undefined,
                  }}
                  initial={{ y: 110, opacity: 0 }}
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
              transition={{ delay: 0.95, duration: 1 }}
              style={{
                fontSize: "0.9rem",
                color: "var(--fg2)",
                lineHeight: 1.9,
                maxWidth: 440,
                marginTop: 28,
              }}
            >
              Have questions about Suulp? Want a custom enterprise demo? Or just
              want to say hello? We're a team of real humans who respond fast.
            </motion.p>
          </section>

          {/* MAIN CONTENT */}
          <section
            style={{
              padding: "60px 40px 80px",
              maxWidth: 1400,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                gap: 80,
              }}
            >
              {/* Contact info */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 36,
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
                    Reach Us
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    border: "1px solid var(--brd)",
                    borderRadius: 4,
                  }}
                >
                  {CONTACT_INFO.map((info, i) => {
                    const Icon = info.icon;
                    return (
                      <motion.a
                        key={i}
                        href={info.href}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.08 }}
                        viewport={{ once: true }}
                        style={{
                          display: "flex",
                          gap: 20,
                          padding: "24px 28px",
                          borderBottom: i < 3 ? "1px solid var(--brd)" : "none",
                          transition: "background 0.3s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(191,160,106,0.03)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            border: "1px solid var(--brd)",
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} color="var(--cg)" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "0.6rem",
                              letterSpacing: "0.3em",
                              textTransform: "uppercase",
                              color: "var(--fg3)",
                              marginBottom: 4,
                            }}
                          >
                            {info.label}
                          </p>
                          <p
                            className="dp"
                            style={{
                              fontSize: 17,
                              color: "var(--fg)",
                              marginBottom: 4,
                            }}
                          >
                            {info.val}
                          </p>
                          <p
                            style={{ fontSize: "0.75rem", color: "var(--fg3)" }}
                          >
                            {info.desc}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Response time badge */}
                <motion.div
                  className="glass"
                  style={{
                    padding: "20px 24px",
                    borderRadius: 3,
                    marginTop: 24,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 8px #22c55e",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--fg)",
                          fontWeight: 500,
                        }}
                      >
                        Team is online right now
                      </p>
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--fg3)",
                          marginTop: 2,
                        }}
                      >
                        Average response: under 2 hours
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 36,
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
                    Send Message
                  </span>
                </div>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <label className="royal-label">Your Name</label>
                      <input
                        className="royal-input"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
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
                  </div>

                  <div>
                    <label className="royal-label">Enquiry Type</label>
                    <select
                      className="royal-input"
                      value={form.type}
                      onChange={(e) =>
                        setForm({ ...form, type: e.target.value })
                      }
                      required
                      style={{ appearance: "none", cursor: "pointer" }}
                    >
                      <option value="" disabled>
                        Select a topic...
                      </option>
                      {TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="royal-label">Message</label>
                    <textarea
                      className="royal-input"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us what you're building, what you need, or what's on your mind..."
                      rows={6}
                      required
                      style={{ resize: "none", lineHeight: 1.7 }}
                    />
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
                    {sent && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          padding: "14px 18px",
                          border: "1px solid rgba(191,160,106,0.3)",
                          background: "rgba(191,160,106,0.07)",
                          borderRadius: 3,
                          fontSize: "0.82rem",
                          color: "var(--cg)",
                        }}
                      >
                        ✓ Message received. We'll be in touch within 2 hours.
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
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader
                          size={14}
                          style={{ animation: "spin 1s linear infinite" }}
                        />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </section>

          <RoyalFooter />
        </main>
      </div>
    </>
  );
}
