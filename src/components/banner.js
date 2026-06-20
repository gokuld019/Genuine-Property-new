"use client";
import { useState, useEffect, useRef } from "react";
import { Building2, Wifi, Leaf, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SplitWords({ text, className, style }) {
  return (
    <span className={className} style={{ ...style, display: "block", overflow: "hidden" }}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-wrap"
          style={{ display: "inline-block", overflow: "hidden", marginRight: word === "" ? 0 : "0.25em" }}
        >
          <span className="word" style={{ display: "inline-block" }}>{word}</span>
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhase, setModalPhase] = useState("idle"); // idle | entering | entered | leaving
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", city: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtextRef = useRef(null);
  const pillarsRef = useRef(null);
  const ctasRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);
  const eyebrowRef = useRef(null);
  const overlayLeftRef = useRef(null);
  const modalTimerRef = useRef(null);

  const featureCards = [
    { tag: "WELL PLANNED", title: "Infrastructure", Icon: Building2 },
    { tag: "SMART CONNECTIVITY", title: "Better Connectivity", Icon: Wifi },
    { tag: "NURTURING SPACES", title: "Better Living", Icon: Leaf },
  ];

  const stats = [
    { value: "15+", label: "Years of Excellence" },
    { value: "50+", label: "Successful Projects" },
    { value: "5000+", label: "Happy Families" },
    { value: "10M+", label: "Sq. Ft. Developed" },
    { value: "100%", label: "Legal Transparency" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        overlayLeftRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0
      );

      tl.fromTo(
        eyebrowRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        0.3
      );

      const line1Words = line1Ref.current?.querySelectorAll(".word");
      if (line1Words?.length) {
        tl.fromTo(
          line1Words,
          { y: "105%", rotateX: -15 },
          { y: "0%", rotateX: 0, duration: 0.85, stagger: 0.08 },
          0.45
        );
      }

      const line2Words = line2Ref.current?.querySelectorAll(".word");
      if (line2Words?.length) {
        tl.fromTo(
          line2Words,
          { y: "105%", rotateX: -15 },
          { y: "0%", rotateX: 0, duration: 0.85, stagger: 0.1 },
          0.6
        );
      }

      tl.fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1.05
      );

      const pillars = pillarsRef.current?.querySelectorAll(".hero-pillar");
      if (pillars?.length) {
        tl.fromTo(
          pillars,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          1.2
        );
      }

      tl.fromTo(
        ctasRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        1.42
      );

      const cards = cardsRef.current?.querySelectorAll(".feature-card");
      if (cards?.length) {
        tl.fromTo(
          cards,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65, stagger: 0.13, ease: "back.out(1.4)" },
          0.9
        );
      }

      const statValues = statsRef.current?.querySelectorAll(".stat-value");
      const statItems = statsRef.current?.querySelectorAll(".stat-item");

      if (statItems?.length) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "expo.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 88%", once: true },
          }
        );
      }

      if (statValues?.length) {
        statValues.forEach((el) => {
          const raw = el.textContent || "";
          const suffix = raw.replace(/[\d.]/g, "");
          const num = parseFloat(raw);
          if (isNaN(num)) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: num, duration: 1.6, ease: "power2.out", delay: 0.3,
            scrollTrigger: { trigger: statsRef.current, start: "top 88%", once: true },
            onUpdate() {
              const display = Number.isInteger(num)
                ? Math.round(obj.val).toLocaleString()
                : obj.val.toFixed(1);
              el.textContent = display + suffix;
            },
          });
        });
      }

      const cardEls = cardsRef.current?.querySelectorAll(".feature-card");
      if (cardEls?.length) {
        cardEls.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -5 : 5,
            duration: 2.5 + i * 0.4, ease: "sine.inOut",
            repeat: -1, yoyo: true, delay: i * 0.3,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ── body scroll lock while modal open ── */
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  /* ── escape key closes modal ── */
  useEffect(() => {
    if (!modalOpen) return;
    const fn = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      const link = document.createElement("a");
      link.href = "/brochure.pdf";
      link.download = "GPD-Brochure.pdf";
      link.click();
    }, 1400);
  };

  /* ── open modal (matches Header modal animation timing) ── */
  const openModal = () => {
    setSubmitted(false);
    setLoading(false);
    setFormData({ name: "", phone: "", email: "", city: "" });
    setModalOpen(true);
    setModalPhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalPhase("entering"));
    });
    clearTimeout(modalTimerRef.current);
    modalTimerRef.current = setTimeout(() => setModalPhase("entered"), 380);
  };

  /* ── close modal (matches Header modal animation timing) ── */
  const closeModal = () => {
    setModalPhase("leaving");
    clearTimeout(modalTimerRef.current);
    modalTimerRef.current = setTimeout(() => {
      setModalOpen(false);
      setModalPhase("idle");
      setSubmitted(false);
      setFormData({ name: "", phone: "", email: "", city: "" });
      setLoading(false);
    }, 280);
  };

  return (
    <div className="hero-root" ref={heroRef}>

      {/* ── Brochure Modal (compact, centered — matches Header site-visit modal) ── */}
      {modalOpen && (
        <div
          className={`gpd-modal-backdrop${modalPhase !== "idle" ? ` ${modalPhase}` : ""}`}
          onClick={closeModal}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>

            {/* ── CLOSE BUTTON ── */}
            <button className="gpd-close-btn" onClick={closeModal} aria-label="Close">
              <X size={15} />
            </button>

            {/* ── LEFT: FORM ── */}
            <div className="gpd-form-col">
              {!submitted ? (
                <>
                  <div className="gpd-tag-pill">
                    <div className="gpd-tag-dot" />
                    <span>Exclusive Download</span>
                  </div>
                  <h2 className="gpd-form-heading">Get Our Brochure</h2>
                  <p className="gpd-form-sub">Share a few details and we&apos;ll send it right away.</p>

                  <form onSubmit={handleSubmit} className="gpd-fields-block">
                    <div className="gpd-field-row">
                      <div className="gpd-field">
                        <label>Full Name <span className="gpd-req">*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          </span>
                          <input
                            className="gpd-f" type="text" name="name" required
                            placeholder="Your name" value={formData.name} onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>Phone <span className="gpd-req">*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          </span>
                          <input
                            className="gpd-f" type="tel" name="phone" required
                            placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange}
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
                            placeholder="you@email.com" value={formData.email} onChange={handleChange}
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
                            placeholder="Chennai, Bangalore…" value={formData.city} onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="gpd-btn-confirm" disabled={loading} style={{ marginTop: "10px" }}>
                      {loading ? (
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
                    Thank you, <strong>{formData.name}</strong>. Your brochure is downloading.
                    Our team will reach out to you shortly.
                  </p>
                  <button className="gpd-done-btn" onClick={closeModal}>CLOSE</button>
                </div>
              )}
            </div>

            {/* ── RIGHT: IMAGE ONLY ── */}
            <div className="gpd-image-col">
              <img
                src="form-1.png"
                alt="GPD Project"
              />
            </div>

          </div>
        </div>
      )}

      {/* ── Hero + Stats wrapper ── */}
      <div className="hero-wrapper">
        <section className="hero-section">

          {/*
            ── BANNER IMAGE ──
            Desktop  → /homebanner.jpeg        (landscape, wide)
            Mobile   → /homebanner-mobile.jpeg (portrait, 9:16 or square crop)
            Drop your mobile image at /public/homebanner-mobile.jpeg
            The <picture> element switches automatically at 768px.
          */}
          <picture>
            {/* Mobile: shown when viewport ≤ 767px */}
            <source media="(max-width: 767px)" srcSet="/homebanner-mobile.jpeg" />
            {/* Desktop fallback */}
            <img
              src="/homebanner.jpeg"
              alt="Genuine Property Developers"
              className="hero-bg-img"
            />
          </picture>

          <div className="hero-overlay-left" ref={overlayLeftRef} />
          <div className="hero-overlay-bottom" />

          <div className="hero-copy">
            {/* Eyebrow */}
            <div className="hero-eyebrow" ref={eyebrowRef}>
              <span className="eyebrow-line" />
              <span className="eyebrow-text">GENUINE PROPERTY DEVELOPERS</span>
            </div>

          {/* Headline */}
<h1 className="hero-heading" style={{ perspective: "600px" }}>
  <span ref={line1Ref} style={{ display: "block", overflow: "hidden" }}>
    {"THE GROUND WHERE".split(" ").map((word, i) => (
      <span
        key={i}
        className="word-wrap"
        style={{
          display: "inline-block",
          overflow: "hidden",
          marginRight: "0.28em",
        }}
      >
        <span className="word" style={{ display: "inline-block" }}>
          {word}
        </span>
      </span>
    ))}
  </span>

  <span ref={line2Ref} style={{ display: "block", overflow: "hidden" }}>
    {"FUTURES".split(" ").map((word, i) => (
      <span
        key={i}
        className="word-wrap"
        style={{
          display: "inline-block",
          overflow: "hidden",
          marginRight: "0.28em",
        }}
      >
        <span className="word" style={{ display: "inline-block" }}>
          {word}
        </span>
      </span>
    ))}
    {" "}
    <span
      className="word-wrap"
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      <span
        className="word hero-accent"
        style={{ display: "inline-block" }}
      >
        BEGIN.
      </span>
    </span>
  </span>
</h1>

<p className="hero-subtext" ref={subtextRef}>
  Thoughtfully crafted plotted communities by Genuine Property Developers,
  offering premium locations, clear titles, and long-term investment
  opportunities across Chennai.
</p>

            <div className="hero-pillars" ref={pillarsRef}>
              {[
                { label: "Prime\nLocations" },
                { label: "Clear Titles &\nLegal Security" },
                { label: "Well Planned\nCommunities" },
              ].map((item, i) => (
                <div key={i} className="hero-pillar">
                  <div className="hero-pillar-line" />
                  <p className="hero-pillar-text">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="hero-ctas" ref={ctasRef}>
              <a href="#plots" className="btn-primary">
                EXPLORE PLOTS
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <button onClick={openModal} className="btn-secondary">
                DOWNLOAD BROCHURE
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Feature cards — desktop only */}
          <div className="hero-cards" ref={cardsRef}>
            {featureCards.map((card, i) => (
              <div key={i} className="feature-card">
                <div className="icon-wrap">
                  <card.Icon size={20} color="#b03030" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="card-tag">{card.tag}</p>
                  <h3 className="card-title">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-bottom-tags">
            {["GATED COMMUNITIES", "LANDSCAPED LIVING"].map((label) => (
              <div key={label} className="bottom-tag">
                <span className="bottom-tag-text">{label}</span>
                <div className="bottom-tag-line" />
              </div>
            ) )}
          </div>
        </section>

        {/* Stats bar */}
        <div className="stats-bar-wrap">
          <div className="stats-bar" ref={statsRef}>
            {stats.map((stat, i) => (
              <div key={i} className={`stat-item ${i < stats.length - 1 ? "stat-divider" : ""}`}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-root { font-family: 'Sora', 'DM Sans', sans-serif; background: #ffffff; color: #fff; }
        .hero-wrapper { position: relative; }

        /* ── HERO SECTION ── */
        .hero-section { height: 100svh; min-height: 560px; position: relative; overflow: hidden; }

        /* Banner image — object-fit cover, switches via <picture> */
        .hero-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          /* Desktop: focus centre-right where the plot/land usually is */
          object-position: center center;
        }

        .hero-overlay-left {
          position: absolute; inset: 0; z-index: 1;
        }
        .hero-overlay-bottom {
          position: absolute; inset: 0; z-index: 1;
        }

        /* ── EYEBROW ── */
        .hero-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
          opacity: 0;
        }
        .eyebrow-line {
          display: block; width: 32px; height: 1.5px;
          background: linear-gradient(to right, #b03030, rgba(176,48,48,0.3));
          flex-shrink: 0;
        }
        .eyebrow-text {
          font-size: 10px; letter-spacing: 0.22em; font-weight: 600;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
        }

        /* ── COPY ── */
        .hero-copy {
          position: absolute; top: 0; left: 165px; width: 42%; height: 100%;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 40px 100px 56px; z-index: 2;
        }
        .hero-heading {
          font-size: clamp(32px, 3.6vw, 58px); font-weight: 800;
          line-height: 1.08; margin-bottom: 16px; letter-spacing: -0.01em;
        }
        .word { will-change: transform; }
        .hero-accent { color: #b03030; }
        .hero-subtext {
          color: rgba(255,255,255,0.62); font-size: 14px; line-height: 1.75;
          max-width: 320px; margin-bottom: 28px; opacity: 0;
        }
        .hero-pillars { display: flex; gap: 28px; margin-bottom: 32px; flex-wrap: wrap; }
        .hero-pillar { opacity: 0; }
        .hero-pillar-line { width: 28px; height: 2px; background: #b03030; margin-bottom: 10px; }
        .hero-pillar-text { font-size: 11px; color: rgba(255,255,255,0.7); white-space: pre-line; line-height: 1.5; }
        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; opacity: 0; }

        .btn-primary {
          background: #b03030; color: #fff; padding: 13px 24px; border-radius: 4px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-decoration: none;
          display: flex; align-items: center; gap: 10px; white-space: nowrap;
          border: none; cursor: pointer; font-family: inherit; transition: opacity 0.2s, transform 0.2s;
        }
        .btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
        .btn-secondary {
          background: transparent; color: #fff; padding: 13px 24px;
          border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
          display: flex; align-items: center; gap: 10px; white-space: nowrap;
          cursor: pointer; font-family: inherit; transition: border-color 0.2s, transform 0.2s;
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.7); transform: translateY(-2px); }

        /* ── CARDS ── */
        .hero-cards {
          position: absolute; top: 50%; right: 30px; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 12px; z-index: 5; width: 220px;
        }
        .feature-card {
          background: rgba(10,10,10,0.8); backdrop-filter: blur(10px);
          border-radius: 8px; padding: 16px 18px;
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: background 0.3s, border-color 0.3s;
          cursor: pointer; display: flex; align-items: center; gap: 14px;
          opacity: 0; will-change: transform;
        }
        .feature-card:hover { background: rgba(176,48,48,0.15); border-color: #b03030; }
        .feature-card:hover .icon-wrap { background: rgba(176,48,48,0.25); border-color: rgba(176,48,48,0.5); }
        .icon-wrap {
          width: 42px; height: 42px; min-width: 42px; border-radius: 8px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s, border-color 0.3s;
        }
        .card-tag { font-size: 9px; color: rgba(255,255,255,0.45); letter-spacing: 0.15em; margin-bottom: 3px; text-transform: uppercase; font-weight: 600; }
        .card-title { font-size: 14px; font-weight: 700; color: #fff; line-height: 1.3; }
        .hero-bottom-tags { position: absolute; bottom: 90px; right: 30px; display: flex; flex-direction: column; gap: 8px; z-index: 4; }
        .bottom-tag { display: flex; align-items: center; gap: 10px; justify-content: flex-end; }
        .bottom-tag-text { font-size: 9px; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; font-weight: 600; }
        .bottom-tag-line { width: 20px; height: 1px; background: #b03030; }

        /* ── STATS BAR ── */
        .stats-bar-wrap { position: relative; z-index: 10; display: flex; justify-content: center; padding: 0 32px; margin-top: -50px; top: 9px; }
        .stats-bar {
          width: 100%; max-width: 1400px; background: #9b0404; border-radius: 14px;
          display: flex; justify-content: space-around; align-items: center;
          padding: 28px 40px; flex-wrap: wrap; gap: 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .stat-item {
          text-align: center; display: flex; flex-direction: column;
          align-items: center; flex: 1; min-width: 100px; opacity: 0;
        }
        .stat-divider { border-right: 1px solid rgba(255,255,255,0.2); padding-right: 24px; }
        .stat-value { font-size: clamp(24px, 2.8vw, 27px); font-weight: 800; color: #fff; line-height: 1; }
        .stat-label { font-size: 12px; color: rgba(255,255,255,0.85); margin-top: 6px; }

        /* ══════════════════════════════
           COMPACT MODAL — Brochure (matches Header site-visit modal styling)
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
          width: 100%; max-width: 820px; max-height: 88vh;
          background: #0d0d0d;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 30px 90px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(176,48,48,0.08);
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
          background: rgba(176,48,48,0.1);
          border: 1px solid rgba(176,48,48,0.25);
          border-radius: 100px; padding: 5px 14px 5px 10px;
          width: fit-content; margin-bottom: 16px;
        }
        .gpd-tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #b03030;
          animation: gpdPulseDot 1.8s ease-in-out infinite;
        }
        @keyframes gpdPulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(1.5); }
        }
        .gpd-tag-pill span {
          font-size: 10px; font-weight: 700; letter-spacing: .18em;
          text-transform: uppercase; color: #b03030;
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

        .gpd-fields-block { display: flex; flex-direction: column; gap: 14px; }
        .gpd-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .gpd-field { display: flex; flex-direction: column; gap: 6px; }
        .gpd-field label {
          font-size: 9.5px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          font-family: 'Sora', sans-serif;
        }
        .gpd-req { color: #b03030; }
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
          border-color: rgba(176,48,48,0.5);
          background: rgba(176,48,48,0.04);
        }

        .gpd-btn-confirm {
          width: 100%; padding: 13px 20px; 
          background: #b03030; 
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 11.5px;
          font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background .2s, transform .15s, opacity .2s;
        }
        .gpd-btn-confirm:hover:not(:disabled) { 
          background: #8a2222; /* Darker red on hover */
          transform: translateY(-1px); 
        }
        .gpd-btn-confirm:disabled { opacity: 0.75; cursor: not-allowed; }

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
          line-height: 1.8; max-width: 300px; margin: 0;
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
        .gpd-done-btn:hover { border-color: #b03030; color: #fff; }

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
          color: #fff; cursor: pointer;
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
        }

        /* ══ RESPONSIVE (hero/stats) ══ */

        /* Tablet */
        @media (max-width: 1199px) and (min-width: 768px) {
          .hero-copy { width: 55%; padding: 80px 32px 100px 40px; }
          .hero-cards { width: 190px; right: 16px; }
          .hero-bottom-tags { display: none; }
        }

        /* ── MOBILE (≤ 767px) ── */
        @media (max-width: 767px) {
          /* Mobile banner: portrait crop, focus top-center where sky/landmark is */
          .hero-bg-img { object-position: center top; }

          /* Stronger overlay so text reads on portrait image */
          .hero-overlay-left {
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0.30) 0%,
              rgba(0,0,0,0.55) 40%,
              rgba(0,0,0,0.82) 100%
            );
          }
          .hero-overlay-bottom {
            background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%);
          }

          /* Hero takes full viewport height */
          .hero-section { height: 100svh; min-height: 620px; }

          /* Copy sits at bottom of hero on mobile */
          .hero-copy {
            position: absolute;
            top: auto; bottom: 0; left: 0;
            width: 100%; height: auto;
            padding: 0 20px 36px;
            justify-content: flex-end;
          }

          /* Slightly smaller heading on mobile */
          .hero-heading { font-size: clamp(28px, 8vw, 40px); margin-bottom: 12px; }

          .hero-subtext { font-size: 13px; max-width: 100%; margin-bottom: 20px; }

          /* Pillars: horizontal scroll row on mobile */
          .hero-pillars {
            gap: 20px; margin-bottom: 24px; flex-wrap: nowrap;
            overflow-x: auto; padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .hero-pillars::-webkit-scrollbar { display: none; }
          .hero-pillar { flex-shrink: 0; }
          .hero-pillar-text { font-size: 10px; }

          /* CTAs: side by side, full width */
          .hero-ctas { gap: 10px; }
          .btn-primary, .btn-secondary {
            font-size: 11px; padding: 12px 16px;
            flex: 1; justify-content: center;
          }

          /* Hide cards & bottom tags on mobile */
          .hero-cards { display: none; }
          .hero-bottom-tags { display: none; }

          /* Stats bar: flush, no negative margin */
          .stats-bar-wrap { margin-top: 0; top: 0; padding: 0 12px; }
          .stats-bar { border-radius: 10px; padding: 18px 12px; gap: 8px; }

          /* Stats: 2-column grid on mobile */
          .stat-item {
            flex: 1 1 calc(50% - 8px);
            min-width: 0;
            padding: 12px 6px;
            border-right: none !important;
          }
          .stat-item:nth-child(odd)  { border-right: 1px solid rgba(255,255,255,0.15) !important; }
          .stat-item:nth-child(1),
          .stat-item:nth-child(2)    { border-bottom: 1px solid rgba(255,255,255,0.12); }
          .stat-item:nth-child(3),
          .stat-item:nth-child(4)    { border-bottom: 1px solid rgba(255,255,255,0.12); }
          .stat-item:last-child      { flex: 1 1 100%; border-right: none !important; border-bottom: none; }
          .stat-divider              { border-right: none; padding-right: 0; }
          .stat-value                { font-size: clamp(22px, 6vw, 32px); }
          .stat-label                { font-size: 11px; }
        }

        /* Very small phones */
        @media (max-width: 390px) {
          .hero-copy { padding: 0 16px 28px; }
          .hero-heading { font-size: 26px; }
          .btn-primary, .btn-secondary { font-size: 10px; padding: 11px 12px; }
          .eyebrow-text { font-size: 9px; letter-spacing: 0.16em; }
        }

        /* Large desktop */
        @media (min-width: 1440px) {
          .hero-copy { padding-left: 80px; }
          .hero-cards { right: 60px; width: 240px; }
              .stats-bar {padding: 12px 60px;}
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-eyebrow, .hero-subtext, .hero-pillars .hero-pillar,
          .hero-ctas, .feature-card, .stat-item { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}