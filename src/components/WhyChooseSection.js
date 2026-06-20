"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseSection() {
  const features = [
    "Wide Roads & Better Connectivity.",
    "Underground Infrastructure",
    "24/7 Security & Surveillance",
    "Reliable Utility Connections",
    "Green Open Spaces",
    "Tree-Lined Avenues",
  ];

  const galleryImages = [
    { src: "/img-02.png", alt: "Roads" },
    { src: "/img-04.jpg", alt: "Park" },
    { src: "/img-03.png", alt: "Avenue" },
    { src: "/img-05.png", alt: "Villa" },
  ];

  const trackRef = useRef(null);
  const animRef = useRef(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);

  // Anim refs
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const subtextRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const mainImgRef = useRef(null);
  const stripRef = useRef(null);

  // ── Scrolling strip RAF ──
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.6;
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // ── GSAP animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      };

      // Eyebrow — slide in from left with line growing
      gsap.fromTo(
        eyebrowRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "expo.out", ...trigger }
      );

      // Heading line 1 — words clip up
      const line1Words = headingLine1Ref.current?.querySelectorAll(".word");
      if (line1Words?.length) {
        gsap.fromTo(
          line1Words,
          { y: "110%", rotateX: -20, opacity: 0 },
          {
            y: "0%", rotateX: 0, opacity: 1,
            duration: 0.85, stagger: 0.1, ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
            delay: 0.1,
          }
        );
      }

      // Heading line 2 — same, slightly later
      const line2Words = headingLine2Ref.current?.querySelectorAll(".word");
      if (line2Words?.length) {
        gsap.fromTo(
          line2Words,
          { y: "110%", rotateX: -20, opacity: 0 },
          {
            y: "0%", rotateX: 0, opacity: 1,
            duration: 0.85, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
            delay: 0.28,
          }
        );
      }

      // Subtext — fade + rise
      gsap.fromTo(
        subtextRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
          delay: 0.5,
        }
      );

      // Feature items — stagger in from left, each with line growing
      const featureItems = featuresRef.current?.querySelectorAll(".why-feature-item");
      if (featureItems?.length) {
        gsap.fromTo(
          featureItems,
          { x: -24, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "expo.out",
            scrollTrigger: { trigger: featuresRef.current, start: "top 80%", once: true },
          }
        );
      }

      // CTA — pop up
      gsap.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "back.out(1.6)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 88%", once: true },
        }
      );

      // Main image — reveal with clip-path wipe from bottom
      gsap.fromTo(
        mainImgRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)", opacity: 1,
          duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: mainImgRef.current, start: "top 82%", once: true },
        }
      );

      // Strip — slide up + fade
      gsap.fromTo(
        stripRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: stripRef.current, start: "top 88%", once: true },
          delay: 0.15,
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-container">

        {/* ── Left: Copy ── */}
        <div className="why-copy">

          {/* Eyebrow */}
          <div className="why-eyebrow-wrap" ref={eyebrowRef}>
            <span className="why-eyebrow-line" />
            <p className="why-eyebrow">WHY CHOOSE GENUINE</p>
          </div>

          {/* Heading — split words */}
          <h2 className="why-heading" style={{ perspective: "600px" }}>
            {/* Line 1: "More Than Plots." */}
            <span
              ref={headingLine1Ref}
              style={{ display: "block", overflow: "hidden" }}
            >
              {"More Than Plots.".split(" ").map((word, i) => (
                <span
                  key={i}
                  className="word-wrap"
                  style={{ display: "inline-block", overflow: "hidden", marginRight: "0.26em" }}
                >
                  <span className="word" style={{ display: "inline-block" }}>{word}</span>
                </span>
              ))}
            </span>

            {/* Line 2: "It's A Better Life." */}
            <span
              ref={headingLine2Ref}
              style={{ display: "block", overflow: "hidden" }}
            >
              {"A".split(" ").map((word, i) => (
                <span
                  key={i}
                  className="word-wrap"
                  style={{ display: "inline-block", overflow: "hidden", marginRight: "0.26em" }}
                >
                  <span className="word" style={{ display: "inline-block" }}>{word}</span>
                </span>
              ))}
              {" "}
              <span className="word-wrap" style={{ display: "inline-block", overflow: "hidden", marginRight: "0.26em" }}>
                <span className="word why-accent" style={{ display: "inline-block" }}>Place To</span>
              </span>
              <span className="word-wrap" style={{ display: "inline-block", overflow: "hidden" }}>
                <span className="word why-accent" style={{ display: "inline-block" }}>Belong.</span>
              </span>
            </span>
          </h2>

          <p className="why-subtext" ref={subtextRef}>
