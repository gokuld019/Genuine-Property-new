"use client";
import { useState, useEffect, useRef } from "react";

export default function InvestmentAndProcessSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      text: "Genuine Property Developers gave us the perfect plot in the perfect location. Highly professional team!",
      name: "Rahul Verma",
      role: "Happy Customer",
      img: "/1.jpeg",
    },
    {
      text: "Excellent service and transparent documentation process. We are very happy with our purchase!",
      name: "Priya Krishnan",
      role: "Happy Customer",
      img: "/2.jpeg",
    },
    {
      text: "The team was helpful throughout. Our dream plot is now a reality thanks to Genuine Properties.",
      name: "Arun Kumar",
      role: "Happy Customer",
      img: "/3.jpeg",
    },
  ];

  const processSteps = [
    {
      label: "ENQUIRE",
      detail: "Call, email, or drop by — our team is ready to answer every question about plots, pricing & availability.",
      cta: "Free Consultation",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
        </svg>
      ),
    },
    {
      label: "VISIT & EXPLORE",
      detail: "Walk the site, explore layout options & get a feel for the community before making any decision.",
      cta: "Guided Site Visit",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      label: "BOOK & SECURE",
      detail: "Reserve your preferred plot with a simple booking amount. Flexible payment plans available.",
      cta: "Flexible Payment Plans",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "DOCUMENTATION",
      detail: "Our legal team handles all paperwork — registration, approvals & RERA compliance, completely stress-free.",
      cta: "RERA Compliant",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      label: "BUILD YOUR DREAM",
      detail: "Your plot, your vision. Begin construction whenever you're ready — on your timeline, your budget.",
      cta: "Build on Your Terms",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(ScrollTrigger, SplitText);

      ctx = gsap.context(() => {
        const sec = sectionRef.current;

        const revealHeading = (el, triggerEl, delay = 0) => {
          if (!el) return;
          const split = new SplitText(el, { type: "words,lines", linesClass: "gsap-line" });
          sec.querySelectorAll(".gsap-line").forEach((l) => {
            l.style.overflow = "hidden";
            l.style.display = "block";
          });
          gsap.from(split.words, {
            scrollTrigger: { trigger: triggerEl || el, start: "top 85%", toggleActions: "play none none none" },
            y: "110%",
            opacity: 0,
            stagger: 0.07,
            duration: 0.75,
            ease: "expo.out",
            delay,
          });
        };

        const revealEyebrow = (el, triggerEl) => {
          if (!el) return;
          const split = new SplitText(el, { type: "chars" });
          gsap.from(split.chars, {
            scrollTrigger: { trigger: triggerEl || el, start: "top 88%", toggleActions: "play none none none" },
            opacity: 0,
            y: 10,
            stagger: 0.03,
            duration: 0.45,
            ease: "power3.out",
          });
        };

        revealEyebrow(sec.querySelector(".inv-eyebrow"));
        revealHeading(sec.querySelector(".inv-heading"));

        gsap.from(sec.querySelector(".inv-body"), {
          scrollTrigger: { trigger: sec.querySelector(".inv-body"), start: "top 88%", toggleActions: "play none none none" },
          opacity: 0,
          y: 14,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3,
        });

        gsap.from(sec.querySelectorAll(".invest-card"), {
          scrollTrigger: { trigger: sec.querySelector(".invest-grid"), start: "top 82%", toggleActions: "play none none none" },
          y: 40,
          opacity: 0,
          scale: 0.94,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
        });

        gsap.from(sec.querySelector(".section-divider"), {
          scrollTrigger: { trigger: sec.querySelector(".section-divider"), start: "top 90%", toggleActions: "play none none none" },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.out",
        });

        revealEyebrow(sec.querySelector(".test-eyebrow"));
        revealHeading(sec.querySelector(".test-heading"));

        gsap.from(sec.querySelector(".test-card"), {
          scrollTrigger: { trigger: sec.querySelector(".test-card"), start: "top 84%", toggleActions: "play none none none" },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        });

        gsap.from(sec.querySelector(".test-controls"), {
          scrollTrigger: { trigger: sec.querySelector(".test-controls"), start: "top 90%", toggleActions: "play none none none" },
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3,
        });

        revealHeading(sec.querySelector(".process-heading"));

        gsap.from(sec.querySelector(".process-connector"), {
          scrollTrigger: { trigger: sec.querySelector(".process-connector"), start: "top 85%", toggleActions: "play none none none" },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
        });

        const stepCards = sec.querySelectorAll(".process-step");
        gsap.from(stepCards, {
          scrollTrigger: { trigger: sec.querySelector(".process-grid"), start: "top 82%", toggleActions: "play none none none" },
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
        });

        stepCards.forEach((card, i) => {
          const icon = card.querySelector(".step-icon");
          gsap.from(icon, {
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2.5)",
            delay: 0.15 + i * 0.07,
          });

          const badge = card.querySelector(".step-badge");
          gsap.from(badge, {
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
            scale: 0,
            duration: 0.4,
            ease: "back.out(3)",
            delay: 0.25 + i * 0.07,
          });

          const label = card.querySelector(".step-label");
          if (label) {
            const split = new SplitText(label, { type: "chars" });
            gsap.from(split.chars, {
              scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
              opacity: 0,
              y: 6,
              stagger: 0.025,
              duration: 0.4,
              ease: "power2.out",
              delay: 0.3 + i * 0.07,
            });
          }
        });
      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", background: "#f5f5f5" }}>

      {/* ── Section 1: Investment ── */}
      <div className="invest-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        gap: "0", maxWidth: "1200px", margin: "0 auto",
        padding: "80px 0px", alignItems: "center",
      }}>
        <div style={{ paddingRight: "30px" }}>
          <p className="inv-eyebrow" style={{ color: "#b03030", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>
            WHY INVEST IN PLOTS?
          </p>
          <h2 className="inv-heading" style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 800, color: "#111", lineHeight: 1.2, margin: "0 0 16px" }}>
            Your Investment.<br />
            Your <span style={{ color: "#b03030" }}>Future.</span>
          </h2>
          <p className="inv-body" style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: 0 }}>
            Plots appreciate over time and offer the freedom to build your way, your time.
          </p>
        </div>

        <InvestCard icon={<StarIcon />} title="HIGH APPRECIATION" subtitle="Potential" desc="Strong growth for a secure future." />
        <InvestCard icon={<BuildingIcon />} title="FLEXIBLE OWNERSHIP" desc="Build now or later, the choice is yours." />
        <InvestCard icon={<DocumentIcon />} title="FREEDOM TO BUILD" desc="Design your dream exactly how you want." />
        <InvestCard icon={<ShieldIcon />} title="LOW RISK ASSET" desc="Land is a tangible asset that never depreciates." />
      </div>

      {/* Divider */}
      <div className="section-divider" style={{ borderTop: "1px solid #e0e0e0", maxWidth: "1200px", margin: "0 auto" }} />

      {/* ── Section 2: Testimonials + Process ── */}
      <div className="testimonials-process-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1.6fr",
        maxWidth: "1200px", margin: "0 auto",
        padding: "71px 1px", gap: "60px", alignItems: "start",
      }}>
        {/* Left – Testimonials */}
        <div>
          <p className="test-eyebrow" style={{ color: "#b03030", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>
            HAPPY CUSTOMERS
          </p>
          <h2 className="test-heading" style={{ fontSize: "clamp(22px, 2.5vw, 34px)", fontWeight: 800, color: "#111", lineHeight: 1.2, margin: "0 0 28px" }}>
            Trusted By Thousands.<br />
            Recommended For <span style={{ color: "#b03030" }}>Life.</span>
          </h2>

          <div className="test-card" style={{
            background: "#fff", borderRadius: "10px", padding: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "20px",
          }}>
            <div style={{ fontSize: "40px", color: "#b03030", lineHeight: 1, marginBottom: "12px", fontFamily: "Georgia, serif" }}>"</div>
            <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.7, margin: "0 0 20px" }}>
              {testimonials[activeTestimonial].text}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ddd", overflow: "hidden", flexShrink: 0 }}>
                <img
                  src={testimonials[activeTestimonial].img}
                  alt={testimonials[activeTestimonial].name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111", margin: 0 }}>{testimonials[activeTestimonial].name}</p>
                <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </div>

          <div className="test-controls" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? "20px" : "8px",
                    height: "8px", borderRadius: "4px",
                    background: i === activeTestimonial ? "#b03030" : "#ccc",
                    cursor: "pointer", transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
              <button
                onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #ccc", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #ccc", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right – Process */}
        <div>
          <h2 className="process-heading" style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 800, color: "#111", margin: "0 0 40px" }}>
            OUR <span style={{ color: "#b03030" }}>SIMPLE</span> PROCESS
          </h2>

          <div style={{ position: "relative" }}>
            <div className="process-connector" style={{
              position: "absolute", top: "28px", left: "5%", right: "5%",
              height: "1px", borderTop: "2px dashed #e0c0c0", zIndex: 0,
            }} />

            <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", position: "relative", zIndex: 1 }}>
              {processSteps.map((step, i) => (
                <div key={i} className="process-step" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div className="step-icon" style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    border: "2px solid #b03030", background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#b03030", marginBottom: "16px",
                    boxShadow: "0 2px 8px rgba(176,48,48,0.15)",
                  }}>
                    {step.icon}
                  </div>

                  <div style={{
                    background: "#fff", borderRadius: "12px", padding: "20px 14px",
                    width: "100%", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    flex: 1, position: "relative",
                  }}>
                    <div className="step-badge" style={{
                      position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: "#b03030", color: "#fff",
                      fontSize: "11px", fontWeight: 800,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <p className="step-label" style={{ fontSize: "11px", fontWeight: 800, color: "#111", letterSpacing: "0.06em", textTransform: "uppercase", margin: "8px 0 8px" }}>
                      {step.label}
                    </p>
                    <p style={{ fontSize: "11px", color: "#666", lineHeight: 1.6, margin: "0 0 14px" }}>
                      {step.detail}
                    </p>
                    <div style={{
                      fontSize: "10px", fontWeight: 700, color: "#b03030",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      borderTop: "1px solid #f0e0e0", paddingTop: "10px",
                    }}>
                      {step.cta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .invest-grid {
            grid-template-columns: 1fr 1fr !important;
            padding: 60px 24px !important;
            gap: 20px !important;
          }
          .invest-grid > div:first-child {
            grid-column: 1 / -1;
            padding-right: 0 !important;
          }
          .testimonials-process-grid {
            grid-template-columns: 1fr !important;
            padding: 60px 24px !important;
            gap: 48px !important;
          }
          .process-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .process-connector {
            display: none !important;
          }
          .section-divider {
            margin: 0 24px !important;
          }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .invest-grid {
            grid-template-columns: 1fr 1fr !important;
            padding: 48px 16px !important;
            gap: 14px !important;
          }
          .invest-grid > div:first-child {
            grid-column: 1 / -1;
            padding-right: 0 !important;
            margin-bottom: 8px;
          }
          .invest-card {
            margin: 0 !important;
            padding: 18px 14px !important;
          }
          .testimonials-process-grid {
            grid-template-columns: 1fr !important;
            padding: 48px 16px !important;
            gap: 40px !important;
          }
          .process-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
          .process-connector {
            display: none !important;
          }
          .section-divider {
            margin: 0 16px !important;
          }
        }

        /* ── VERY SMALL (≤ 380px) ── */
        @media (max-width: 380px) {
          .invest-grid {
            grid-template-columns: 1fr !important;
          }
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function InvestCard({ icon, title, subtitle, desc }) {
  return (
    <div className="invest-card" style={{
      background: "#fff", borderRadius: "10px", padding: "24px 20px",
      margin: "0 8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center", height: "100%",
    }}>
      <div style={{
        width: "54px", height: "54px", borderRadius: "50%",
        background: "#b03030", display: "flex", alignItems: "center",
        justifyContent: "center", color: "#fff", marginBottom: "14px",
      }}>
        {icon}
      </div>
      <p style={{ fontSize: "11px", fontWeight: 800, color: "#111", letterSpacing: "0.08em", margin: "0 0 4px", textTransform: "uppercase" }}>
        {title}
      </p>
      {subtitle && (
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#b03030", margin: "0 0 8px" }}>{subtitle}</p>
      )}
      <p style={{ fontSize: "12px", color: "#777", lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}