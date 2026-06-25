"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function ChoosePlotSection() {
  const sectionRef = useRef(null);

  const plots = [
    {
      title: "Rathinam Garden – Mappedu, East Tambaram",
      desc: "CMDA-approved gated community featuring premium residential plots in one of East Tambaram's fastest-growing neighborhoods.",
      img: "/img-07.png",
      slug: "/rathinam-garden",
    },
    {
      title: "Amudam Foundation – Thaiyur, OMR",
      desc: "Exclusive DTCP-approved plotted development located near Kelambakkam and Siruseri IT Corridor.",
      img: "/img-08.png",
      slug: "alankar-sunrise",
    },
    {
      title: "Alankar Sunrise – Mappedu, Puthur",
      desc: "Premium villa plots and ready-to-move 2 BHK villas designed for modern families seeking comfort, convenience, and long-term appreciation.",
      img: "/img-09.png",
      slug: "amudham-foundation",
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

        // ── Eyebrow: letter-by-letter ──
        const eyebrow = sectionRef.current?.querySelector(".cps-eyebrow");
        if (eyebrow) {
          const split = new SplitText(eyebrow, { type: "chars" });
          gsap.from(split.chars, {
            scrollTrigger: { trigger: eyebrow, start: "top 88%", toggleActions: "play none none none" },
            opacity: 0,
            y: 12,
            stagger: 0.03,
            duration: 0.5,
            ease: "power3.out",
          });
        }

        // ── Heading: word clip reveal ──
        const heading = sectionRef.current?.querySelector(".cps-heading");
        if (heading) {
          const split = new SplitText(heading, { type: "words,lines", linesClass: "cps-line-wrap" });
          sectionRef.current.querySelectorAll(".cps-line-wrap").forEach((line) => {
            line.style.overflow = "hidden";
            line.style.display = "block";
          });
          gsap.from(split.words, {
            scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" },
            y: "110%",
            opacity: 0,
            stagger: 0.07,
            duration: 0.75,
            ease: "expo.out",
          });
        }

        // ── Cards: Y-only stagger ──
        const cards = sectionRef.current?.querySelectorAll(".cps-card");
        if (cards?.length) {
          gsap.fromTo(
            cards,
            { y: 48 },
            {
              y: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: sectionRef.current.querySelector(".cps-grid"),
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        }

      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <section className="cps-section" ref={sectionRef}>

        <div className="cps-heading-wrap">
          <p className="cps-eyebrow">CHOOSE YOUR PLOT</p>
          <h2 className="cps-heading">
            Find The Plot That <span className="cps-accent">Reflects Your Future</span>
          </h2>
        </div>

        <div className="cps-grid">
          {plots.map((plot, i) => (
            <Link 
              key={i} 
              href={`/projects/${plot.slug}`} 
              className="cps-card-link"
            >
              <div className="cps-card">
                <div className="cps-img-wrap">
                  <img
                    src={plot.img}
                    alt={plot.title}
                    className="cps-img"
                    draggable="false"
                    width={400}
                    height={210}
                  />
                </div>
                <div className="cps-content">
                  <h3 className="cps-title">{plot.title}</h3>
                  <p className="cps-desc">{plot.desc}</p>
                  <span className="cps-link">
                    VIEW PLOTS
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <style>{`
          .cps-section {
            background: #f5f5f5;
            padding: 60px 20px;
            font-family: 'Sora', 'DM Sans', sans-serif;
          }

          /* ── HEADING ── */
          .cps-heading-wrap {
            text-align: center;
            margin-bottom: 36px;
          }
          .cps-eyebrow {
            color: #b03030;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin: 0 0 12px;
          }
          .cps-heading {
            font-size: clamp(26px, 6vw, 44px);
            font-weight: 800;
            color: #111;
            margin: 0;
            font-family: 'Sora', sans-serif;
            line-height: 1.2;
          }
          .cps-accent { color: #b03030; }

          /* ── GRID ── */
          .cps-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 1280px;
            margin: 0 auto;
            align-items: stretch;
          }

          /* ── CARD LINK ── */
          .cps-card-link {
            text-decoration: none;
            display: block;
            height: 100%;
          }

          /* ── CARD ── */
          .cps-card {
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            display: flex;
            flex-direction: column;
            height: 100%;
            will-change: transform;
            transition: box-shadow 0.25s ease, transform 0.25s ease;
            cursor: pointer;
          }
          .cps-card:hover {
            box-shadow: 0 8px 28px rgba(176,48,48,0.12);
            transform: translateY(-3px);
          }

          /* ── IMAGE WRAP ── */
          .cps-img-wrap {
            width: 100%;
            height: auto;
            flex-shrink: 0;
            overflow: hidden;
            display: block;
            background: #e8e8e8;
          }
          .cps-img {
            width: 100%;
            height: auto;
            object-fit: cover;
            object-position: center center;
            display: block;
            transition: transform 0.4s ease;
          }
          .cps-card:hover .cps-img { transform: scale(1.04); }

          /* ── CONTENT ── */
          .cps-content {
            padding: 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
          }
          .cps-title {
            font-size: 14px;
            font-weight: 800;
            color: #111;
            margin: 0 0 8px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            line-height: 1.3;
          }
          .cps-desc {
            font-size: 13px;
            color: #666;
            line-height: 1.6;
            margin: 0 0 16px;
            flex: 1;
          }
          .cps-link {
            color: #b03030;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            text-transform: uppercase;
            transition: gap 0.2s ease;
            margin-top: auto;
          }
          .cps-link:hover { gap: 10px; }

          /* ── RESPONSIVE ── */
          @media (min-width: 480px) {
            .cps-section { padding: 60px 28px; }
            .cps-grid { grid-template-columns: repeat(2, 1fr); }
          }

          @media (min-width: 768px) {
            .cps-section { padding: 70px 40px; }
            .cps-heading-wrap { margin-bottom: 40px; }
            .cps-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
            .cps-img-wrap { height: auto; }
            .cps-desc { font-size: 14px; }
          }

          @media (min-width: 900px) {
            .cps-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .cps-img-wrap { height: auto; }
          }

          @media (min-width: 1024px) {
            .cps-section { padding: 80px 48px; }
            .cps-img-wrap { height: auto; }
          }

          @media (min-width: 1280px) {
            .cps-section { padding: 90px 60px; }
            .cps-grid { gap: 24px; }
            .cps-img-wrap { height: auto; }
            .cps-heading-wrap { margin-bottom: 48px; }
          }

          @media (min-width: 1536px) {
            .cps-img-wrap { height: auto; }
            .cps-title { font-size: 15px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .cps-card, .cps-img { transition: none !important; }
          }
        `}</style>
      </section>
    </>
  );
}