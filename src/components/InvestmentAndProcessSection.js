"use client";
import { useState, useEffect, useRef } from "react";

export default function InvestmentAndProcessSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const ctxRef = useRef(null);

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
      label: "Connect With Our Team",
      detail: "Get complete details on pricing, approvals, and availability. ",
      cta: "Free Consultation",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
        </svg>
      ),
    },
    {
      label: " Visit The Site",
      detail: "Explore the project location and surrounding developments firsthand.",
      cta: "Guided Site Visit",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      label: "Select Your Plot",
      detail: "Choose the plot that best fits your goals and budget.",
      cta: "Flexible Payment Plans",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Complete Documentation",
      detail: "Receive end-to-end support for approvals, registration, and paperwork.",
      cta: "RERA Compliant",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      label: "BUILD YOUR DREAM",
      detail: "Start construction whenever you're ready.",
      cta: "Build on Your Terms",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    let isMounted = true;

    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { SplitText } = await import("gsap/SplitText");
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (!isMounted || !sectionRef.current) return;

        const ctx = gsap.context(() => {
          const sec = sectionRef.current;
          if (!sec) return;

          const safe = (fn) => { try { fn(); } catch (e) { /* skip */ } };

          const revealHeading = (el, triggerEl, delay = 0) => {
            if (!el) return;
            safe(() => {
              const split = new SplitText(el, { type: "words,lines", linesClass: "gsap-line" });
              sec.querySelectorAll(".gsap-line").forEach((l) => {
                l.style.overflow = "hidden";
                l.style.display = "block";
                l.style.lineHeight = "1.3";
              });
              gsap.from(split.words, {
                scrollTrigger: { trigger: triggerEl || el, start: "top 85%", toggleActions: "play none none none" },
                y: "110%", opacity: 0, stagger: 0.07, duration: 0.75, ease: "expo.out", delay,
              });
            });
          };

          const revealEyebrow = (el, triggerEl) => {
            if (!el) return;
            gsap.from(el, {
              scrollTrigger: { trigger: triggerEl || el, start: "top 88%", toggleActions: "play none none none" },
              opacity: 0, y: 10, duration: 0.5, ease: "power3.out",
            });
          };

          // Investment section
          revealEyebrow(sec.querySelector(".inv-eyebrow"));
          revealHeading(sec.querySelector(".inv-heading"));

          const invBody = sec.querySelector(".inv-body");
          if (invBody) gsap.from(invBody, {
            scrollTrigger: { trigger: invBody, start: "top 88%", toggleActions: "play none none none" },
            opacity: 0, y: 14, duration: 0.6, ease: "power2.out", delay: 0.3,
          });

          const investCards = sec.querySelectorAll(".invest-card");
          if (investCards.length) {
            gsap.fromTo(investCards,
              { y: 40 },
              {
                y: 0, stagger: 0.1, duration: 0.65, ease: "power3.out",
                clearProps: "transform",
                scrollTrigger: { trigger: sec.querySelector(".invest-grid"), start: "top 82%", toggleActions: "play none none none" },
              }
            );
          }

          const sectionDivider = sec.querySelector(".section-divider");
          if (sectionDivider) gsap.from(sectionDivider, {
            scrollTrigger: { trigger: sectionDivider, start: "top 90%", toggleActions: "play none none none" },
            scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power3.out",
          });

          // Testimonials
          revealEyebrow(sec.querySelector(".test-eyebrow"));
          revealHeading(sec.querySelector(".test-heading"));

          const testCard = sec.querySelector(".test-card");
          if (testCard) gsap.from(testCard, {
            scrollTrigger: { trigger: testCard, start: "top 84%", toggleActions: "play none none none" },
            y: 30, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.2,
          });

          const testControls = sec.querySelector(".test-controls");
          if (testControls) gsap.from(testControls, {
            scrollTrigger: { trigger: testControls, start: "top 90%", toggleActions: "play none none none" },
            opacity: 0, y: 10, duration: 0.5, ease: "power2.out", delay: 0.3,
          });

          // Process
          revealHeading(sec.querySelector(".process-heading"));

          const processConnector = sec.querySelector(".process-connector");
          if (processConnector) gsap.from(processConnector, {
            scrollTrigger: { trigger: processConnector, start: "top 85%", toggleActions: "play none none none" },
            scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.inOut",
          });

          const stepCards = sec.querySelectorAll(".process-step");
          if (stepCards.length) {
            gsap.fromTo(stepCards,
              { y: 50 },
              {
                y: 0, stagger: 0.1, duration: 0.65, ease: "power3.out",
                clearProps: "transform",
                scrollTrigger: { trigger: sec.querySelector(".process-flex"), start: "top 82%", toggleActions: "play none none none" },
              }
            );

            stepCards.forEach((card, i) => {
              const icon = card.querySelector(".step-icon");
              if (icon) gsap.from(icon, {
                scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
                scale: 0, opacity: 0, duration: 0.5, ease: "back.out(2.5)", delay: 0.15 + i * 0.07,
              });

              const badge = card.querySelector(".step-badge");
              if (badge) gsap.from(badge, {
                scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
                scale: 0, duration: 0.4, ease: "back.out(3)", delay: 0.25 + i * 0.07,
              });

              const label = card.querySelector(".step-label");
              if (label) gsap.from(label, {
                scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
                opacity: 0, y: 6, duration: 0.4, ease: "power2.out", delay: 0.3 + i * 0.07,
              });
            });
          }

          ScrollTrigger.refresh();
        }, sectionRef);

        ctxRef.current = ctx;
      } catch (error) {
        console.error("GSAP init error:", error);
      }
    };

    initGSAP();

    return () => {
      isMounted = false;
      if (ctxRef.current) { ctxRef.current.revert(); ctxRef.current = null; }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div ref={sectionRef}>
      {/* Font via link — not @import inside style */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* ── Section 1: Investment ── */}
      <div className="invest-section">
        <div className="invest-grid">
          {/* Text col */}
          <div className="invest-text-col">
            <p className="inv-eyebrow">WHY INVEST IN PLOTS?</p>
           <h2 className="inv-heading">
  Land is the Smartest<br />
  Long-Term<br />
  <span className="red">Investment</span>
</h2>
            <p className="inv-body">
              Plots appreciate over time and offer the freedom to build your way, your time.
            </p>
          </div>

          {/* Cards */}
          <InvestCard icon={<StarIcon />}     title="High Appreciation Potential"    desc="Plots in emerging Chennai locations continue to grow in value over time." />
          <InvestCard icon={<BuildingIcon />} title="Build When You're Ready"                       desc="Purchase today and construct your dream home whenever you choose." />
          <InvestCard icon={<DocumentIcon />} title="Complete Ownership Freedom"                         desc="Design your home exactly the way you want." />
          <InvestCard icon={<ShieldIcon />}   title="Secure Family Asset"                           desc="Land remains one of the most reliable investments across generations." />
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider" />

      {/* ── Section 2: Testimonials + Process ── */}
      <div className="tp-section">
        <div className="tp-grid">

          {/* Left – Testimonials */}
          <div className="test-col">
            <p className="test-eyebrow">HAPPY CUSTOMERS</p>
            <h2 className="test-heading">
              Trusted By Thousands.<br />
              Recommended For <span className="red">Life.</span>
            </h2>

            <div className="test-card">
              <div className="quote-mark">"</div>
              <p className="test-text">{testimonials[activeTestimonial].text}</p>
              <div className="test-author">
                <div className="author-avatar">
                  <img
                    src={testimonials[activeTestimonial].img}
                    alt={testimonials[activeTestimonial].name}
                    onError={(e) => { e.target.style.display = "none"; }}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="author-name">{testimonials[activeTestimonial].name}</p>
                  <p className="author-role">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>

            <div className="test-controls">
              <div className="test-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`test-dot ${i === activeTestimonial ? "active" : ""}`}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`View testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="test-arrows">
                <button
                  className="test-arrow"
                  onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button
                  className="test-arrow"
                  onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
                  aria-label="Next"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right – Process */}
          <div className="process-col">
            <h2 className="process-heading">
              OUR <span className="red">SIMPLE</span> PROCESS
            </h2>

            <div className="process-wrap">
              {/* Connector line behind cards */}
              <div className="process-connector" />

              <div className="process-flex">
                {processSteps.map((step, i) => (
                  <div key={i} className="process-step">
                    {/* Icon circle (above card, sits on connector line) */}
                    <div className="step-icon">
                      {step.icon}
                    </div>

                    {/* Card */}
                    <div className="step-card">
                      <div className="step-badge">{String(i + 1).padStart(2, "0")}</div>
                      <p className="step-label">{step.label}</p>
                      <p className="step-detail">{step.detail}</p>
                      <div className="step-cta">{step.cta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .red { color: #b03030; }

        /* ══ INVEST SECTION (desktop — unchanged from original) ══ */
        .invest-section {
          background: #f5f5f5;
          padding: 80px 0;
          font-family: 'Sora', 'DM Sans', sans-serif;
        }

        .invest-grid {
          display: grid;
          grid-template-columns: 1.1fr repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          align-items: center;
        }

        .invest-text-col {
          padding-right: 16px;
        }

        .inv-eyebrow {
          color: #b03030;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .inv-heading {
          font-size: clamp(22px, 2.2vw, 34px);
          font-weight: 800;
          color: #111;
          line-height: 1.2;
          margin: 0 0 14px;
        }
        .inv-body {
          font-size: 13px;
          color: #666;
          line-height: 1.7;
        }

        /* ── Invest Cards (desktop — unchanged) ── */
        .invest-card {
          background: #fff;
          border-radius: 10px;
          padding: 24px 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
        }
        .invest-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }
        .invest-card-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #b03030;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-bottom: 14px;
          flex-shrink: 0;
        }
        .invest-card-title {
          font-size: 11px;
          font-weight: 800;
          color: #111;
          letter-spacing: 0.08em;
          margin: 0 0 4px;
          text-transform: uppercase;
        }
        .invest-card-subtitle {
          font-size: 12px;
          font-weight: 700;
          color: #b03030;
          margin: 0 0 8px;
        }
        .invest-card-desc {
          font-size: 12px;
          color: #777;
          line-height: 1.6;
        }

        /* ══ DIVIDER (unchanged) ══ */
        .section-divider {
          height: 0;
          border: none;
          max-width: 800px;
          margin: 0 auto;
        }

        /* ══ TESTIMONIALS + PROCESS (desktop — unchanged) ══ */
        .tp-section {
          background: #f5f5f5;
          font-family: 'Sora', 'DM Sans', sans-serif;
          padding: 72px 0;
        }
        .tp-grid {
          display: grid;
          grid-template-columns: 1fr 1.65fr;
          gap: 64px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          align-items: start;
        }

        /* ── Testimonials col (desktop — unchanged) ── */
        .test-col { display: flex; flex-direction: column; }

        .test-eyebrow {
          color: #b03030;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .test-heading {
          font-size: clamp(20px, 2.2vw, 32px);
          font-weight: 800;
          color: #111;
          line-height: 1.2;
          margin: 0 0 24px;
        }
        .test-card {
          background: #fff;
          border-radius: 10px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          margin-bottom: 20px;
          transition: box-shadow 0.3s ease;
        }
        .test-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .quote-mark {
          font-size: 40px;
          color: #b03030;
          line-height: 1;
          margin-bottom: 12px;
          font-family: Georgia, serif;
        }
        .test-text {
          font-size: 14px;
          color: #444;
          line-height: 1.7;
          margin: 0 0 20px;
          min-height: 70px;
        }
        .test-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ddd;
          overflow: hidden;
          flex-shrink: 0;
        }
        .author-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .author-name {
          font-size: 13px;
          font-weight: 700;
          color: #111;
        }
        .author-role {
          font-size: 12px;
          color: #888;
        }
        .test-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .test-dots { display: flex; gap: 6px; }
        .test-dot {
          height: 8px;
          border-radius: 4px;
          background: #ccc;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          width: 8px;
          padding: 0;
        }
        .test-dot.active {
          width: 20px;
          background: #b03030;
        }
        .test-arrows {
          display: flex;
          gap: 8px;
          margin-left: auto;
        }
        .test-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid #ccc;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .test-arrow:hover {
          border-color: #b03030;
          background: #fff5f5;
        }

        /* ── Process col (desktop — unchanged) ── */
        .process-col {}

        .process-heading {
          font-size: clamp(16px, 1.8vw, 24px);
          font-weight: 800;
          color: #111;
          margin: 0 0 40px;
          letter-spacing: 0.02em;
        }

        .process-wrap {
          position: relative;
        }

        .process-connector {
          position: absolute;
          top: 28px;
          left: calc(10% + 4px);
          right: calc(10% + 4px);
          height: 0;
          border-top: 2px dashed #e0c0c0;
          z-index: 0;
          transform-origin: left center;
        }

        /* FIX: align-items changed from flex-start → stretch so every
           .process-step (and therefore every .step-card inside it)
           takes on the height of the tallest card in the row. */
        .process-flex {
          display: flex;
          gap: 12px;
          position: relative;
          z-index: 1;
          align-items: stretch;
        }

        .process-step {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          will-change: transform;
        }

        .step-icon {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 2px solid #b03030;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b03030;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(176,48,48,0.15);
          transition: transform 0.3s ease;
          position: relative;
          z-index: 2;
        }
        .process-step:hover .step-icon { transform: scale(1.1); }

        /* FIX: .step-card now stretches to fill the .process-step height
           (which is equal across the row thanks to align-items: stretch
           above) and uses flex column + margin-top: auto on the CTA so
           the red label always sits flush with the bottom of the card,
           no matter how much detail text precedes it. */
        .step-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px 12px 16px;
          width: 100%;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          position: relative;
          transition: box-shadow 0.3s ease;
        }
        .step-card:hover { box-shadow: 0 6px 20px rgba(176,48,48,0.12); }

        .step-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #b03030;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-label {
          font-size: clamp(9px, 0.9vw, 9px);
          font-weight: 700;
          color: #111;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin: 8px 0 8px;
          line-height: 1.3;
          word-break: break-word;
        }
        .step-detail {
          font-size: clamp(10px, 0.85vw, 11px);
          color: #666;
          line-height: 1.6;
          margin: 0 0 12px;
        }
        .step-cta {
          font-size: clamp(9px, 0.8vw, 10px);
          font-weight: 700;
          color: #b03030;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-top: 1px solid #f0e0e0;
          padding-top: 10px;
          margin-top: auto;
        }

        /* GSAP line wrap */
        .gsap-line {
          overflow: hidden !important;
          display: block !important;
          line-height: 1.3;
        }

        /* ══════════════════════════════════════════════════
           RESPONSIVE — mobile & tablet only (1024px and below).
           Everything above is identical to the original desktop CSS.
           These overrides only kick in below 1024px so the web/desktop
           layout you already have is completely untouched.
           ══════════════════════════════════════════════════ */

        /* Tablet: 769px–1024px */
        @media (max-width: 1024px) {
          .invest-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .invest-text-col {
            grid-column: 1 / -1;
            padding-right: 0;
          }

          .tp-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          /* FIX: the 5-step row no longer squeezes into a cramped line —
             it switches to a clean 2-up wrap so each card has real width
             instead of shrinking to ~110px and crowding the text. */
          .process-connector { display: none; }
          .process-flex {
            flex-wrap: wrap;
            gap: 20px;
            align-items: stretch;
          }
          .process-step {
            flex: 1 1 calc(50% - 10px);
            min-width: 160px;
          }
          .step-label { font-size: 11px; }
          .step-detail { font-size: 12px; }
          .step-cta { font-size: 10px; }
        }

        /* Mobile: ≤768px */
        @media (max-width: 768px) {
          .invest-section { padding: 56px 0; }
          .invest-grid { grid-template-columns: repeat(2, 1fr); padding: 0 16px; gap: 12px; }
          .invest-text-col { grid-column: 1 / -1; }
          .invest-card { padding: 18px 12px; }

          .tp-section { padding: 56px 0; }
          .tp-grid { padding: 0 16px; gap: 40px; }

          .process-flex { flex-wrap: wrap; gap: 16px; align-items: stretch; }
          .process-step { flex: 1 1 calc(50% - 8px); min-width: 140px; }
          .process-connector { display: none; }
        }

        /* Small mobile: ≤480px — single column, no more squeezing */
        @media (max-width: 480px) {
          .invest-grid { grid-template-columns: 1fr; }
          .invest-card { flex-direction: row; text-align: left; align-items: flex-start; gap: 14px; }
          .invest-card-icon { margin-bottom: 0; }

          .process-flex { flex-direction: column; gap: 16px; }
          .process-step { flex: 1 1 100%; max-width: 320px; margin: 0 auto; }
          .step-label { font-size: 12px; }
          .step-detail { font-size: 12.5px; }
          .step-cta { font-size: 11px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .invest-card, .step-icon, .test-card { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

function InvestCard({ icon, title, subtitle, desc }) {
  return (
    <div className="invest-card">
      <div className="invest-card-icon">{icon}</div>
      <p className="invest-card-title">{title}</p>
      {subtitle && <p className="invest-card-subtitle">{subtitle}</p>}
      <p className="invest-card-desc">{desc}</p>
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
      <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
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