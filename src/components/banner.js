"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const SLIDES = [
  {
    id: 0,
    desktop: "/upban1.jpeg",
    mobile: "/rathinammob.png",
  },
  {
    id: 1,
    desktop: "/upban2.jpeg",
    mobile: "/img-46.jpg",
  },
  {
    id: 2,
    desktop: "/upban3.jpeg",
    mobile: "/img-47.jpg",
  },
];

const DURATION = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedRef = useRef(false);

  const goTo = useCallback((index) => {
    if (transitioning) return;
    const next = (index + SLIDES.length) % SLIDES.length;
    setTransitioning(true);
    setCurrent(next);
    setProgress(0);
    startTimeRef.current = performance.now();
    setTimeout(() => setTransitioning(false), 700);
  }, [transitioning]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* Auto-advance with progress */
  useEffect(() => {
    startTimeRef.current = performance.now();
    pausedRef.current = false;

    const tick = (now) => {
      if (pausedRef.current) { rafRef.current = requestAnimationFrame(tick); return; }
      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        next();
        startTimeRef.current = performance.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, next]);

  /* Touch / mouse drag */
  const handleDragStart = (clientX) => {
    setDragStart(clientX);
    setIsDragging(false);
    pausedRef.current = true;
  };
  const handleDragMove = (clientX) => {
    if (dragStart === null) return;
    if (Math.abs(clientX - dragStart) > 6) setIsDragging(true);
  };
  const handleDragEnd = (clientX) => {
    if (dragStart === null) return;
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    setDragStart(null);
    setIsDragging(false);
    pausedRef.current = false;
    startTimeRef.current = performance.now();
  };

  return (
   <section>
     <div className="hc-root"
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={(e) => handleDragEnd(e.clientX)}
      onMouseLeave={() => { if (dragStart !== null) { setDragStart(null); pausedRef.current = false; } }}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      style={{ cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
    >
      {/* ── SLIDES ── */}
      <div className="hc-track">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`hc-slide ${i === current ? "hc-active" : i === (current - 1 + SLIDES.length) % SLIDES.length ? "hc-prev" : ""}`}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={slide.mobile} />
              <img
                src={slide.desktop}
                alt={`Banner ${i + 1}`}
                className="hc-img"
                draggable="false"
              />
            </picture>
          </div>
        ))}
      </div>

      {/* ── ARROW BUTTONS ── */}
      <button className="hc-arrow hc-arrow--left" onClick={prev} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="hc-arrow hc-arrow--right" onClick={next} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── DOTS ── */}
      <div className="hc-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hc-dot ${i === current ? "hc-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <svg className="hc-ring" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="17" />
                <circle
                  className="hc-ring-arc"
                  cx="20" cy="20" r="17"
                  strokeDasharray={`${2 * Math.PI * 17}`}
                  strokeDashoffset={`${2 * Math.PI * 17 * (1 - progress)}`}
                />
              </svg>
            )}
            <span className="hc-dot-fill" />
          </button>
        ))}
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hc-root {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 500px;
          overflow: hidden;
          background: #0a0a0a;
        }

        /* ── TRACK ── */
        .hc-track {
          position: absolute;
          inset: 0;
        }

        /* ── SLIDE ── */
        .hc-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          z-index: 0;
          transition: opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
        }
        .hc-slide.hc-active {
          opacity: 1;
          z-index: 2;
        }
        .hc-slide.hc-prev {
          opacity: 0;
          z-index: 1;
        }

        .hc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          pointer-events: none;
        }

        /* ── ARROWS ── */
        .hc-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          color: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.2s, opacity 0.2s;
          opacity: 0.7;
        }
        .hc-arrow:hover {
          border-color: rgba(255, 255, 255, 0.7);
          background: rgba(0, 0, 0, 0.6);
          opacity: 1;
          transform: translateY(-50%) scale(1.08);
        }
        .hc-arrow--left  { left: 24px; }
        .hc-arrow--right { right: 24px; }

        /* ── DOTS ── */
        .hc-dots {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hc-dot {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hc-dot-fill {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          transition: background 0.3s, transform 0.3s;
        }
        .hc-dot--active .hc-dot-fill {
          background: #fff;
          transform: scale(1.4);
        }

        /* Progress ring */
        .hc-ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
          pointer-events: none;
        }
        .hc-ring circle:first-child {
          fill: none;
          stroke: rgba(255, 255, 255, 0.12);
          stroke-width: 1.5;
        }
        .hc-ring-arc {
          fill: none;
          stroke: #ffffff;
          stroke-width: 1.5;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.06s linear;
        }

        /* ── MOBILE ──
           The mobile creative is a tall, content-heavy poster (price, CTA,
           compass graphic, etc). Locking the box to a fixed height
           (100svh) with overflow:hidden was cropping the bottom of the
           image — whatever didn't fit in one screen height was clipped.

           Fix: on mobile, .hc-track is no longer absolutely positioned —
           it sizes itself from its content (the natural height of the
           current slide's image), so .hc-root grows to match. The active
           slide sits in normal flow and defines that height; the other
           slides are layered on top of it (absolute, inset:0) purely for
           the opacity crossfade, so they never affect layout height.
        */
        @media (max-width: 767px) {
          .hc-root {
            height: auto;
            min-height: 0;
          }
          .hc-track {
            position: relative; /* was: position: absolute; inset: 0; → that forces height:0 */
            width: 100%;
          }
          .hc-slide {
            position: absolute;
            inset: 0;
          }
          .hc-slide.hc-active {
            position: relative; /* this one defines .hc-track's height */
          }
          .hc-img {
            width: 100%;
            height: auto;        /* follow the image's natural ratio, nothing forced to 100% */
            object-fit: cover;
            object-position: center top;
            display: block;
          }
          .hc-slide.hc-active .hc-img {
            position: relative;
          }
          .hc-slide:not(.hc-active) .hc-img {
            position: absolute;
            inset: 0;
            height: 100%;        /* only the crossfading-out slide fills its absolute parent */
          }
          .hc-arrow { width: 38px; height: 38px; opacity: 0.5; }
          .hc-arrow--left  { left: 12px; }
          .hc-arrow--right { right: 12px; }
          .hc-dots { bottom: 18px; gap: 8px; }
        }

        /* ── REDUCED MOTION ── */
        @media (prefers-reduced-motion: reduce) {
          .hc-slide { transition: none; }
        }
      `}</style>
    </div>
   </section>
  );
}