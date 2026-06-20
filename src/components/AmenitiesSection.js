"use client";

import { useEffect, useRef } from "react";

export default function AmenitiesSection() {
  const sectionRef = useRef(null);

  const amenities = [
    {
      title: "MODERN AMENITIES",
      desc: "Clubhouse, parks, sports & more for every age.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: "GREEN & SERENE",
      desc: "Landscaped greens for a peaceful life.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
    {
      title: "SAFE & SECURE",
      desc: "24/7 security for you and your loved ones.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
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

        // ── Image: slide in from left ──
        gsap.from(sec.querySelector(".ams-img-wrap"), {
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        });

        // ── Eyebrow: char-by-char stagger ──
        const eyebrow = sec.querySelector(".ams-eyebrow");
        const splitEyebrow = new SplitText(eyebrow, { type: "chars" });

        gsap.from(splitEyebrow.chars, {
          scrollTrigger: {
            trigger: eyebrow,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 10,
          stagger: 0.03,
          duration: 0.45,
          ease: "power3.out",
        });

        // ── Heading: word clip-reveal (punch-through) ──
        const heading = sec.querySelector(".ams-heading");
        const splitHeading = new SplitText(heading, {
          type: "words,lines",
          linesClass: "ams-line-wrap",
        });

        sec.querySelectorAll(".ams-line-wrap").forEach((line) => {
          line.style.overflow = "hidden";
          line.style.display = "block";
        });

        gsap.from(splitHeading.words, {
          scrollTrigger: {
            trigger: heading,
            start: "top 83%",
            toggleActions: "play none none none",
          },
          y: "110%",
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "expo.out",
        });

        // ── Divider: width expand from left ──
        gsap.from(sec.querySelector(".ams-divider"), {
          scrollTrigger: {
            trigger: sec.querySelector(".ams-divider"),
            start: "top 88%",
            toggleActions: "play none none none",
          },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });

        // ── Amenity items: staggered fade-up with icon draw ──
        const items = sec.querySelectorAll(".ams-item");

        items.forEach((item, i) => {
          // Icon scale pop
          gsap.from(item.querySelector(".ams-icon"), {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            scale: 0.4,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
            delay: i * 0.1,
          });

          // Title: char stagger
          const title = item.querySelector(".ams-item-title");
          const splitTitle = new SplitText(title, { type: "chars" });

          gsap.from(splitTitle.chars, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 8,
            stagger: 0.025,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.15 + i * 0.1,
          });

          // Desc: word fade-up
          const desc = item.querySelector(".ams-item-desc");
          const splitDesc = new SplitText(desc, { type: "words" });

          gsap.from(splitDesc.words, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 6,
            stagger: 0.04,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.3 + i * 0.1,
          });
        });
      }, sectionRef);
    };

    init();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className="ams-section" ref={sectionRef}>
      <div className="ams-container">

        {/* Left – Image */}
        <div className="ams-img-wrap">
          <img
            src="/img-12.png"
            alt="Luxury villa at dusk"
            className="ams-img"
          />
        </div>

        {/* Right – Content */}
        <div className="ams-content">
          <p className="ams-eyebrow">AMENITIES THAT</p>

          <h2 className="ams-heading">
            Elevate Everyday <span className="ams-accent">Living</span>
          </h2>

          <div className="ams-divider" />

          <div className="ams-grid">
            {amenities.map((item, i) => (
              <div key={i} className="ams-item">
                <div className="ams-icon">{item.icon}</div>
                <h4 className="ams-item-title">{item.title}</h4>
                <p className="ams-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        .ams-section {
          background: #111;
          font-family: 'Sora', 'DM Sans', sans-serif;
        }

        .ams-container {
          display: grid;
          grid-template-columns: 1fr;
          max-width: 1280px;
          margin: 0 auto;
        }

        .ams-img-wrap {
          overflow: hidden;
          width: 100%;
          height: 240px;
        }

        .ams-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ams-content {
          padding: 40px 20px;
        }

        .ams-eyebrow {
          color: #b03030;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        .ams-heading {
          font-size: clamp(24px, 6vw, 38px);
          font-weight: 700;
          color: #fff;
          margin: 0 0 24px;
          font-family: 'Sora', sans-serif;
          line-height: 1.2;
        }

        .ams-accent { color: #b03030; }

        .ams-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin-bottom: 24px;
        }

        .ams-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        .ams-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ams-icon {
          color: rgba(255,255,255,0.85);
        }

        .ams-item-title {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          margin: 0;
          text-transform: uppercase;
        }

        .ams-item-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin: 0;
        }

        @media (min-width: 480px) {
          .ams-content { padding: 40px 28px; }
          .ams-img-wrap { height: 260px; }
          .ams-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        }

        @media (min-width: 768px) {
          .ams-img-wrap { height: 300px; }
          .ams-content { padding: 48px 40px; }
          .ams-heading { margin-bottom: 28px; }
          .ams-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .ams-item-desc { font-size: 13px; }
        }

        @media (min-width: 900px) {
          .ams-container {
            grid-template-columns: 1fr 1.4fr;
            align-items: stretch;
            min-height: 300px;
          }
          .ams-img-wrap { height: 100%; min-height: 300px; }
          .ams-content { padding: 50px 50px 50px 56px; }
          .ams-grid { gap: 22px; }
        }

        @media (min-width: 1024px) {
          .ams-container { min-height: 320px; }
          .ams-img-wrap { min-height: 320px; }
          .ams-content { padding: 50px 50px 50px 60px; }
          .ams-grid { gap: 24px; }
        }

        @media (min-width: 1280px) {
          .ams-container { min-height: 340px; }
          .ams-img-wrap { min-height: 340px; }
          .ams-content { padding: 56px 60px 56px 64px; }
          .ams-item-desc { font-size: 14px; }
        }

        @media (min-width: 1536px) {
          .ams-container { min-height: 380px; }
          .ams-img-wrap { min-height: 380px; }
          .ams-heading { margin-bottom: 32px; }
          .ams-grid { gap: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ams-img { transition: none; }
        }
      `}</style>
    </section>
  );
}