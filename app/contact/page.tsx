"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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
import { ROYAL_CSS } from "@/components/shared-styles";
import {
  LiquidCursor,
  NoiseOverlay,
  RoyalNav,
  RoyalFooter,
  ProgressBar,
  SectionTag,
} from "@/components/shared-components";
import { useTheme } from "@/components/ThemeContext";

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

export default function ContactPage() {
  const { isDark } = useTheme();
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ROYAL_CSS }} />
      <div className={isDark ? "dk" : "lk"}>
        <NoiseOverlay />
        <LiquidCursor />
        <ProgressBar scaleX={scaleX} />
        <RoyalNav />

        <main ref={containerRef} className="page-wrap">
          {/* HERO */}
          <section
            className="hero-pad"
            style={{ maxWidth: 1600, margin: "0 auto", position: "relative" }}
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
                  width: "clamp(140px,20vw,260px)",
                  height: "clamp(140px,20vw,260px)",
                  border: "1px solid var(--cg)",
                  borderRadius: "50%",
                }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <SectionTag label="Get in Touch" />
            </motion.div>
            {["Let's", "Talk."].map((t, i) => (
              <div key={t} className="lo">
                <motion.h1
                  className={
                    i === 1
                      ? "dp gg"
                      : isDark
                        ? "dp text-amber-50 italic"
                        : "dp"
                  }
                  style={{
                    fontSize: "clamp(2.5rem,8vw,110px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
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
                fontSize: ".9rem",
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
            className="sec-pad"
            style={{ maxWidth: 1400, margin: "0 auto" }}
          >
            <div className="contact-grid">
              {/* Contact info */}
              <div>
                <SectionTag label="Reach Us" />
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
                          padding: "clamp(18px,3vw,24px) clamp(20px,3vw,28px)",
                          borderBottom: i < 3 ? "1px solid var(--brd)" : "none",
                          transition: "background .3s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(191,160,106,.03)")
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
                              fontSize: ".6rem",
                              letterSpacing: ".3em",
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
                              fontSize: "clamp(15px,2vw,17px)",
                              color: "var(--fg)",
                              marginBottom: 4,
                            }}
                          >
                            {info.val}
                          </p>
                          <p
                            style={{ fontSize: ".75rem", color: "var(--fg3)" }}
                          >
                            {info.desc}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                <motion.div
                  className="glass"
                  style={{
                    padding: "clamp(16px,3vw,20px) clamp(18px,3vw,24px)",
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
                          fontSize: ".75rem",
                          color: "var(--fg)",
                          fontWeight: 500,
                        }}
                      >
                        Team is online right now
                      </p>
                      <p
                        style={{
                          fontSize: ".65rem",
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

              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <SectionTag label="Send Message" />
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(min(100%,200px),1fr))",
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
                    {sent && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          padding: "14px 18px",
                          border: "1px solid rgba(191,160,106,.3)",
                          background: "rgba(191,160,106,.07)",
                          borderRadius: 3,
                          fontSize: ".82rem",
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
