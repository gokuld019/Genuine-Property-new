"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOGS, getFeaturedBlog } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Investment", "Legal & Approvals", "Finance", "Market Trends", "Lifestyle"];

const CATEGORY_ICONS = {
  "Investment":       { bg: "#0f1a0a", stroke: "#4a9a3a" },
  "Legal & Approvals":{ bg: "#0a0f1a", stroke: "#4a70d9" },
  "Finance":          { bg: "#1a120a", stroke: "#d4a450" },
  "Market Trends":    { bg: "#1a0a0a", stroke: "#b03030" },
  "Lifestyle":        { bg: "#0f0a1a", stroke: "#8a4ad4" },
};

function CategoryIcon({ category, size = 80 }) {
  const cfg = CATEGORY_ICONS[category] || { bg: "#111", stroke: "#b03030" };
  return (
    <div style={{ width: "100%", height: "100%", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ opacity: 0.35 }}>
        {category === "Investment" && (
          <>
            <polyline points="10,60 28,35 42,48 58,22 70,30" stroke={cfg.stroke} strokeWidth="1.2" fill="none" />
            <line x1="10" y1="62" x2="70" y2="62" stroke={cfg.stroke} strokeWidth="0.5" />
            {[10,28,42,58,70].map((x,i) => {
              const y = [60,35,48,22,30][i];
              return <circle key={i} cx={x} cy={y} r="2.5" fill={cfg.stroke} />;
            })}
          </>
        )}
        {category === "Legal & Approvals" && (
          <>
            <rect x="18" y="12" width="44" height="56" rx="3" stroke={cfg.stroke} strokeWidth="1" fill="none" />
            <line x1="28" y1="28" x2="52" y2="28" stroke={cfg.stroke} strokeWidth="0.5" />
            <line x1="28" y1="38" x2="52" y2="38" stroke={cfg.stroke} strokeWidth="0.5" />
            <line x1="28" y1="48" x2="44" y2="48" stroke={cfg.stroke} strokeWidth="0.5" />
            <polyline points="26,53 31,58 42,47" stroke={cfg.stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {category === "Finance" && (
          <>
            <circle cx="40" cy="40" r="26" stroke={cfg.stroke} strokeWidth="1" fill="none" />
            <line x1="40" y1="18" x2="40" y2="62" stroke={cfg.stroke} strokeWidth="0.5" />
            <path d="M32 28 Q40 24 48 28 L48 36 Q40 40 32 36 Z" stroke={cfg.stroke} strokeWidth="0.5" fill="none" />
            <path d="M32 44 Q40 40 48 44 L48 52 Q40 56 32 52 Z" stroke={cfg.stroke} strokeWidth="0.5" fill="none" />
          </>
        )}
        {category === "Market Trends" && (
          <>
            <rect x="10" y="10" width="60" height="60" rx="3" stroke={cfg.stroke} strokeWidth="0.5" fill="none" />
            <rect x="20" y="35" width="10" height="28" stroke={cfg.stroke} strokeWidth="0.8" fill="none" />
            <rect x="35" y="25" width="10" height="38" stroke={cfg.stroke} strokeWidth="0.8" fill="none" />
            <rect x="50" y="15" width="10" height="48" stroke={cfg.stroke} strokeWidth="0.8" fill="none" />
          </>
        )}
        {category === "Lifestyle" && (
          <>
            <circle cx="40" cy="32" r="14" stroke={cfg.stroke} strokeWidth="1" fill="none" />
            <line x1="40" y1="46" x2="40" y2="68" stroke={cfg.stroke} strokeWidth="0.8" />
            <line x1="28" y1="56" x2="52" y2="56" stroke={cfg.stroke} strokeWidth="0.8" />
            <line x1="40" y1="18" x2="40" y2="12" stroke={cfg.stroke} strokeWidth="0.5" />
            <circle cx="40" cy="32" r="5" fill={cfg.stroke} opacity="0.5" />
          </>
        )}
        {!CATEGORY_ICONS[category] && (
          <polygon points="40,12 62,26 62,54 40,68 18,54 18,26" stroke={cfg.stroke} strokeWidth="1" fill="none" />
        )}
      </svg>
    </div>
  );
}

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const headingRef   = useRef(null);
  const subtextRef   = useRef(null);
  const filterRef    = useRef(null);
  const featuredRef  = useRef(null);
  const gridRef      = useRef(null);
  const listRef      = useRef(null);

  const featured = getFeaturedBlog();

  const filtered = activeCategory === "All"
    ? BLOGS.filter((b) => !b.featured)
    : BLOGS.filter((b) => !b.featured && b.category === activeCategory);

  const gridBlogs = filtered.slice(0, 3);
  const listBlogs = filtered.slice(3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const base = { scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } };

      gsap.fromTo(eyebrowRef.current, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "expo.out", ...base });

      const words = headingRef.current?.querySelectorAll(".blogs-word");
      if (words?.length) {
        gsap.fromTo(words,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.85, stagger: 0.08, ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true }, delay: 0.1 }
        );
      }

      gsap.fromTo(subtextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.4, ...base });
      gsap.fromTo(filterRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.55, ...base });
      gsap.fromTo(featuredRef.current, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: featuredRef.current, start: "top 85%", once: true } });

      const cards = gridRef.current?.querySelectorAll(".blogs-grid-card");
      if (cards?.length) {
        gsap.fromTo(cards, { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true } });
      }

      const items = listRef.current?.querySelectorAll(".blogs-list-item");
      if (items?.length) {
        gsap.fromTo(items, { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "expo.out",
            scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <main className="blogs-root" ref={sectionRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .blogs-root {
          background: #0d0d0d;
          min-height: 100vh;
          font-family: 'Sora', sans-serif;
          padding-top: 90px;
        }

        /* ─── HERO ─── */
        .blogs-hero {
          padding: 48px 20px 36px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          max-width: 1280px;
          margin: 0 auto;
        }
        .blogs-eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          opacity: 0;
        }
        .blogs-eyebrow-line {
          display: block;
          width: 28px;
          height: 2px;
          background: #b03030;
          flex-shrink: 0;
        }
        .blogs-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b03030;
          margin: 0;
        }
        .blogs-heading {
          font-family: 'Sora', sans-serif;
          font-size: clamp(28px, 6vw, 52px);
          font-weight: 800;
          color: #f5f0e8;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
        }
        .blogs-accent { color: #b03030; }
        .blogs-word-wrap { display: inline-block; overflow: hidden; margin-right: 0.25em; }
        .blogs-word { display: inline-block; }
        .blogs-subtext {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.38);
          line-height: 1.75;
          max-width: 480px;
          margin: 0;
          opacity: 0;
        }

        /* ─── FILTER ─── */
        .blogs-filter-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 22px 20px 0;
          opacity: 0;
        }
        .blogs-filter-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .blogs-chip {
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.38);
          font-family: 'Sora', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .blogs-chip:hover {
          border-color: rgba(176,48,48,0.4);
          color: rgba(255,255,255,0.7);
        }
        .blogs-chip.active {
          background: #b03030;
          border-color: #b03030;
          color: #fff;
        }

        /* ─── SECTION DIVIDER ─── */
        .blogs-divider {
          max-width: 1280px;
          margin: 0 auto;
          padding: 36px 20px 0;
        }
        .blogs-section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin: 0;
        }

        /* ─── FEATURED ─── */
        .blogs-featured-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 20px 0;
          opacity: 0;
        }
        .blogs-featured-card {
          display: grid;
          grid-template-columns: 1fr;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: #131313;
          transition: border-color 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .blogs-featured-card:hover {
          border-color: rgba(176,48,48,0.4);
        }
        .blogs-featured-card:hover .blogs-feat-thumb-inner {
          transform: scale(1.04);
        }
        .blogs-featured-card:hover .blogs-feat-read-btn {
          background: #b03030;
          color: #fff;
        }
        .blogs-feat-img-wrap {
          overflow: hidden;
          position: relative;
          min-height: 220px;
        }
        .blogs-feat-thumb-inner {
          position: absolute;
          inset: 0;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .blogs-feat-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #b03030;
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          z-index: 2;
        }
        .blogs-feat-content {
          padding: 26px 24px 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blogs-feat-cat {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b03030;
          margin-bottom: 12px;
        }
        .blogs-feat-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(18px, 2.5vw, 26px);
          font-weight: 700;
          color: #f5f0e8;
          line-height: 1.2;
          margin: 0 0 12px;
        }
        .blogs-feat-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          line-height: 1.8;
          margin: 0 0 20px;
        }
        .blogs-feat-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .blogs-feat-meta-item {
          font-size: 10.5px;
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Sora', sans-serif;
        }
        .blogs-feat-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid rgba(176,48,48,0.5);
          border-radius: 8px;
          color: #b03030;
          font-family: 'Sora', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          width: fit-content;
        }
        .blogs-feat-stats-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .blogs-feat-stat {
          background: #131313;
          padding: 14px 16px;
        }
        .blogs-feat-stat-num {
          font-family: 'Sora', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #f0ece4;
          line-height: 1;
          margin-bottom: 3px;
        }
        .blogs-feat-stat-num span { color: #b03030; }
        .blogs-feat-stat-label {
          font-size: 9px;
          color: rgba(255,255,255,0.28);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ─── GRID ─── */
        .blogs-grid-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 20px 0;
        }
        .blogs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .blogs-grid-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          display: block;
          transition: border-color 0.25s ease, transform 0.25s ease;
          opacity: 0;
        }
        .blogs-grid-card:hover {
          border-color: rgba(176,48,48,0.35);
          transform: translateY(-3px);
        }
        .blogs-grid-card:hover .blogs-card-thumb-inner { transform: scale(1.05); }
        .blogs-grid-card:hover .blogs-card-arrow { background: #b03030; color: #fff; border-color: #b03030; }
        .blogs-card-thumb {
          height: 160px;
          overflow: hidden;
          position: relative;
        }
        .blogs-card-thumb-inner {
          position: absolute;
          inset: 0;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .blogs-card-cat-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.75);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-family: 'Sora', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 100px;
        }
        .blogs-card-body {
          padding: 18px 18px 20px;
        }
        .blogs-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #f0ece4;
          line-height: 1.35;
          margin: 0 0 10px;
        }
        .blogs-card-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          color: rgba(255,255,255,0.28);
          line-height: 1.75;
          margin: 0 0 14px;
        }
        .blogs-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .blogs-card-date {
          font-size: 9.5px;
          color: rgba(255,255,255,0.2);
          font-family: 'Sora', sans-serif;
        }
        .blogs-card-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(176,48,48,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b03030;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        /* ─── LIST ─── */
        .blogs-list-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }
        .blogs-list-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .blogs-list-item:last-child { border-bottom: none; }
        .blogs-list-item:hover { opacity: 0.75 !important; }
        .blogs-list-num {
          font-family: 'Sora', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: rgba(176,48,48,0.2);
          line-height: 1;
          min-width: 30px;
          padding-top: 2px;
        }
        .blogs-list-content { flex: 1; min-width: 0; }
        .blogs-list-cat {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b03030;
          margin-bottom: 5px;
        }
        .blogs-list-title {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #e0d8cc;
          line-height: 1.35;
          margin: 0 0 5px;
        }
        .blogs-list-meta {
          font-size: 10px;
          color: rgba(255,255,255,0.22);
          font-family: 'Sora', sans-serif;
        }
        .blogs-list-arrow {
          color: rgba(176,48,48,0.4);
          padding-top: 2px;
          flex-shrink: 0;
        }

        /* ─── EMPTY ─── */
        .blogs-empty {
          padding: 60px 20px;
          text-align: center;
          color: rgba(255,255,255,0.25);
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ─── RESPONSIVE ─── */
        @media (min-width: 480px) {
          .blogs-hero { padding: 52px 28px 40px; }
          .blogs-filter-wrap { padding: 24px 28px 0; }
          .blogs-featured-wrap { padding: 32px 28px 0; }
          .blogs-divider { padding: 36px 28px 0; }
          .blogs-grid-wrap { padding: 20px 28px 0; }
          .blogs-list-wrap { padding: 0 28px 60px; }
          .blogs-feat-img-wrap { min-height: 260px; }
          .blogs-feat-stats-row { grid-template-columns: repeat(4, 1fr); }
        }

        @media (min-width: 640px) {
          .blogs-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 768px) {
          .blogs-hero { padding: 56px 40px 44px; }
          .blogs-filter-wrap { padding: 26px 40px 0; }
          .blogs-featured-wrap { padding: 32px 40px 0; }
          .blogs-divider { padding: 40px 40px 0; }
          .blogs-grid-wrap { padding: 20px 40px 0; }
          .blogs-list-wrap { padding: 0 40px 60px; }
          .blogs-feat-img-wrap { min-height: 300px; }
          .blogs-feat-content { padding: 30px 28px 32px; }
          .blogs-list-title { font-size: 16px; }
        }

        @media (min-width: 900px) {
          .blogs-featured-card {
            grid-template-columns: 1fr 0.95fr;
          }
          .blogs-feat-img-wrap { min-height: 340px; }
          .blogs-feat-stats-row { border-top: none; border-left: 1px solid rgba(255,255,255,0.06); grid-template-columns: 1fr 1fr; }
          .blogs-featured-right { display: flex; flex-direction: column; }
          .blogs-feat-content { flex: 1; padding: 32px 30px; }
        }

        @media (min-width: 1024px) {
          .blogs-hero { padding: 64px 48px 48px; }
          .blogs-filter-wrap { padding: 28px 48px 0; }
          .blogs-featured-wrap { padding: 36px 48px 0; }
          .blogs-divider { padding: 44px 48px 0; }
          .blogs-grid-wrap { padding: 20px 48px 0; }
          .blogs-list-wrap { padding: 0 48px 80px; }
          .blogs-grid { grid-template-columns: repeat(3, 1fr); }
          .blogs-feat-img-wrap { min-height: 380px; }
        }

        @media (min-width: 1280px) {
          .blogs-hero { padding: 72px 60px 52px; }
          .blogs-filter-wrap, .blogs-divider, .blogs-grid-wrap { padding-left: 60px; padding-right: 60px; }
          .blogs-featured-wrap { padding: 36px 60px 0; }
          .blogs-list-wrap { padding-left: 60px; padding-right: 60px; }
          .blogs-feat-img-wrap { min-height: 420px; }
          .blogs-card-thumb { height: 180px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .blogs-eyebrow-wrap, .blogs-subtext, .blogs-filter-wrap,
          .blogs-featured-wrap, .blogs-grid-card, .blogs-list-item {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* HERO */}
      <div className="blogs-hero">
        <div className="blogs-eyebrow-wrap" ref={eyebrowRef}>
          <span className="blogs-eyebrow-line" />
          <p className="blogs-eyebrow">Insights & Updates</p>
        </div>
        <h1 className="blogs-heading" ref={headingRef} style={{ perspective: "600px" }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            {"Real Estate".split(" ").map((w, i) => (
              <span key={i} className="blogs-word-wrap">
                <span className="blogs-word">{w}</span>
              </span>
            ))}
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            {["Insights", "From", "The", "Ground", "Up."].map((w, i) => (
              <span key={i} className="blogs-word-wrap">
                <span className={`blogs-word${i === 0 ? " blogs-accent" : ""}`}>{w}</span>
              </span>
            ))}
          </span>
        </h1>
        <p className="blogs-subtext" ref={subtextRef}>
          Expert perspectives on plots, investments, and building your future in Chennai&apos;s fastest-growing corridors.
        </p>
      </div>

      {/* FILTER */}
      <div className="blogs-filter-wrap" ref={filterRef}>
        <div className="blogs-filter-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`blogs-chip${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <div className="blogs-divider">
        <p className="blogs-section-label">Featured Article</p>
      </div>

      <div className="blogs-featured-wrap" ref={featuredRef}>
        <Link href={`/blogs/${featured.slug}`} className="blogs-featured-card">
          <div className="blogs-feat-img-wrap">
            <div className="blogs-feat-thumb-inner">
              <CategoryIcon category={featured.category} size={120} />
            </div>
            <span className="blogs-feat-badge">Featured</span>
          </div>
          <div className="blogs-featured-right">
            <div className="blogs-feat-content">
              <div className="blogs-feat-cat">{featured.category} · {featured.readTime}</div>
              <h2 className="blogs-feat-title">{featured.title}</h2>
              <p className="blogs-feat-excerpt">{featured.excerpt}</p>
              <div className="blogs-feat-meta">
                <div className="blogs-feat-meta-item">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {featured.date}
                </div>
                <div className="blogs-feat-meta-item">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {featured.readTime}
                </div>
              </div>
              <div className="blogs-feat-read-btn">
                Read Article
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
            <div className="blogs-feat-stats-row">
              {featured.stats.map((s, i) => (
                <div key={i} className="blogs-feat-stat">
                  <div className="blogs-feat-stat-num">{s.num}</div>
                  <div className="blogs-feat-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>

      {/* GRID */}
      {gridBlogs.length > 0 && (
        <>
          <div className="blogs-divider">
            <p className="blogs-section-label">Latest Articles</p>
          </div>
          <div className="blogs-grid-wrap" ref={gridRef}>
            <div className="blogs-grid">
              {gridBlogs.map((blog) => (
                <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="blogs-grid-card">
                  <div className="blogs-card-thumb">
                    <div className="blogs-card-thumb-inner">
                      <CategoryIcon category={blog.category} size={60} />
                    </div>
                    <span className="blogs-card-cat-badge">{blog.category}</span>
                  </div>
                  <div className="blogs-card-body">
                    <h3 className="blogs-card-title">{blog.title}</h3>
                    <p className="blogs-card-excerpt">{blog.excerpt}</p>
                    <div className="blogs-card-footer">
                      <span className="blogs-card-date">{blog.dateShort} · {blog.readTime}</span>
                      <div className="blogs-card-arrow">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* LIST */}
      {listBlogs.length > 0 && (
        <>
          <div className="blogs-divider">
            <p className="blogs-section-label">More Reads</p>
          </div>
          <div className="blogs-list-wrap">
            <div ref={listRef}>
              {listBlogs.map((blog, i) => (
                <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="blogs-list-item">
                  <div className="blogs-list-num">0{i + gridBlogs.length + 2}</div>
                  <div className="blogs-list-content">
                    <div className="blogs-list-cat">{blog.category}</div>
                    <div className="blogs-list-title">{blog.title}</div>
                    <div className="blogs-list-meta">{blog.dateShort} · {blog.readTime}</div>
                  </div>
                  <div className="blogs-list-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {filtered.length === 0 && (
        <div className="blogs-empty">No articles found in this category yet. Check back soon.</div>
      )}
    </main>
  );
}