At Genuine Property Developers, we don't simply develop land. We create destinations where families celebrate milestones, children grow up with memories, and every square foot becomes part of a bigger story.
As one of the leading developers in Chennai, our vision is to create plotted communities that bring together trust, thoughtful planning, and lasting value.
          </p>

          {/* Feature list */}
          <div className="why-features" ref={featuresRef}>
            {features.map((f, i) => (
              <div key={i} className="why-feature-item">
                <span className="why-feature-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" stroke="#b03030" strokeWidth="1.2" />
                    <polyline points="4,7 6,9 10,5" stroke="#b03030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </span>
                <span className="why-feature-label">{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="#why" className="why-cta" ref={ctaRef}>
            KNOW MORE
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* ── Right: Images ── */}
        <div className="why-images">
          <div className="why-main-img-wrap" ref={mainImgRef}>
            <img
              src="/img-01.png"
              alt="Planned community aerial view"
              className="why-main-img"
            />
          </div>

          {/* Scrolling strip */}
          <div
            className="why-strip-outer"
            ref={stripRef}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <div className="why-fade-left" />
            <div className="why-fade-right" />
            <div ref={trackRef} className="why-track">
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <div key={i} className="why-thumb">
                  <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .why-section {
          background: #fff;
          font-family: 'Sora', 'DM Sans', sans-serif;
          padding: 60px 20px;
          overflow: hidden;
        }

        .why-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ── Eyebrow ── */
        .why-eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          opacity: 0; /* GSAP */
        }

        .why-eyebrow-line {
          display: block;
          width: 28px;
          height: 2px;
          background: linear-gradient(to right, #b03030, rgba(176,48,48,0.3));
          flex-shrink: 0;
        }

        .why-eyebrow {
          color: #b03030;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── Heading ── */
        .why-heading {
          font-size: clamp(28px, 7vw, 50px);
          font-weight: 800;
          color: #111;
          line-height: 1.13;
          margin: 0 0 20px;
          font-family: 'Sora', sans-serif;
        }

        .word { will-change: transform; }
        .why-accent { color: #b03030; }

        /* ── Subtext ── */
        .why-subtext {
          color: #555;
          font-size: 14px;
          line-height: 1.75;
          margin: 0 0 30px;
          max-width: 480px;
          opacity: 0; /* GSAP */
        }

        /* ── Features ── */
        .why-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 20px;
          margin-bottom: 36px;
        }

        .why-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0; /* GSAP */
        }

        .why-feature-icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .why-feature-label {
          font-size: 13px;
          color: #333;
          font-weight: 500;
          line-height: 1.4;
        }

        /* ── CTA ── */
        .why-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 2px solid #b03030;
          color: #b03030;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background 0.2s, color 0.2s, transform 0.2s;
          opacity: 0; /* GSAP */
        }

        .why-cta:hover {
          background: #b03030;
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── Images ── */
        .why-images {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
          overflow: hidden;
        }

        .why-main-img-wrap {
          border-radius: 10px;
          overflow: hidden;
          height: 220px;
          width: 100%;
          opacity: 0; /* GSAP */
        }

        .why-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .why-main-img-wrap:hover .why-main-img {
          transform: scale(1.03);
        }

        /* ── Scrolling strip ── */
        .why-strip-outer {
          overflow: hidden;
          border-radius: 8px;
          position: relative;
          height: 100px;
          width: 100%;
          opacity: 0; /* GSAP */
        }

        .why-fade-left {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 48px;
          background: linear-gradient(to right, #fff, transparent);
          z-index: 2; pointer-events: none;
        }

        .why-fade-right {
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 48px;
          background: linear-gradient(to left, #fff, transparent);
          z-index: 2; pointer-events: none;
        }

        .why-track {
          display: flex;
          gap: 10px;
          will-change: transform;
          width: max-content;
        }

        .why-thumb {
          width: 150px;
          height: 100px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .why-thumb:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(176,48,48,0.2);
        }

        /* ── Breakpoints ── */
        @media (min-width: 480px) {
          .why-section { padding: 60px 28px; }
          .why-main-img-wrap { height: 260px; }
          .why-strip-outer { height: 110px; }
          .why-thumb { width: 160px; height: 110px; }
        }

        @media (min-width: 768px) {
          .why-section { padding: 80px 40px; }
          .why-container { gap: 48px; }
          .why-main-img-wrap { height: 300px; }
          .why-subtext { font-size: 15px; }
          .why-feature-label { font-size: 14px; }
          .why-strip-outer { height: 120px; }
          .why-thumb { width: 170px; height: 120px; }
          .why-cta { padding: 13px 26px; font-size: 13px; }
        }

        @media (min-width: 900px) {
          .why-container {
            grid-template-columns: 1fr 1.2fr;
            gap: 50px;
            padding-top: 20px;
          }
          .why-main-img-wrap { height: 280px; }
        }

        @media (min-width: 1024px) {
          .why-section { padding: 100px 48px; }
          .why-container { grid-template-columns: 1fr 1.3fr; gap: 60px; padding-top: 0; }
          .why-main-img-wrap { height: 300px; }
          .why-strip-outer { height: 120px; }
          .why-thumb { width: 175px; height: 120px; }
        }

        @media (min-width: 1280px) {
          .why-section { padding: 100px 60px; }
          .why-main-img-wrap { height: 320px; }
          .why-thumb { width: 180px; height: 120px; }
        }

        @media (min-width: 1536px) {
          .why-main-img-wrap { height: 360px; }
          .why-subtext { font-size: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-eyebrow-wrap, .why-subtext, .why-feature-item,
          .why-cta, .why-main-img-wrap, .why-strip-outer {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
          .why-thumb { transition: none; }
        }
      `}</style>
    </section>
  );
}