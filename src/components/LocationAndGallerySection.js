"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

const PROJECTS = [
  { slug: "rathinam-garden", name: "Rathinam Garden" },
  { slug: "alankar-sunrise", name: "Alankar Sunrise" },
  { slug: "amudham-foundation", name: "Amudham Foundation" },
];

const TIME_SLOTS = [
  { label: "9:00 AM – 11:00 AM", icon: "☀️" },
  { label: "11:00 AM – 1:00 PM", icon: "🌤" },
  { label: "2:00 PM – 4:00 PM",  icon: "⛅" },
  { label: "4:00 PM – 6:00 PM",  icon: "🌇" },
];

export default function LocationAndGallerySection() {
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const brochureTimerRef = useRef(null);

  // ── visit modal state ──
  const [visitOpen, setVisitOpen]   = useState(false);
  const [visitPhase, setVisitPhase] = useState("idle"); // idle | entering | entered | leaving
  const [step, setStep]               = useState(1);
  const [submitted, setSubmitted]     = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData]       = useState({
    name: "", phone: "", email: "",
    project: "", date: "", message: "",
  });

  // ── Brochure modal states ──
  const [brochureOpen, setBrochureOpen]   = useState(false);
  const [brochurePhase, setBrochurePhase] = useState("idle");
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [brochureLoading, setBrochureLoading] = useState(false);
  const [brochureFormData, setBrochureFormData] = useState({
    name: "", phone: "", email: "", city: ""
  });

  const stepLabels = ["Your Details", "Project & Date", "Confirm"];

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = (visitOpen || brochureOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visitOpen, brochureOpen]);

  /* ── escape key closes modals ── */
  useEffect(() => {
    if (!visitOpen && !brochureOpen) return;
    const fn = (e) => {
      if (e.key === "Escape") {
        if (brochureOpen) closeBrochure();
        if (visitOpen) closeVisit();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitOpen, brochureOpen]);

  /* ── open visit modal ── */
  const openVisit = useCallback((e) => {
    if (e) e.preventDefault();
    setSubmitted(false);
    setStep(1);
    setSelectedSlot("");
    setFormData({ name: "", phone: "", email: "", project: "", date: "", message: "" });
    setVisitOpen(true);
    setVisitPhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisitPhase("entering"));
    });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisitPhase("entered"), 380);
  }, []);

  /* ── close visit modal ── */
  const closeVisit = useCallback(() => {
    setVisitPhase("leaving");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisitOpen(false);
      setVisitPhase("idle");
    }, 280);
  }, []);

  /* ── open/close Brochure ── */
  const openBrochure = useCallback((e) => {
    if (e) e.preventDefault();
    setBrochureSubmitted(false);
    setBrochureLoading(false);
    setBrochureFormData({ name: "", phone: "", email: "", city: "" });
    setBrochureOpen(true);
    setBrochurePhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBrochurePhase("entering"));
    });
    clearTimeout(brochureTimerRef.current);
    brochureTimerRef.current = setTimeout(() => setBrochurePhase("entered"), 380);
  }, []);

  const closeBrochure = useCallback(() => {
    setBrochurePhase("leaving");
    clearTimeout(brochureTimerRef.current);
    brochureTimerRef.current = setTimeout(() => {
      setBrochureOpen(false);
      setBrochurePhase("idle");
      setBrochureSubmitted(false);
      setBrochureFormData({ name: "", phone: "", email: "", city: "" });
      setBrochureLoading(false);
    }, 280);
  }, []);

  const handleBrochureChange = (e) =>
    setBrochureFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBrochureSubmit = (e) => {
    e.preventDefault();
    setBrochureLoading(true);
    setTimeout(() => {
      setBrochureLoading(false);
      setBrochureSubmitted(true);
      const link = document.createElement("a");
      link.href = "/brochure.pdf";
      link.download = "GPD-Brochure.pdf";
      link.click();
    }, 1400);
  };

  const handleField = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(ScrollTrigger, SplitText);

      ctx = gsap.context(() => {
        const sec = sectionRef.current;

        gsap.from(sec.querySelector(".loc-banner-img"), {
          scrollTrigger: {
            trigger: sec.querySelector(".loc-banner-img"),
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 1.04,
          duration: 1.1,
          ease: "expo.out",
        });

        gsap.from(sec.querySelector(".cta-banner"), {
          scrollTrigger: {
            trigger: sec.querySelector(".cta-banner"),
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        const subLabel = sec.querySelector(".cta-sub");
        if (subLabel) {
          const split = new SplitText(subLabel, { type: "words" });
          gsap.from(split.words, {
            scrollTrigger: {
              trigger: sec.querySelector(".cta-banner"),
              start: "top 88%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 8,
            stagger: 0.06,
            duration: 0.45,
            ease: "power2.out",
            delay: 0.3,
          });
        }

        const ctaHeading = sec.querySelector(".cta-heading");
        if (ctaHeading) {
          const split = new SplitText(ctaHeading, {
            type: "words,lines",
            linesClass: "cta-line",
          });
          sec.querySelectorAll(".cta-line").forEach((l) => {
            l.style.overflow = "hidden";
            l.style.display = "block";
          });
          gsap.from(split.words, {
            scrollTrigger: {
              trigger: sec.querySelector(".cta-banner"),
              start: "top 88%",
              toggleActions: "play none none none",
            },
            y: "110%",
            opacity: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "expo.out",
            delay: 0.2,
          });
        }

        gsap.from(sec.querySelectorAll(".cta-feature"), {
          scrollTrigger: {
            trigger: sec.querySelector(".cta-banner"),
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: "power3.out",
          delay: 0.4,
        });

        gsap.from(sec.querySelectorAll(".cta-icon"), {
          scrollTrigger: {
            trigger: sec.querySelector(".cta-banner"),
            start: "top 88%",
            toggleActions: "play none none none",
          },
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "back.out(2.5)",
          delay: 0.5,
        });

        gsap.from(sec.querySelector(".cta-btn"), {
          scrollTrigger: {
            trigger: sec.querySelector(".cta-banner"),
            start: "top 88%",
            toggleActions: "play none none none",
          },
          x: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.55,
        });
      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", background: "#f5f5f5" }}
    >
      {/* ── Clickable Banner Image ── */}
      <a
        href="https://www.google.com/maps/place/GENUINE+PROPERTY+DEVELOPERS/@12.9254935,80.1091582,1099m"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="loc-banner-img"
          src="/img-10.jpg"
          alt="Genuine Property Developers"
          style={{ width: "100%", display: "block" }}
        />
      </a>

      {/* ── CTA Banner ── */}
      <div
        className="cta-banner"
        style={{
          background: "linear-gradient(135deg, #8b1a1a 0%, #b03030 50%, #8b1a1a 100%)",
          margin: "0px 40px 60px",
          borderRadius: "14px 14px 0px 0px",
          overflow: "hidden",
          position: "relative",
          maxWidth: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Background image overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/cta-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "right center",
            opacity: 0.2,
          }}
        />

        {/* Desktop inner layout */}
        <div
          className="cta-inner"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto auto",
            alignItems: "center",
            padding: "28px 40px",
            gap: "32px",
          }}
        >
          {/* Left text */}
          <div className="cta-text-block" style={{ borderRight: "1px solid rgba(255,255,255,0.25)", paddingRight: "32px" }}>
            <p className="cta-sub" style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", margin: "0 0 4px" }}>
              Your Dream Plot Is Just A
            </p>
            <h3
              className="cta-heading"
              style={{ color: "#fff", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 800, margin: 0 }}
            >
              Decision Away!
            </h3>
          </div>

          <CtaFeature icon={<LocationIcon />} label="Prime Locations" />
          <CtaFeature icon={<EmiIcon />} label="Easy EMI Options" />
          <CtaFeature icon={<LegalIcon />} label="100% Legal Security" />

          {/* CTA Buttons Group */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className="cta-btn brochure-btn"
              onClick={openBrochure}
              style={{
                background: "transparent",
                color: "#fff",
                padding: "14px 20px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textTransform: "uppercase",
                border: "1.5px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}
            >
              📄 BROCHURE
            </button>
            
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          BROCHURE MODAL (from HeroSection)
      ════════════════════════════════════════ */}
      {brochureOpen && (
        <div
          className={`gpd-modal-backdrop${brochurePhase !== "idle" ? ` ${brochurePhase}` : ""}`}
          onClick={closeBrochure}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>

            {/* ── CLOSE BUTTON ── */}
            <button className="gpd-close-btn" onClick={closeBrochure} aria-label="Close">
              <X size={15} />
            </button>

            {/* ── LEFT: FORM ── */}
            <div className="gpd-form-col">
              {!brochureSubmitted ? (
                <>
                  <div className="gpd-tag-pill">
                    <div className="gpd-tag-dot" />
                    <span>Exclusive Download</span>
                  </div>
                  <h2 className="gpd-form-heading">Get Our Brochure</h2>
                  <p className="gpd-form-sub">Share a few details and we&apos;ll send it right away.</p>

                  <form onSubmit={handleBrochureSubmit} className="gpd-fields-block">
                    <div className="gpd-field-row">
                      <div className="gpd-field">
                        <label>Full Name <span style={{ color:"#b03030" }}>*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          </span>
                          <input
                            className="gpd-f" type="text" name="name" required
                            placeholder="Your name" value={brochureFormData.name} onChange={handleBrochureChange}
                          />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>Phone <span style={{ color:"#b03030" }}>*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          </span>
                          <input
                            className="gpd-f" type="tel" name="phone" required
                            placeholder="+91 XXXXX XXXXX" value={brochureFormData.phone} onChange={handleBrochureChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="gpd-field-row">
                      <div className="gpd-field">
                        <label>Email</label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          </span>
                          <input
                            className="gpd-f" type="email" name="email"
                            placeholder="you@email.com" value={brochureFormData.email} onChange={handleBrochureChange}
                          />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>City</label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          </span>
                          <input
                            className="gpd-f" type="text" name="city"
                            placeholder="Chennai, Bangalore…" value={brochureFormData.city} onChange={handleBrochureChange}
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="gpd-btn-brochure" disabled={brochureLoading} style={{ marginTop:"10px" }}>
                      {brochureLoading ? (
                        <>
                          <span className="gpd-spinner" />
                          Preparing Download…
                        </>
                      ) : (
                        <>
                          Download Brochure
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="gpd-privacy">🔒 Your information is safe with us. No spam, ever.</p>
                  </form>
                </>
              ) : (
                <div className="gpd-success">
                  <div className="gpd-success-ring">✅</div>
                  <h3>Download Started!</h3>
                  <p>
                    Thank you, <strong>{brochureFormData.name}</strong>. Your brochure is downloading.
                    Our team will reach out to you shortly.
                  </p>
                  <button className="gpd-done-btn" onClick={closeBrochure}>CLOSE</button>
                </div>
              )}
            </div>

            {/* ── RIGHT: IMAGE ── */}
            <div className="gpd-image-col">
              <img
                src="form-1.png"
                alt="GPD Project"
              />
            </div>

          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          COMPACT CENTERED MODAL — Book a Site Visit
      ════════════════════════════════════════ */}
      {visitOpen && (
        <div
          className={`gpd-modal-backdrop${visitPhase !== "idle" ? ` ${visitPhase}` : ""}`}
          onClick={closeVisit}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>

            {/* ── CLOSE BUTTON ── */}
            <button className="gpd-close-btn" onClick={closeVisit} aria-label="Close">✕</button>

            {/* ── LEFT: FORM ── */}
            <div className="gpd-form-col">

              {submitted ? (
                /* ── SUCCESS ── */
                <div className="gpd-success">
                  <div className="gpd-success-ring">✅</div>
                  <h3>Visit Confirmed!</h3>
                  <p>Our team will reach out within <strong>24 hours</strong> to confirm your slot. We look forward to meeting you.</p>
                  <button className="gpd-done-btn" onClick={closeVisit}>DONE</button>
                </div>
              ) : (
                <>
                  {/* Tag + heading */}
                  <div className="gpd-tag-pill">
                    <div className="gpd-tag-dot" />
                    <span>Site Visit</span>
                  </div>
                  <h2 className="gpd-form-heading">Book Your Site Visit</h2>
                  <p className="gpd-form-sub">Our team will confirm your slot within 24 hours.</p>

                  {/* STEP INDICATOR */}
                  <div className="gpd-steps-row">
                    {stepLabels.map((label, i) => {
                      const n = i + 1;
                      const cls = n < step ? "done" : n === step ? "active" : "";
                      return (
                        <div key={n} className={`gpd-step-item ${cls}`}>
                          <div className="gpd-step-num">
                            {n < step ? (
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            ) : n}
                          </div>
                          <div className="gpd-step-label">{label}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── STEP 1: Details ── */}
                  {step === 1 && (
                    <div className="gpd-fields-block">
                      <div className="gpd-field-row">
                        <div className="gpd-field">
                          <label>Full Name</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </span>
                            <input className="gpd-f" type="text" placeholder="Rajesh Kumar"
                              value={formData.name} onChange={e => handleField("name", e.target.value)} />
                          </div>
                        </div>
                        <div className="gpd-field">
                          <label>Phone Number</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </span>
                            <input className="gpd-f" type="tel" placeholder="+91 98765 43210"
                              value={formData.phone} onChange={e => handleField("phone", e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="gpd-field-row full">
                        <div className="gpd-field">
                          <label>Email Address</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </span>
                            <input className="gpd-f" type="email" placeholder="you@email.com"
                              value={formData.email} onChange={e => handleField("email", e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="gpd-btn-row">
                        <button className="gpd-btn-next" onClick={() => setStep(2)}>
                          Continue
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Project & Date ── */}
                  {step === 2 && (
                    <div className="gpd-fields-block">
                      <div className="gpd-field-row full">
                        <div className="gpd-field">
                          <label>Preferred Project</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </span>
                            <select className="gpd-f" value={formData.project}
                              onChange={e => handleField("project", e.target.value)}>
                              <option value="" disabled>Select a project</option>
                              {PROJECTS.map(p => <option key={p.slug}>{p.name}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="gpd-field-row full">
                        <div className="gpd-field">
                          <label>Preferred Date</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </span>
                            <input className="gpd-f" type="date" value={formData.date}
                              onChange={e => handleField("date", e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>Preferred Time Slot</label>
                        <div className="gpd-time-grid">
                          {TIME_SLOTS.map(slot => (
                            <button
                              key={slot.label}
                              className={`gpd-slot${selectedSlot === slot.label ? " selected" : ""}`}
                              onClick={() => setSelectedSlot(slot.label)}
                            >
                              {slot.icon} {slot.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="gpd-btn-row">
                        <button className="gpd-btn-back" onClick={() => setStep(1)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                          Back
                        </button>
                        <button className="gpd-btn-next" onClick={() => setStep(3)}>
                          Continue
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Review & Confirm ── */}
                  {step === 3 && (
                    <div className="gpd-fields-block">
                      <div className="gpd-summary-card">
                        {[
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label:"Name",    val: formData.name    || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label:"Phone",   val: formData.phone   || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:"Email",   val: formData.email   || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label:"Project", val: formData.project  || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label:"Date",    val: formData.date    || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:"Time",    val: selectedSlot     || "—" },
                        ].map(row => (
                          <div key={row.label} className="gpd-summary-row">
                            <div className="gpd-summary-icon" style={{ color:"rgba(255,255,255,0.3)" }}>{row.icon}</div>
                            <span className="gpd-summary-label">{row.label}</span>
                            <span className="gpd-summary-val">{row.val}</span>
                          </div>
                        ))}
                      </div>

                      <div className="gpd-field-row full" style={{ marginTop:"4px" }}>
                        <div className="gpd-field">
                          <label>Message (Optional)</label>
                          <textarea className="gpd-f no-icon" placeholder="Any questions or special requirements…"
                            value={formData.message} onChange={e => handleField("message", e.target.value)} />
                        </div>
                      </div>

                      <div className="gpd-btn-row">
                        <button className="gpd-btn-back" onClick={() => setStep(2)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                          Back
                        </button>
                        <button className="gpd-btn-confirm" onClick={() => setSubmitted(true)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Confirm Visit
                        </button>
                      </div>
                      <p className="gpd-privacy">🔒 Your details are kept strictly confidential.</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── RIGHT: IMAGE ONLY ── */}
            <div className="gpd-image-col">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&fit=crop&q=80"
                alt="GPD Project"
              />
            </div>

          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .cta-inner {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
            padding: 28px 28px !important;
          }
          .cta-text-block {
            grid-column: 1 / -1;
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            padding-bottom: 20px;
          }
          .cta-btn {
            grid-column: 1 / -1;
            justify-content: center;
          }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .cta-banner {
            margin: 0 16px 48px !important;
            max-width: calc(100% - 32px) !important;
            border-radius: 12px 12px 0 0 !important;
          }
          .cta-inner {
            grid-template-columns: 1fr !important;
            padding: 24px 20px !important;
            gap: 16px !important;
          }
          .cta-text-block {
            grid-column: 1 / -1 !important;
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            padding-bottom: 16px;
          }
          .cta-feature {
            flex-direction: row !important;
          }
          .cta-btn {
            grid-column: 1 / -1 !important;
            justify-content: center !important;
            padding: 14px 20px !important;
            font-size: 12px !important;
          }
          .brochure-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        /* ── VERY SMALL (≤ 380px) ── */
        @media (max-width: 380px) {
          .cta-banner {
            margin: 0 10px 40px !important;
            max-width: calc(100% - 20px) !important;
          }
          .cta-inner {
            padding: 20px 16px !important;
          }
        }

        /* ══════════════════════════════
           COMPACT MODAL — Book a Site Visit
           (matches Header / HeroSection modal styling)
        ══════════════════════════════ */
        .gpd-modal-backdrop {
          position: fixed; inset: 0; z-index: 1200;
          background: rgba(8,8,10,0);
          backdrop-filter: blur(0px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          transition: background 0.32s ease, backdrop-filter 0.32s ease;
        }
        .gpd-modal-backdrop.entering,
        .gpd-modal-backdrop.entered {
          background: rgba(8,8,10,0.72);
          backdrop-filter: blur(6px);
        }
        .gpd-modal-backdrop.leaving {
          background: rgba(8,8,10,0);
          backdrop-filter: blur(0px);
          transition: background 0.22s ease, backdrop-filter 0.22s ease;
        }

        .gpd-modal-card {
          width: 100%; max-width: 860px; max-height: 88vh;
          background: #0d0d0d;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 30px 90px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.4);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.05fr 0.85fr;
          position: relative;
          opacity: 0;
          transform: translateY(18px) scale(0.97);
          transition: opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .gpd-modal-backdrop.entering .gpd-modal-card,
        .gpd-modal-backdrop.entered .gpd-modal-card {
          opacity: 1; transform: translateY(0) scale(1);
        }
        .gpd-modal-backdrop.leaving .gpd-modal-card {
          opacity: 0; transform: translateY(10px) scale(0.98);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }

        .gpd-form-col {
          padding: 36px 38px; overflow-y: auto;
          display: flex; flex-direction: column;
          background: #0d0d0d;
          max-height: 88vh;
        }
        .gpd-form-col::-webkit-scrollbar { width: 5px; }
        .gpd-form-col::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }

        .gpd-tag-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(227,30,36,0.1);
          border: 1px solid rgba(227,30,36,0.25);
          border-radius: 100px; padding: 5px 14px 5px 10px;
          width: fit-content; margin-bottom: 16px;
        }
        .gpd-tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #e31e24;
          animation: gpdPulseDot 1.8s ease-in-out infinite;
        }
        @keyframes gpdPulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(1.5); }
        }
        .gpd-tag-pill span {
          font-size: 10px; font-weight: 700; letter-spacing: .18em;
          text-transform: uppercase; color: #e31e24;
          font-family: 'Sora', sans-serif;
        }

        .gpd-form-heading {
          font-family: 'Sora', sans-serif;
          font-size: clamp(24px,2.6vw,32px); font-weight: 700;
          color: #fff; line-height: 1.1; letter-spacing: -0.4px;
          margin: 0 0 6px;
        }
        .gpd-form-sub {
          font-family: 'Sora', sans-serif;
          font-size: 12.5px; color: rgba(255,255,255,0.35);
          line-height: 1.7; font-weight: 300; margin: 0 0 26px;
        }

        .gpd-steps-row {
          display: flex; align-items: center;
          gap: 0; margin-bottom: 26px;
        }
        .gpd-step-item {
          display: flex; align-items: center; gap: 7px;
          flex: 1; position: relative;
        }
        .gpd-step-item:not(:last-child)::after {
          content: ''; position: absolute;
          left: 24px; right: -4px; top: 50%;
          height: 1px; background: rgba(255,255,255,0.1); z-index: 0;
          transition: background 0.3s ease;
        }
        .gpd-step-item.done::after { background: #e31e24; }
        .gpd-step-num {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3);
          font-family: 'Sora', sans-serif; flex-shrink: 0;
          position: relative; z-index: 1;
          background: #0d0d0d; transition: all .25s;
        }
        .gpd-step-item.active .gpd-step-num {
          border-color: #e31e24; background: #e31e24; color: #fff;
        }
        .gpd-step-item.done .gpd-step-num {
          border-color: #e31e24;
          background: rgba(227,30,36,0.12); color: #e31e24;
        }
        .gpd-step-label {
          font-size: 9.5px; font-weight: 600; letter-spacing: .07em;
          text-transform: uppercase; color: rgba(255,255,255,0.25);
          font-family: 'Sora', sans-serif; white-space: nowrap;
          display: none;
        }
        .gpd-step-item.active .gpd-step-label {
          color: rgba(255,255,255,0.7); display: block;
        }

        .gpd-fields-block { display: flex; flex-direction: column; gap: 14px; }
        .gpd-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .gpd-field-row.full { grid-template-columns: 1fr; }
        .gpd-field { display: flex; flex-direction: column; gap: 6px; }
        .gpd-field label {
          font-size: 9.5px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          font-family: 'Sora', sans-serif;
        }
        .gpd-input-wrap { position: relative; }
        .gpd-input-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.2); pointer-events: none;
          display: flex; align-items: center;
        }
        .gpd-f {
          width: 100%; padding: 11px 14px 11px 38px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; font-family: 'Sora', sans-serif;
          font-size: 12.5px; color: #fff; outline: none;
          box-sizing: border-box;
          transition: border-color .2s, background .2s;
        }
        .gpd-f::placeholder { color: rgba(255,255,255,0.18); }
        .gpd-f:focus {
          border-color: rgba(227,30,36,0.5);
          background: rgba(227,30,36,0.04);
        }
        .gpd-f.no-icon { padding-left: 14px; }
        select.gpd-f {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 36px; color: rgba(255,255,255,0.45);
        }
        select.gpd-f option { background: #1c1c1c; color: #fff; }
        textarea.gpd-f { resize: none; height: 64px; padding-top: 11px; padding-left: 14px; }

        .gpd-time-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
        }
        .gpd-slot {
          padding: 10px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; background: rgba(255,255,255,0.03);
          font-size: 11.5px; font-weight: 600; letter-spacing: .03em;
          color: rgba(255,255,255,0.4); cursor: pointer; text-align: center;
          font-family: 'Sora', sans-serif; transition: all .18s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          user-select: none;
        }
        .gpd-slot:hover { border-color: rgba(227,30,36,0.35); color: rgba(255,255,255,.75); }
        .gpd-slot.selected {
          border-color: #e31e24;
          background: rgba(227,30,36,0.1); color: #fff;
        }

        .gpd-summary-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 16px 18px;
          display: flex; flex-direction: column; gap: 0;
        }
        .gpd-summary-row {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .gpd-summary-row:last-child { border-bottom: none; }
        .gpd-summary-icon {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gpd-summary-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,0.25);
          font-family: 'Sora', sans-serif; flex: 1;
        }
        .gpd-summary-val {
          font-size: 11.5px; color: rgba(255,255,255,0.75);
          font-family: 'Sora', sans-serif; text-align: right;
        }

        .gpd-btn-row {
          display: flex; gap: 10px; margin-top: 24px;
        }
        .gpd-btn-back {
          padding: 12px 20px; background: transparent;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
          color: rgba(255,255,255,0.5); font-family: 'Sora', sans-serif;
          font-size: 11.5px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: all .2s;
        }
        .gpd-btn-back:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
        .gpd-btn-next {
          flex: 1; padding: 13px 20px; background: #e31e24;
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 11.5px;
          font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background .2s, transform .15s;
        }
        .gpd-btn-next:hover { background: #c01820; transform: translateY(-1px); }
        .gpd-btn-confirm {
          flex: 1; padding: 13px 20px; background: #0f9a60;
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 11.5px;
          font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background .2s, transform .15s;
        }
        .gpd-btn-confirm:hover { background: #0b7d4d; transform: translateY(-1px); }

        .gpd-btn-brochure {
          width: 100%; padding: 13px 20px; 
          background: #e31e24;
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 11.5px;
          font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background .2s, transform .15s, opacity .2s;
        }
        .gpd-btn-brochure:hover:not(:disabled) { 
          background: #c01820;
          transform: translateY(-1px); 
        }
        .gpd-btn-brochure:disabled { opacity: 0.75; cursor: not-allowed; }

        .gpd-spinner {
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          animation: gpdSpin 0.7s linear infinite; flex-shrink: 0;
        }
        @keyframes gpdSpin { to { transform: rotate(360deg); } }

        .gpd-privacy {
          font-size: 9.5px; color: rgba(255,255,255,0.18);
          text-align: center; margin-top: 10px;
          font-family: 'Sora', sans-serif;
        }

        .gpd-success {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; gap: 12px; padding: 20px;
          min-height: 320px;
        }
        .gpd-success-ring {
          width: 60px; height: 60px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; margin-bottom: 6px;
        }
        .gpd-success h3 {
          font-family: 'Sora', sans-serif;
          font-size: 26px; font-weight: 700; color: #fff; margin: 0;
        }
        .gpd-success p {
          font-family: 'Sora', sans-serif;
          font-size: 12.5px; color: rgba(255,255,255,0.35);
          line-height: 1.8; max-width: 280px; margin: 0;
        }
        .gpd-success p strong { color: rgba(255,255,255,0.75); font-weight: 600; }
        .gpd-done-btn {
          margin-top: 8px; padding: 10px 30px;
          background: transparent; color: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.14); border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 10.5px;
          font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
          cursor: pointer; transition: border-color .2s, color .2s;
        }
        .gpd-done-btn:hover { border-color: #e31e24; color: #fff; }

        .gpd-image-col {
          position: relative; overflow: hidden;
          max-height: 88vh;
        }
        .gpd-image-col img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .gpd-image-col::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
          pointer-events: none;
        }

        .gpd-close-btn {
          position: absolute; top: 16px; right: 16px;
          z-index: 10; width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.25s;
        }
        .gpd-close-btn:hover { background: rgba(255,255,255,0.16); transform: rotate(90deg); }

        @media (max-width: 768px) {
          .gpd-modal-card { grid-template-columns: 1fr !important; max-width: 480px; }
          .gpd-image-col { display: none !important; }
          .gpd-form-col { padding: 30px 26px !important; }
        }
        @media (max-width: 640px) {
          .gpd-modal-backdrop { padding: 0 !important; align-items: flex-end !important; }
          .gpd-modal-card {
            max-width: 100% !important; width: 100%;
            max-height: 92dvh !important; border-radius: 20px 20px 0 0 !important;
            transform: translateY(100%) !important;
          }
          .gpd-modal-backdrop.entering .gpd-modal-card,
          .gpd-modal-backdrop.entered .gpd-modal-card { transform: translateY(0) !important; }
          .gpd-modal-backdrop.leaving .gpd-modal-card { transform: translateY(100%) !important; }
          .gpd-form-col { max-height: 92dvh !important; padding: 26px 18px !important; }
          .gpd-field-row { grid-template-columns: 1fr !important; }
          .gpd-time-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}

function CtaFeature({ icon, label }) {
  return (
    <div className="cta-feature" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        className="cta-icon"
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function EmiIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function LegalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}