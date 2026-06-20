"use client";

import { useEffect, useRef } from "react";

export default function ChoosePlotSection() {
  const sectionRef = useRef(null);

  const plots = [
    {
      title: "RESIDENTIAL PLOTS",
      desc: "Create a space where life's most meaningful moments unfold naturally.",
      img: "/img-07.png",
    },
    {
      title: "PREMIUM PLOTS",
      desc: "Handpicked locations that combine prestige, comfort, and future value.",
      img: "/img-08.png",
    },
    {
      title: "Nature-Facing Plots",
      desc: "Wake up to open greens, fresh air, and a sense of calm every day.",
      img: "/img-09.png",
    },
    {
      title: "Growth Plots",
      desc: "Position yourself in locations where opportunity continues to grow.",
      img: "/img-13.png",
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
        // ── Eyebrow: letter-by-letter fade + rise ──
        const eyebrow = sectionRef.current.querySelector(".cps-eyebrow");
        const splitEyebrow = new SplitText(eyebrow, { type: "chars" });

        gsap.from(splitEyebrow.chars, {
          scrollTrigger: {
            trigger: eyebrow,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 12,
          stagger: 0.03,
          duration: 0.5,
          ease: "power3.out",
        });

        // ── Heading: word-by-word clip reveal ──
        const heading = sectionRef.current.querySelector(".cps-heading");
        const splitHeading = new SplitText(heading, { type: "words,lines", linesClass: "line-wrap" });

        // Wrap each line so overflow: hidden clips the words
        sectionRef.current.querySelectorAll(".line-wrap").forEach((line) => {
          line.style.overflow = "hidden";
          line.style.display = "block";
        });

        gsap.from(splitHeading.words, {
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: "110%",
          opacity: 0,
          stagger: 0.07,
          duration: 0.75,
          ease: "expo.out",
        });

        // ── Cards: staggered slide-up with slight rotation ──
        const cards = sectionRef.current.querySelectorAll(".cps-card");

        gsap.from(cards, {
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".cps-grid"),
            start: "top 82%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          rotateX: 6,
          transformOrigin: "top center",
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
        });

        // ── Card titles: char stagger on card scroll-in ──
        cards.forEach((card) => {
          const title = card.querySelector(".cps-title");
          const splitTitle = new SplitText(title, { type: "chars" });

          gsap.from(splitTitle.chars, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 8,
            stagger: 0.025,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.2,
          });

          // ── Description: word fade ──
          const desc = card.querySelector(".cps-desc");
          const splitDesc = new SplitText(desc, { type: "words" });

          gsap.from(splitDesc.words, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 6,
            stagger: 0.04,
            duration: 0.45,
            ease: "power2.out",
            delay: 0.35,
          });

          // ── Link: slide in from left ──
          const link = card.querySelector(".cps-link");
          gsap.from(link, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            x: -16,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.5,
          });
        });
      }, sectionRef);
    };

    init();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className="cps-section" ref={sectionRef}>
      {/* Heading */}
      <div className="cps-heading-wrap">
        <p className="cps-eyebrow">CHOOSE YOUR PLOT</p>
        <h2 className="cps-heading">
          Find The Plot That <span className="cps-accent">Reflects Your Future</span>
          
        </h2>
        {/* <p className="text-black">Because every dream deserves the right foundation.</p> */}
      </div>

      {/* Cards Grid */}
      <div className="cps-grid">
        {plots.map((plot, i) => (
          <div key={i} className="cps-card">
            <div className="cps-img-wrap">
              <img src={plot.img} alt={plot.title} className="cps-img" />
            </div>
            <div className="cps-content">
              <h3 className="cps-title">{plot.title}</h3>
              <p className="cps-desc">{plot.desc}</p>
              <a href="#plots" className="cps-link">
                VIEW PLOTS
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        .cps-section {
          background: #f5f5f5;
          padding: 60px 20px;
          font-family: 'Sora', 'DM Sans', sans-serif;
        }

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

        .cps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .cps-card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          perspective: 800px;
        }

        .cps-card:hover {
          box-shadow: 0 8px 28px rgba(176,48,48,0.12);
          transform: translateY(-3px);
        }

        .cps-img-wrap {
          height: 200px;
          overflow: hidden;
        }

        .cps-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .cps-card:hover .cps-img {
          transform: scale(1.04);
        }

        .cps-content {
          padding: 20px;
        }

        .cps-title {
          font-size: 14px;
          font-weight: 800;
          color: #111;
          margin: 0 0 8px;
          letter-spacing: 0.04em;
        }

        .cps-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 16px;
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
        }

        .cps-link:hover { gap: 10px; }

        @media (min-width: 480px) {
          .cps-section { padding: 60px 28px; }
          .cps-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 768px) {
          .cps-section { padding: 70px 40px; }
          .cps-heading-wrap { margin-bottom: 40px; }
          .cps-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .cps-img-wrap { height: 210px; }
          .cps-desc { font-size: 14px; }
        }

        @media (min-width: 900px) {
          .cps-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
          .cps-img-wrap { height: 190px; }
        }

        @media (min-width: 1024px) {
          .cps-section { padding: 80px 48px; }
          .cps-img-wrap { height: 200px; }
        }

        @media (min-width: 1280px) {
          .cps-section { padding: 90px 60px; }
          .cps-grid { gap: 24px; }
          .cps-img-wrap { height: 210px; }
          .cps-heading-wrap { margin-bottom: 48px; }
        }

        @media (min-width: 1536px) {
          .cps-img-wrap { height: 220px; }
          .cps-title { font-size: 15px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cps-card, .cps-img { transition: none; }
        }
      `}</style>
    </section>
  );
}